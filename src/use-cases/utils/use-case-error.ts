// Coupling = 0
export class UseCaseError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}