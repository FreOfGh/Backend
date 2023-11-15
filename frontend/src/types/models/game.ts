type Game = {
    gameId: string,
    creatorId: string,
    requiredPlayers: number,
    currentPlayers: number,
    name: string,
    isPublic: boolean,
    totalBet: number,
    totalPlayers: number,
    status: string,
    code: string,
    createdAt: Date,
    updatedAt: Date,
}

export default Game;