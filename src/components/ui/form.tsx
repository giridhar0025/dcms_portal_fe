import { useForm, FormProvider } from 'react-hook-form'
import React from 'react'

export function useZodForm<T extends Record<string, unknown>>(
  defaultValues: T,
) {
  return useForm<T>({ defaultValues })
}

interface FormProps<T> {
  methods: ReturnType<typeof useForm<T>>
  onSubmit: (data: T) => void
  children: React.ReactNode
}

export function Form<T extends Record<string, unknown>>({
  methods,
  onSubmit,
  children,
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
