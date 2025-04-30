
/** Check if a value is not null (applies type predicate) */
export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

/** Rethrow an error with a new message and the original error as the cause */
export function rethrowBecause(error: unknown, reason: string) : never {
  if( error instanceof Error) {
    throw new Error(reason, {cause: error});
  }else{
    // ensure that rethrown Errors are always an instance of Error
    throw new Error(reason, {cause: new Error('Unknown error: ' + String(error))});
  }
}