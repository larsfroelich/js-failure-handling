
/** Check if a value is not null (applies type predicate) */
export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

/** Rethrow an error with a new message and the original error as the cause */
export function rethrowBecause(error: Error, reason: string) : never {
  throw new Error(reason, { cause: error });
}