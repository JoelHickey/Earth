const CV_ICON_NAME = 'Curriculum Vitae';
const CV_WINDOW_LABEL = 'Curriculum Vitae window';
const CV_CONTENT_LABEL = 'Curriculum Vitae content';

const CV_SECTIONS = [
  { name: 'Experience', role: 'heading' },
  { name: 'Education', role: 'heading' },
  { name: 'Tools', role: 'heading' },
  { name: 'References', role: 'heading' }
];

export const CV_AGENT_ACTIONS = {
  OPEN: 'open',
  SECTION: 'section',
  STORY_BUTTONS: 'storyButtons',
  LINKEDIN: 'linkedIn',
  SCROLL_RESET: 'scrollReset',
  DONE: 'done'
};

export const CV_AGENT_SECTION_NAMES = CV_SECTIONS.map((section) => section.name);

export const CV_AGENT_STORY_BUTTONS = [
  'View Amendments story',
  'View Travel insurance story',
  'View Bulk shipments story'
];

const LINKEDIN_LABEL = 'Joel Hickey LinkedIn';

export const createCvTestAgent = (page, expect, { planner, logger } = {}) => {
  const state = {
    sectionsChecked: new Set(),
    storyButtonsChecked: false,
    linkedInChecked: false,
    scrollResetChecked: false
  };

  const log = (message, data) => {
    if (typeof logger === 'function') {
      logger(message, data);
    }
  };

  const cvWindow = page.getByLabel(CV_WINDOW_LABEL);
  const cvContent = page.getByLabel(CV_CONTENT_LABEL);

  const isVisible = async (locator) => {
    const count = await locator.count();
    if (count === 0) {
      return false;
    }
    return locator.first().isVisible();
  };

  const getObservations = async () => {
    const sectionVisibility = {};
    for (const section of CV_SECTIONS) {
      sectionVisibility[section.name] = await isVisible(
        page.getByRole(section.role, { name: section.name })
      );
    }

    return {
      cvVisible: await isVisible(cvWindow),
      sectionVisibility
    };
  };

  const openCvWindow = async () => {
    const cvIcon = page.getByRole('button', { name: CV_ICON_NAME });
    await expect(cvIcon).toBeVisible({ timeout: 30000 });
    await cvIcon.click();
    await expect(cvWindow).toBeVisible();
  };

  const ensureSectionVisible = async (sectionName) => {
    const heading = page.getByRole('heading', { name: sectionName });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    state.sectionsChecked.add(sectionName);
  };

  const checkStoryButtons = async () => {
    const missing = [];
    for (const label of CV_AGENT_STORY_BUTTONS) {
      const button = page.getByRole('button', { name: label });
      const count = await button.count();
      if (count === 0) {
        missing.push(label);
        continue;
      }
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeVisible();
    }
    if (missing.length) {
      log('story buttons missing', { missing });
    }
    state.storyButtonsChecked = true;
  };

  const checkLinkedInLink = async () => {
    const linkedInLink = page.getByRole('link', { name: LINKEDIN_LABEL });
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/joelhickey');
    await expect(linkedInLink).toHaveAttribute('target', '_blank');
    state.linkedInChecked = true;
  };

  const verifyScrollReset = async () => {
    await expect(cvContent).toBeVisible();
    await cvContent.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await page.getByRole('button', { name: 'Close Curriculum Vitae' }).click();
    await expect(cvWindow).not.toBeVisible();
    await openCvWindow();
    const scrollTop = await cvContent.evaluate((el) => el.scrollTop);
    expect(scrollTop).toBe(0);
    state.scrollResetChecked = true;
  };

  const decideNextAction = (observations) => {
    if (!observations.cvVisible) {
      return { type: CV_AGENT_ACTIONS.OPEN };
    }

    for (const section of CV_SECTIONS) {
      if (!observations.sectionVisibility[section.name]) {
        return { type: CV_AGENT_ACTIONS.SECTION, sectionName: section.name };
      }
    }

    if (!state.storyButtonsChecked) {
      return { type: CV_AGENT_ACTIONS.STORY_BUTTONS };
    }

    if (!state.linkedInChecked) {
      return { type: CV_AGENT_ACTIONS.LINKEDIN };
    }

    if (!state.scrollResetChecked) {
      return { type: CV_AGENT_ACTIONS.SCROLL_RESET };
    }

    return { type: CV_AGENT_ACTIONS.DONE };
  };

  const buildStateSnapshot = () => ({
    sectionsChecked: Array.from(state.sectionsChecked),
    storyButtonsChecked: state.storyButtonsChecked,
    linkedInChecked: state.linkedInChecked,
    scrollResetChecked: state.scrollResetChecked
  });

  const run = async ({ maxSteps = 12 } = {}) => {
    await page.goto('/');

    for (let step = 0; step < maxSteps; step += 1) {
      const observations = await getObservations();
      const defaultAction = decideNextAction(observations);
      const action = planner
        ? await planner({
            observations,
            state: buildStateSnapshot(),
            defaultAction,
            step
          })
        : defaultAction;

      log('agent step', { step, observations, action });

      if (action.type === CV_AGENT_ACTIONS.DONE) {
        return;
      }

      if (action.type === CV_AGENT_ACTIONS.OPEN) {
        log('action open', {});
        await openCvWindow();
        continue;
      }

      if (action.type === CV_AGENT_ACTIONS.SECTION) {
        log('action section', { sectionName: action.sectionName });
        await ensureSectionVisible(action.sectionName);
        continue;
      }

      if (action.type === CV_AGENT_ACTIONS.STORY_BUTTONS) {
        log('action storyButtons', {});
        await checkStoryButtons();
        continue;
      }

      if (action.type === CV_AGENT_ACTIONS.LINKEDIN) {
        log('action linkedIn', {});
        await checkLinkedInLink();
        continue;
      }

      if (action.type === CV_AGENT_ACTIONS.SCROLL_RESET) {
        log('action scrollReset', {});
        await verifyScrollReset();
        continue;
      }
    }

    throw new Error('CV agent exceeded max steps before completing checks.');
  };

  return { run };
};
