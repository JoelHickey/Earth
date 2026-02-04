import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { createCvTestAgent } from './cv-agent';
import { createCvLlmPlanner } from './cv-planner';

test('CV agentic regression pass', async ({ page }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.CV_AGENT_MODEL;
  const enableLogs = process.env.CV_AGENT_LOG === '1';
  const enableDebug = process.env.CV_AGENT_DEBUG === '1';
  const logFile = process.env.CV_AGENT_LOG_FILE;
  const minDelayMs = Number.parseInt(process.env.CV_AGENT_MIN_DELAY_MS || '0', 10);
  const maxRequestsRaw = process.env.CV_AGENT_MAX_REQUESTS;
  const maxRequests = maxRequestsRaw ? Number.parseInt(maxRequestsRaw, 10) : undefined;
  const logger = (message, data) => {
    if (!enableLogs && !enableDebug && !logFile) {
      return;
    }
    const payload = {
      timestamp: new Date().toISOString(),
      message,
      data: data ?? null
    };
    if (logFile) {
      fs.appendFileSync(logFile, `${JSON.stringify(payload)}\n`);
    }
    if (enableLogs || enableDebug) {
      console.log(`[cv-agent] ${message}`, data ?? '');
    }
  };
  const planner = apiKey && model ? createCvLlmPlanner({
    apiKey,
    model,
    logger,
    minDelayMs: Number.isNaN(minDelayMs) ? 0 : minDelayMs,
    maxRequests: Number.isNaN(maxRequests) ? undefined : maxRequests
  }) : null;
  const agent = createCvTestAgent(page, expect, {
    planner: planner ? planner.planNextAction : null,
    logger: enableDebug ? logger : null
  });
  await agent.run({ maxSteps: 14 });
});
