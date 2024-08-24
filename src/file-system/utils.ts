export function getParentPath(path: string): string {
  const segments = path.split('/');

  if (segments.length === 2 && path.startsWith('/')) {
    return '/';
  }

  return segments.slice(0, -1).join('/');
}

export function getTopLevel(path: string): string {
  const segments = path.split('/');

  return segments[segments.length - 1];
}
