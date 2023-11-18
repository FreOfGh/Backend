import Game from "../../models/game.ts";

type JoinGameResponse = {
    success: boolean,
    data: Game;
}

export default JoinGameResponse;