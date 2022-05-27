export function isNumeric(value: unknown) {
  const valueType = typeof value;

  const validTypes = ["number", "string", "bigint"];
  if (!validTypes.includes(valueType)) return false;

  if (valueType === "number" || valueType === "bigint") return true;

  // At this point only the "string" type is available, but the above filtering
  // isn't hint enough for typescript, so "as" is used (CF 28.02.22).
  return !isNaN(parseFloat(value as string));
}

export function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isBool(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isPrimitive(
  value: unknown
): value is string | number | bigint | boolean | symbol | undefined {
  const valueType = typeof value;
  return (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "bigint" ||
    valueType === "boolean" ||
    valueType === "symbol" ||
    valueType === "undefined"
  );
}
