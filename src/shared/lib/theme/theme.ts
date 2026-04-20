/*
 * Theme application — resolves the user's preference against
 * `prefers-color-scheme` and writes `data-theme` to <html>.
 *
 * Initial paint is handled by the inline script in index.html so the page
 * never flashes the wrong colour scheme. This module owns runtime updates
 * after hydration: user toggles + live OS theme changes while pref='system'.
 */
import { type ThemePreference, useUiStore } from '@shared/store/ui.store.ts';

export type ResolvedTheme = 'light' | 'dark';

const ATTR = 'data-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export const resolveTheme = (pref: ThemePreference): ResolvedTheme => {
  if (pref !== 'system') return pref;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
};

export const applyTheme = (resolved: ResolvedTheme): void => {
  document.documentElement.setAttribute(ATTR, resolved);
};

/**
 * Subscribes the document to ui.store theme changes and OS-level theme flips.
 * Call once at app startup, before React renders.
 */
export const initTheme = (): void => {
  const apply = () => applyTheme(resolveTheme(useUiStore.getState().theme));
  apply();

  useUiStore.subscribe((state, prev) => {
    if (state.theme !== prev.theme) apply();
  });

  window.matchMedia(DARK_QUERY).addEventListener('change', () => {
    if (useUiStore.getState().theme === 'system') apply();
  });
};
