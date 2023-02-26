export class InvalidCardGroupError extends Error {
  constructor(reason: string) {
    super(`Invalid Card Group - Reason: ${reason}`);
  }
}
