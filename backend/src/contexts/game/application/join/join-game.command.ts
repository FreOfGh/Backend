export class JoinGameCommand {
    constructor(
        public readonly userId: string,
        public readonly code: string,
    ) {
    }
}