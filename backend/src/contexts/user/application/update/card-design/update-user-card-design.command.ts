export class UpdateUserCardDesignCommand {
    constructor(
        public readonly userId: string,
        public readonly cardDesignId: string,
    ) {
    }
}