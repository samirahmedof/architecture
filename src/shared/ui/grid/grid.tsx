import clsx from 'clsx';
import type { CSSProperties } from 'react';
import s from './grid.module.css';
import type { ColProps, ContainerProps, RowProps } from './grid.types.ts';

export const Container = ({ children, className, fluid, ...props }: ContainerProps) => {
  return (
    <div className={clsx(s.container, fluid && s.fluid, className)} {...props}>
      {children}
    </div>
  );
};

const ROW_ALIGN = {
  start: s.alignStart,
  center: s.alignCenter,
  end: s.alignEnd,
} as const;

export const Row = ({ children, className, align, ...props }: RowProps) => {
  return (
    <div className={clsx(s.row, align && ROW_ALIGN[align], className)} {...props}>
      {children}
    </div>
  );
};

/*
 * Col reads custom properties from inline `style` and lets the cascade in
 * grid.module.css resolve which span value applies at the current breakpoint.
 * No generated `.col-3 .sm-4 .md-6` classes — one rule per breakpoint covers
 * every span permutation.
 */
type ColCssVars = CSSProperties & {
  '--col-span'?: number | string;
  '--col-sm'?: number | string;
  '--col-md'?: number | string;
  '--col-lg'?: number | string;
  '--col-xl'?: number | string;
  '--col-2xl'?: number | string;
};

export const Col = ({
  children,
  className,
  span,
  sm,
  md,
  lg,
  xl,
  xxl,
  auto,
  style,
  ...props
}: ColProps) => {
  const cssVars: ColCssVars = { ...style };
  if (span !== undefined) cssVars['--col-span'] = span;
  if (sm !== undefined) cssVars['--col-sm'] = sm;
  if (md !== undefined) cssVars['--col-md'] = md;
  if (lg !== undefined) cssVars['--col-lg'] = lg;
  if (xl !== undefined) cssVars['--col-xl'] = xl;
  if (xxl !== undefined) cssVars['--col-2xl'] = xxl;

  return (
    <div className={clsx(s.col, auto && s.auto, className)} style={cssVars} {...props}>
      {children}
    </div>
  );
};
