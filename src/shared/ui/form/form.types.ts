import type { ComponentProps } from 'react';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export type FormProps<T extends FieldValues> = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};
