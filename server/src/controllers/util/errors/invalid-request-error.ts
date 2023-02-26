export class InvalidRequestError extends Error {
  constructor(missingParameters: string[]) {
    super(
      `Invalid Request with Missing Mandatory Parameters: ${missingParameters}`
    );
  }
}
