export function isNullOrBlank(value: string) {
  return !value || value.trim().length <= 0;
}

export function capitalise(value: string) {
  return value[0].toUpperCase() + value.substring(1);
}
