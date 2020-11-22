function isString(value: unknown): value is string {
  return typeof value === 'string'
}

const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const parametrize = (s: string): string => {
  return s.replace(' ', '').replace('-', '_').toLowerCase()
}

export { isString, capitalize, parametrize }
