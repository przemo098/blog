import { flushSync } from 'react-dom';

/**
 * Wraps a state-changing callback so the user's viewport position
 * relative to the nearest visible CV block is preserved after re-render.
 *
 * Uses flushSync to force React to commit DOM changes synchronously,
 * then immediately corrects scroll position — no timing races.
 */
export function withScrollLock(callback: () => void) {
  const blocks = document.querySelectorAll<HTMLElement>('[data-cv-block]');

  const stickyHeader = document.querySelector('.sticky');
  const headerHeight = stickyHeader?.getBoundingClientRect().height ?? 0;

  // Find anchor: first block visible below sticky header
  let anchor: HTMLElement | null = null;
  let viewportOffset = 0;

  for (const block of blocks) {
    const rect = block.getBoundingClientRect();
    // Pick the first block whose top edge is visible below the sticky header.
    // Skip blocks partially scrolled behind the header — if they grow taller
    // (e.g. from a filter toggle), the correction would not help blocks below them.
    if (rect.top >= headerHeight - 10) {
      anchor = block;
      viewportOffset = rect.top;
      break;
    }
  }

  if (!anchor) {
    callback();
    return;
  }

  const savedAnchor = anchor;

  // flushSync forces React to synchronously process all setState calls
  // triggered by the callback (via RxJS BehaviorSubject), commit DOM
  // changes, and return — DOM is fully updated after this line.
  flushSync(() => callback());

  // DOM is now updated — correct scroll position immediately
  const currentAbsoluteY = savedAnchor.getBoundingClientRect().top + window.scrollY;
  const targetScroll = currentAbsoluteY - viewportOffset;
  if (Math.abs(window.scrollY - targetScroll) > 1) {
    window.scrollTo(0, targetScroll);
  }
}
