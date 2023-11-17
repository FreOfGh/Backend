import './game-players.component.css';
import {useEffect, useState} from "react";
import Player from "../../../types/models/player.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import Game from "../../../types/models/game.ts";
import GetPlayersResponse from "../../../types/services/get-players/get-players.response.ts";
import GetPlayersRequest from "../../../types/services/get-players/get-players.request.ts";
import User from "../../../types/models/user.ts";
import {PlayerStatusConstants} from "../../../constants/player-status.constants.ts";

function GamePlayersComponent(props: {
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void),
}) {

    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);
    const [players, setPlayers] = useState<Array<Player> | null>(null)
    useEffect(() => {
        async function fetchData() {
            props.setLoading(true);
            try {
                const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
                const game: Game = JSON.parse(sessionStorage.getItem(SessionStorageConstants.CURRENT_GAME) as string);
                const request: GetPlayersRequest = {gameId: game.gameId};
                const {data} = await AxiosUtils.get<GetPlayersResponse, GetPlayersRequest>(
                    BackendConstants.GET_PLAYERS_URL, request, token
                );
                setPlayers(data.data);
                props.setLoading(false);
            } catch (err) {
                AxiosUtils.mapError(err as ErrorResponse, mapErrorsGettingActive)
            }
        }

        const mapErrorsGettingActive = (): void | boolean => {
            props.setLoading(false);
            props.setAlertMessage(AlertMessagesConstants.CANNOT_GET_PLAYERS)
        }

        fetchData();
    }, []);


    return (
        <div id={"game-players-component-container"}>
            {players ? players.map((player) => {
                return (
                    <div key={player.playerId}
                         className={`game-players-component-container-card 
                         ${player.userId === user.userId ? "game-players-component-container-card-selected" : ""}
                         ${player.status === PlayerStatusConstants.IN_TURN ? "border-player" : ""}
                         `}>
                        <div className={"game-players-component-container-card-info"}>
                            <img className={`game-players-info-image
                                    ${player.status === PlayerStatusConstants.IN_TURN ? "img-border-player" : ""}
                                    `}
                                 src={"/src/assets/profile-images/" + player.userIcon + ".png"}></img>
                            <p>{player.username}</p>
                        </div>
                        <div className={"game-players-component-container-card-design"}>
                            <img alt={"Error"}
                                 className={"card-designs-player-img-card"}
                                 src={'/src/assets/card-designs/' + player.userDesign + '/P1.png'}
                            />
                        </div>
                        <div className={"game-players-component-container-card-points"}>
                            <p className={"game-players-score-text"}>Puntaje: {player.score}</p>
                        </div>
                    </div>
                )
            }) : <></>}
        </div>
    )
}

export default GamePlayersComponent;