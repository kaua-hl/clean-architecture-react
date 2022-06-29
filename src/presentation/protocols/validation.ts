export interface Validation {
  validate (input: object): string; //retorna string ou null se não conter nenhum erro.
}