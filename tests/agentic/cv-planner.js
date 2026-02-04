import {
  CV_AGENT_ACTIONS,
  CV_AGENT_SECTION_NAMES
} from './cv-agent';

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions';

const normalizeAction = (action, fallback) => {
  if (!action || typeof action !== 'object') {
    return fallback;
  }

  if (action.type === CV_AGENT_ACTIONS.SECTION) {
    if (!CV_AGENT_SECTION_NAMES.includes(action.sectionName)) {
      return fallback;
    }
    return {
      type: CV_AGENT_ACTIONS.SECTION,
      sectionName: action.sectionName
    };
  }

  const validTypes = Object.values(CV_AGENT_ACTIONS);
  if (!validTypes.includes(action.type)) {
    return fallback;
  }

  return { type: action.type };
};

export const createCvLlmPlanner = ({
  apiKey,
  model,
  logger = null,
  minDelayMs = 0,
  maxRequests = Number.POSITIVE_INFINITY
}) => {
  if (!apiKey || !model) {
    throw new Error('LLM planner requires apiKey and model.');
  }

  let requestCount = 0;
  let lastRequestAt = 0;

  const log = (message, data) => {
    if (typeof logger === 'function') {
      logger(message, data);
    }
  };

  const maybeDelay = async () => {
    if (!minDelayMs) {
      return;
    }
    const now = Date.now();
    const waitMs = Math.max(0, minDelayMs - (now - lastRequestAt));
    if (waitMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  };

  const systemPrompt = [
    'You are an agentic test planner for a CV UI.',
    'Choose exactly one next action from the allowed list.',
    'Return ONLY valid JSON with shape:',
    '{"type":"open|section|storyButtons|linkedIn|scrollReset|done","sectionName":"Experience|Education|Tools|References"}',
    'Only include sectionName when type is "section".'
  ].join(' ');

  const buildUserPrompt = ({ observations, state, defaultAction, step }) => {
    const payload = {
      step,
      observations,
      state,
      defaultAction,
      allowed: {
        actions: Object.values(CV_AGENT_ACTIONS),
        sections: CV_AGENT_SECTION_NAMES
      }
    };

    return `Decide the next action based on this JSON:\n${JSON.stringify(payload, null, 2)}`;
  };

  const planNextAction = async ({
    observations,
    state,
    defaultAction,
    step
  }) => {
    if (typeof fetch !== 'function') {
      return defaultAction;
    }

    if (requestCount >= maxRequests) {
      log('LLM planner maxRequests reached, using default.', { step, defaultAction });
      return defaultAction;
    }

    await maybeDelay();

    const response = await fetch(OPENAI_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: buildUserPrompt({ observations, state, defaultAction, step }) }
        ]
      })
    });

    requestCount += 1;
    lastRequestAt = Date.now();

    if (!response.ok) {
      log('LLM planner request failed, using default.', { step, status: response.status });
      return defaultAction;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      log('LLM planner empty response, using default.', { step });
      return defaultAction;
    }

    try {
      const action = JSON.parse(content);
      const normalized = normalizeAction(action, defaultAction);
      log('LLM planner decision', { step, action: normalized });
      return normalized;
    } catch (error) {
      log('LLM planner JSON parse failed, using default.', { step });
      return defaultAction;
    }
  };

  return { planNextAction };
};
