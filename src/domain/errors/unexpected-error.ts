export class UnexpectedError extends Error {
  constructor() {
    super("Algo de errado aconteceu. Tente novamente em brave.")
    this.name = "UnexpectedError"
  }
}