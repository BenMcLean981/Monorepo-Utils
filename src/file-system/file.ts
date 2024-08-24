export interface File {
  readonly name: string;

  read(): string;
}
