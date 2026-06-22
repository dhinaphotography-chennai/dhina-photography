// Centralized runtime config for client/server usage.
// Use NEXT_PUBLIC_APP_NAME to override at build/runtime for client-exposed name.
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Praveen Photography'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ''
