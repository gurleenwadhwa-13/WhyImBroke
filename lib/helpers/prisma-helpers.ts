import { Decimal } from "@prisma/client/runtime/library";

export function serializePrisma<T>(data: T): T {
  if (data === null || data === undefined) return data;

  if (Array.isArray(data)) {
    return data.map((item) => serializePrisma(item)) as T;
  }

  if (typeof data === "object") {
    const serialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (Decimal.isDecimal(value)) {
        serialized[key] = value.toNumber();
      } else if (value instanceof Date) {
        serialized[key] = value.toISOString();
      } else if (typeof value === "object") {
        serialized[key] = serializePrisma(value);
      } else {
        serialized[key] = value;
      }
    }
    return serialized;
  }

  return data;
}
