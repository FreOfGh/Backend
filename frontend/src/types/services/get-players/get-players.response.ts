import Player from "../../models/player.ts";

type GetPlayersResponse = {
    success: boolean,
    data: Array<Player>
}
export default GetPlayersResponse;