import { Path } from './path';

export interface File {
  readonly path: Path;

  read(): string;
}
