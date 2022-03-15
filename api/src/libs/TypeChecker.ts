export function isNumeric(value: unknown) {
  const valueType = typeof value;

  const validTypes = ["number", "string", "bigint"];
  if (!validTypes.includes(valueType)) return false;

  if (valueType === "number" || valueType === "bigint") return true;

  // At this point only the "string" type is available, but the above filtering
  // isn't hint enough for typescript, so "as" is used (CF 28.02.22).
  return !isNaN(parseFloat(value as string));
}
