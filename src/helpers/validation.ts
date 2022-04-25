export const required = (value: string) =>
  value ? undefined : 'This is required field to fill in'

export const stringMaxLength = (max: number) => (value: string) =>
  value.length <= max
    ? undefined
    : 'You have exceeded the maximum character limit'

export const stringMinLength = (min: number) => (value: string) =>
  value.length <= min ? undefined : 'This is required field to fill in'
