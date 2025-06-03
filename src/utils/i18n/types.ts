export type SupportedLocales = 'pt' | 'en'

export type LocaleContentType = {
  messages: {
    required: string
    invalidEmail: string
    passwordMinLength: string
    nameMinLength: string
    passwordMismatch: string
    invalidPhone: string
    invalidDate: string
    dateInPast: string
    dateInFuture: string
    alreadyExists: string
    valueTooHigh: (field: string, max: number) => string
    valueTooLow: (field: string, min: number) => string
    invalidFormat: (field: string) => string
    maxLength: (field: string, max: number) => string
    minLength: (field: string, min: number) => string
  }
  placeholders: {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
  }
  titles: {
    login: string
    register: string
    forgotPassword: string
    profile: string
  }
  descriptions: {
    login: string
    register: string
    forgotPassword: string
    profile: string
  }
  buttons: {
    submit: string
    cancel: string
    save: string
    delete: string
    back: string
  }
  errors: {
    serverError: string
    networkError: string
    notFound: string
    forbidden: string
    unauthorized: string
    timeout: string
    validationFailed: string
    unknown: string
  }
  httpErrors: Partial<Record<number, string>>
}
