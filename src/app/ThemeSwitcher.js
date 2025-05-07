'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';
  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <Switch
      checked={isDark}
      onChange={toggle}
      className={({ checked }) =>
        `relative inline-flex items-center h-8 w-16 cursor-pointer rounded-full
         transition-colors ease-in-out
         ${checked ? 'bg-gray-700' : 'bg-gray-200'}`
      }
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        aria-hidden="true"
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white shadow-lg
          transition-transform ease-in-out
          ${isDark ? 'translate-x-8' : 'translate-x-1'}
        `}
      />
    </Switch>
  );
}
