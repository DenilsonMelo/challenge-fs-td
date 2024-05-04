export function mask(value: string) {
  let newValue = value;
  newValue = newValue?.replace(/\D/g, "");
  if (newValue?.length === 11) {
    newValue = newValue?.replace(/^(\d{2})(\d)/g, "($1) $2");
    newValue = newValue?.replace(/(\d{5})(\d)/, "$1-$2");
  } else {
    newValue = newValue?.replace(/^(\d{2})(\d)/g, "($1) $2");
    newValue = newValue?.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return newValue;
}
