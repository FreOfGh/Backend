import Game from "../../models/game.ts";

type CreateGameResponse = {
    success: boolean,
    data: Game
}

export default CreateGameResponse;