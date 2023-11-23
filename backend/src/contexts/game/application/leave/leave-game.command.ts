export class LeaveGameCommand {
    constructor(
        public readonly gameCode: string,
        public readonly userId: string,
    ) {
    }
}
