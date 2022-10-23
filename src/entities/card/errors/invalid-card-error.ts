// Coupling = 0
export class InvalidCardError extends Error {
	constructor (reason: string) {
		super(`Invalid Card - Reason: ${reason}`);
	}
}