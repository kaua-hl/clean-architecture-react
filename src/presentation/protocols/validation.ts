export interface Validation {
  validate (fieldName: string, fieldValue: string): string; //retorna string ou null se não conter nenhum erro.
}