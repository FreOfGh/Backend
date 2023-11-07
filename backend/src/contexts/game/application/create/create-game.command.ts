export class CreateGameCommand {
    constructor(
        public readonly userId: string,
        public readonly requiredPlayers: number,
        public readonly isPublic: boolean,
        public readonly totalBet: number,
        public readonly name: string,
    ) {
    }
}