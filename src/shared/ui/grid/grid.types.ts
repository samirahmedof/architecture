import type { ComponentProps, ReactNode } from 'react';

// Types
type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// --- CONTAINER ---
export type ContainerProps = ComponentProps<'div'> & {
  children: ReactNode;
  fluid?: boolean;
};

// --- ROW ---
export type RowProps = ComponentProps<'div'> & {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
};

// --- COL ---
export type ColProps = ComponentProps<'div'> & {
  span?: ColSize; // Mobile (xs)
  sm?: ColSize; // Small
  md?: ColSize; // Tablet
  lg?: ColSize; // Desktop
  xl?: ColSize; // Large Desktop
  xxl?: ColSize;
  auto?: boolean; // Flex-auto
};
