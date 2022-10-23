// Coupling = 0
export class InvalidOperationError extends Error {
  constructor(reason: string) {
    super(`Invalid Operation - Reason: ${reason}`);
  }
}
