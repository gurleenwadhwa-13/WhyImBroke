import { Prisma } from "../generated/prisma";

export function serializePrisma<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(serializePrisma) as T;
  }

  if (obj instanceof Object) {
    const result: any = {};
    for (const key in obj) {
      const value = (obj as any)[key];
      if (value instanceof Prisma.Decimal) {
        result[key] = value.toNumber();
      } else {
        result[key] = serializePrisma(value);
      }
    }
    return result;
  }

  return obj;
}
