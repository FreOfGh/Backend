import './game-table.component.css';
import {useState} from "react";
import Player from "../../../types/models/player.ts";
import User from "../../../types/models/user.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import GetPlayerResponse from "../../../types/services/get-player/get-player.response.ts";

export default function GameTableComponent(props: {
    searchCurrentPlayer: boolean,
    setSearchCurrentPlayer: (param: boolean) => (void)
}) {

    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);
    const [player, setPlayer] = useState<Player | undefined>();

    const searchCurrentPlayer = async () => {
        try {
            const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
            const {data} = await AxiosUtils.get<GetPlayerResponse, never>(BackendConstants.GET_PLAYER_URL, undefined, token);
            setPlayer(data.data);
            props.setSearchCurrentPlayer(false);
        } catch (err) {
            AxiosUtils.mapError(err as ErrorResponse, mapErrorsGettingActive)
        }
    }

    const mapErrorsGettingActive = (): void | boolean => {
        props.setSearchCurrentPlayer(false);
    }

    if (props.searchCurrentPlayer) searchCurrentPlayer();
    return (
        <div id={"game-table-component-container"}>
            <div id={"game-table-component-match"}>
                <div id={"game-table-component-match-desk"}></div>
                <div id={"game-table-component-match-discarded"}></div>
            </div>
            <div id={"game-table-component-cards"}>
                {player ?
                    <div className={"game-table-cards-container"}>
                        <div className={"game-table-cards-container-tern"}>
                            <div>
                                {player.terna1.map((c) => {
                                    return (
                                        <img key={c.symbol + c.type} alt={"Error"}
                                             className={"card-designs-img-card"}
                                             src={'/src/assets/card-designs/' + user.cardDesign + '/' + c.symbol + c.type + '.png'}
                                        />)
                                })}
                            </div>
                            <div>
                                {player.terna2.map((c) => {
                                    return (
                                        <img key={c.symbol + c.type} alt={"Error"}
                                             className={"card-designs-img-card"}
                                             src={'/src/assets/card-designs/' + user.cardDesign + '/' + c.symbol + c.type + '.png'}
                                        />)
                                })}
                            </div>
                        </div>
                        <div className={"game-table-cards-container-tern"}>
                            <div>
                                {player.cuarta.map((c) => {
                                    return (
                                        <img key={c.symbol + c.type} alt={"Error"}
                                             className={"card-designs-img-card"}
                                             src={'/src/assets/card-designs/' + user.cardDesign + '/' + c.symbol + c.type + '.png'}
                                        />)
                                })}
                            </div>
                            <div>
                                {player.sobrante ?
                                    <img key={player.sobrante.symbol + player.sobrante.type} alt={"Error"}
                                         className={"card-designs-img-card"}
                                         src={'/src/assets/card-designs/' + user.cardDesign + '/' + player.sobrante.symbol + player.sobrante.type + '.png'}
                                    /> : <></>}
                            </div>
                        </div>
                    </div>
                    : <></>}
            </div>
        </div>
    )
}