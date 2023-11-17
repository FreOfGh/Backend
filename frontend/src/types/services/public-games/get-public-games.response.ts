import Game from "../../models/game.ts";

type GetPublicGamesResponse = {
    success: boolean,
    data: Array<Game>
}

export default GetPublicGamesResponse;