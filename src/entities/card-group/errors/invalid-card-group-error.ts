// Coupling = 0
export class InvalidCardGroupError extends Error {
  constructor(reason: string) {
    super(`Invalid Card Group - Reason: ${reason}`);
  }
}
