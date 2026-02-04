# UI Testing Baseline Guidelines

This document defines the minimum UI testing baseline for the project and the user-centered principles that must be validated in every release.

## Baseline Test Set

- Core windows open, close, minimize, and restore without errors
- Windows can be dragged and stacked (z-index) predictably
- Primary navigation and demo flows are reachable in 2 clicks or fewer
- Visual baselines render with correct fonts, spacing, and colors
- Keyboard navigation works for all interactive controls
- No blocked UI states longer than a few seconds without feedback

## How We Use This in Playwright

Use these principles as acceptance criteria in every relevant spec:

- Add a short checklist per test file for the principles covered
- Map each principle to at least one observable UI assertion
- Prefer `test.step()` blocks labeled with the principle name
- Use visual snapshots for Aesthetics and Consistency
- Use explicit assertions for Feedback, Forgiveness, and Control

### Example Mapping

- **User in Control**: verify no auto-advance after opening a window
- **Directness**: drag window/slider and assert immediate position/value change
- **Consistency**: compare button styles across windows, or assert shared classes
- **Forgiveness**: perform an action, undo/close/cancel, and verify state recovery
- **Feedback**: click/drag and assert a visible change within a short timeout
- **Aesthetics**: snapshot window chrome and spacing
- **Simplicity**: ensure only essential controls are visible by default

## Windows 95 User-Centered Principles (1995)

Add these checks to every UI test pass.

### 1. User in Control
- Actions are user-initiated; no forced auto-advances
- Any temporary mode is visible, user-selected, and easy to exit
- System preferences (fonts, colors) are respected where applicable

### 2. Directness
- Direct manipulation is obvious (drag to move windows and sliders)
- Changes appear at the point of interaction and update immediately
- Familiar metaphors support recognition over recall

### 3. Consistency
- Same control behaves the same in every view
- Labels, spacing, and visual patterns are consistent across windows
- Interaction conventions align with Windows 95 patterns

### 4. Forgiveness
- Actions are reversible where possible
- Clear constraints prevent accidental destructive actions
- Errors are recoverable without data loss

### 5. Feedback
- Every interaction has immediate visual feedback
- Loading or processing states are visible and cancelable when possible
- Feedback is shown near the interaction point

### 6. Aesthetics
- Visual hierarchy is clear and not cluttered
- Decorative elements do not compete with primary tasks
- Styling stays authentic to the Windows 95 look and feel

### 7. Simplicity
- Only essential information is shown per view
- Progressive disclosure reveals detail when needed
- Labels and messages are concise and task-focused
