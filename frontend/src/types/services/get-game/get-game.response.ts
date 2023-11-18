import Game from "../../models/game.ts";

type GetGameResponse = {
    success: boolean;
    data: Game;
}

export default GetGameResponse;