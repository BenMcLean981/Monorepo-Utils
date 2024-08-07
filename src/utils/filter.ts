export function notUndefined<T>(t: T | undefined): t is T {
  return t !== undefined;
}

export function notUndefinedOrError<T>(t: T | undefined): T {
  if (t === undefined) {
    throw new Error('Undefined data.');
  }

  return t;
}
