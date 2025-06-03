import { LocaleContentType } from './types'

const en: LocaleContentType = {
  messages: {
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    passwordMinLength: 'Password must be at least 8 characters.',
    nameMinLength: 'Name must contain at least 1 character.',
    passwordMismatch: 'Passwords do not match.',
    invalidPhone: 'Please enter a valid phone number.',
    invalidDate: 'Invalid date.',
    dateInPast: 'Date cannot be in the past.',
    dateInFuture: 'Date cannot be in the future.',
    alreadyExists: 'This value already exists.',
    valueTooHigh: (field, max) =>
      `${field} must be less than or equal to ${max}.`,
    valueTooLow: (field, min) =>
      `${field} must be greater than or equal to ${min}.`,
    invalidFormat: (field) => `${field} has an invalid format.`,
    maxLength: (field, max) => `${field} must be at most ${max} characters.`,
    minLength: (field, min) => `${field} must be at least ${min} characters.`,
  },
  placeholders: {
    name: 'Enter your name',
    email: 'Enter your email',
    password: 'Enter your password',
    confirmPassword: 'Confirm your password',
    phone: 'Enter your phone number',
  },
  titles: {
    login: 'Login',
    register: 'Sign Up',
    forgotPassword: 'Reset Password',
    profile: 'User Profile',
  },
  descriptions: {
    login: 'Log in with your email and password.',
    register: 'Create an account by filling out the form below.',
    forgotPassword: 'Enter your email to reset your password.',
    profile: 'Update your personal information.',
  },
  buttons: {
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    back: 'Back',
  },
  errors: {
    serverError: 'Internal server error. Please try again later.',
    networkError: 'Connection error. Please check your internet.',
    notFound: 'Resource not found.',
    forbidden: "You don't have permission to access this resource.",
    unauthorized: 'Session expired. Please log in again.',
    timeout: 'Request timed out. Please try again.',
    validationFailed: 'Some fields are invalid.',
    unknown: 'An unexpected error occurred.',
  },
  httpErrors: {
    400: 'Bad request.',
    401: 'Unauthorized. Please log in.',
    403: 'Access denied.',
    404: 'Resource not found.',
    409: 'Conflict detected.',
    422: 'Validation failed. Please check the fields.',
    429: 'Too many requests. Please try again later.',
    500: 'Internal server error.',
    502: 'Bad gateway.',
    503: 'Service temporarily unavailable.',
    504: 'Server response timeout.',
  },
}

export default en
