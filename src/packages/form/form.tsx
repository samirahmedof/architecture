import { FormProvider } from 'react-hook-form';
import type { FormProps } from './form.types.ts';

export const Form = <T extends object>({
  methods,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className} noValidate {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
