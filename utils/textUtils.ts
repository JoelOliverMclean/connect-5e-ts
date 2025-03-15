export function isNullOrBlank(value: string) {
  return !value || value.trim().length <= 0;
}
