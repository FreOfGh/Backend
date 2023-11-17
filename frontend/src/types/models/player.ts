import Card from "./card.ts";

type Player = {
    playerId: string,
    gameId: string,
    userId: string,
    username: string,
    userIcon: string,
    userDesign: string,
    position: number,
    status: string,
    score: number,
    terna1: Array<Card>,
    terna2: Array<Card>,
    cuarta: Array<Card>,
    sobrante: Card
}

export default Player;