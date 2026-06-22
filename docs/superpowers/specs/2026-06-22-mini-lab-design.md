# Mini Lab Design

## Purpose

Add a compact interactive showcase that proves practical web and computer skills without presenting invented client work. The section will feel like part of the existing dark Build Lab portfolio and will use one demo panel rather than stacking four full-height demos.

## Placement and Layout

Place the Mini Lab after the Toolkit section and before the existing portfolio build section.

The section uses one console-style panel rather than four project cards. On desktop, a narrow left menu lists the four demos and the selected demo fills the right stage. On mobile, the menu becomes a horizontally scrollable tab row above the stage. Only one demo is visible at a time.

The panel retains the portfolio's charcoal surfaces, thin borders, warm white text, orange accent, restrained glow, and monospaced utility labels. It uses the approved visual mockup stored in `.superpowers/brainstorm/675-1782127523/content/mini-lab-layout.html` as its layout reference.

## Demo Behaviors

### Responsive Preview

- Show a miniature responsive landing page.
- Provide Desktop and Mobile controls.
- Switching controls changes the preview frame and rearranges its content.
- The demo remains fully code-native and does not load an external website.

### Task Tracker

- Start with two useful sample tasks.
- Allow visitors to add a non-empty task, mark tasks complete, filter by All, Active, or Done, and remove a task.
- Keep task data only in React state. It resets when the page refreshes.
- Prevent empty submissions and show a short inline validation message.

### Password Checker

- Use a password input with a show or hide control.
- Update a strength meter and requirement list while the visitor types.
- Evaluate length, uppercase, lowercase, number, and symbol rules locally.
- Do not store, log, transmit, or persist the entered value.
- Include a visible note that checking happens only in the browser.

### File Organizer

- Clearly label the experience as a simulation.
- Start with a small set of sample filenames across documents, images, code, and miscellaneous files.
- An Organize button groups the samples into named folders with a short animation.
- A Reset button restores the messy list.
- Do not request filesystem permissions or interact with real files.

## State and Component Boundaries

Create a `MiniLabSection` composition component and focused child demos. The section owns the selected demo identifier. Each child owns only its own temporary state.

Use a shared demo definition containing an identifier, label, short description, icon, and component. The selected identifier determines which demo renders. Switching demos unmounts the previous demo and discards its temporary state; no persistence is required.

Suggested components:

- `MiniLabSection`
- `MiniLabMenu`
- `ResponsivePreviewDemo`
- `TaskTrackerDemo`
- `PasswordCheckerDemo`
- `FileOrganizerDemo`

## Interaction and Accessibility

- Implement the demo menu as an accessible tab interface with arrow-key navigation and clear selected, hover, and focus states.
- Associate each tab with its tab panel.
- Use native buttons, inputs, labels, and form submission behavior.
- Announce task validation and file-organization results without disruptive alerts.
- Preserve readable contrast and visible focus indicators.
- Respect `prefers-reduced-motion`; state changes remain immediate when animation is disabled.

## Error Handling

- Task Tracker rejects whitespace-only tasks without changing the list.
- Password Checker accepts any text but never sends it outside the component.
- File Organizer uses fixed local sample data, so it has no loading or permission failure state.
- Unexpected missing demo identifiers fall back to Responsive Preview.

## Responsive Behavior

- Desktop uses a menu-and-stage split layout.
- Viewports 768px and wider use the split layout with a narrower menu when space is limited.
- Viewports below 768px use scrollable tabs above a single-column stage.
- Controls wrap without horizontal page overflow.
- Demo content stays usable at 320px viewport width.

## Testing

- Verify all four tabs select the correct demo with mouse, touch, and keyboard.
- Verify Task Tracker add, reject-empty, complete, filter, and remove flows.
- Verify Password Checker requirements, strength levels, and show or hide control.
- Verify File Organizer organize and reset flows and the simulation label.
- Verify Desktop and Mobile responsive preview states.
- Verify reduced-motion behavior and visible focus states.
- Run TypeScript, ESLint, production build, and browser checks at desktop and mobile sizes.

## Out of Scope

- External APIs, accounts, databases, analytics, file uploads, and real filesystem access.
- Claims that the demos are client projects.
- Separate routes or project detail pages.
- Saving demo state between page visits.
