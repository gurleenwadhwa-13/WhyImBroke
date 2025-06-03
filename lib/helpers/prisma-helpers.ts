import { Prisma } from "../generated/prisma";

export function serializePrisma(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(serializePrisma);
  }

  if (obj instanceof Object) {
    const result: any = {};
    for (const key in obj) {
      const value = obj[key];
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
