# Learnings Log

## 2026-01-27
- Validate UI interactions before marking tasks done (e.g., confirm demo toggles render and chips are legible).
- When asked for "full coverage," explicitly include back/cancel/exit paths on every step (e.g., cart, travellers, payment), not just forward gating.

## 2026-02-03
- For Primer `ActionMenu` overlays inside windowed UIs, register a portal root inside the window container and set `portalContainerName` so the menu stays anchored and stacks above the window.
- Avoid declaring an issue "fixed" without user confirmation; state the change made and ask the user to verify in their environment.
