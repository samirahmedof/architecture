import {clsx} from 'clsx';
import s from './grid.module.scss';
import type {ContainerProps, RowProps, ColProps} from './grid.types.ts'; // Module import


export const Container = ({children, className, fluid, ...props}: ContainerProps) => {
    const classes = clsx(s.container, fluid && s.fluid, className)
    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};


export const Row = ({children, className, align, ...props}: RowProps) => {
    const classes = clsx(
        s.row,
        align && s[`align-${align}`],
        className
    )
    return (
        <div className={classes}{...props}>
            {children}
        </div>
    );
};


export const Col = ({
                        children, className, span, sm, md, lg, xl,xxl, auto, ...props
                    }: ColProps) => {
    const classes = clsx(
        s.col,
        span && s[`col-${span}`],
        sm && s[`sm-${sm}`],
        md && s[`md-${md}`],
        lg && s[`lg-${lg}`],
        xl && s[`xl-${xl}`],
        xxl && s[`xxl-${xxl}`],
        auto && s.auto,
        className
    )
    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};