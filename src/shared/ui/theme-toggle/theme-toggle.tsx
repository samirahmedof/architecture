import { type ThemePreference, useUiStore } from '@shared/store/ui.store.ts';
import { Select } from '@shared/ui/select/select.tsx';

const OPTIONS: { label: string; value: ThemePreference }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export const ThemeToggle = () => {
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);

  return (
    <Select
      options={OPTIONS}
      value={theme}
      onValueChange={(value) => setTheme(value as ThemePreference)}
      small
    />
  );
};
