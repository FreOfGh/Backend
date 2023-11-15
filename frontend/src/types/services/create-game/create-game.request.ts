type CreateGameRequest = {
    requiredPlayers: number,
    isPublic: boolean,
    totalBet: number,
    name: string
}

export default CreateGameRequest;