export class JoinGameRoomCommand {
    constructor(
        public readonly userId: string,
        public readonly gameId: string,
    ) {
    }
}