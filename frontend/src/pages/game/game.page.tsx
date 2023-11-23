import './game.page.css';
import GamePlayersComponent from "../../components/game/players/game-players.component.tsx";
import {useEffect, useState} from "react";
import LoadingComponent from "../../components/shared/loading/loading.component.tsx";
import AlertMessagesConstants from "../../constants/alert-messages.constants.ts";
import AlertComponent from "../../components/shared/alert/alert.component.tsx";
import {io} from "socket.io-client";
import {SessionStorageConstants} from "../../constants/session-storage.constants.ts";
import GameTableComponent from "../../components/game/table/game-table.component.tsx";
import GameFooterComponent from "../../components/game/footer/game-footer.component.tsx";
import {SocketEventConstants} from "../../constants/socket-event.constants.ts";
import {AlertsUtils} from "../../utils/alerts.utils.ts";
import Game from "../../types/models/game.ts";
import {AxiosUtils} from "../../utils/axios.utils.ts";
import {BackendConstants} from "../../constants/backend.constants.ts";
import {GameStatusConstants} from "../../constants/game-status.constants.ts";
import GetGameRequest from "../../types/services/get-game/get-game.request.ts";
import GetGameResponse from "../../types/services/get-game/get-game.response.ts";
import {Navigate} from "react-router-dom";
import {RoutesConstants} from "../../constants/routes.constants.ts";

function GamePage() {

    const [searchPlayers, setSearchPlayers] = useState(true);
    const [searchCurrentPlayer, setSearchCurrentPlayer] = useState(false);
    const [loadingPlayers, setLoadingPlayers] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType] = useState(AlertMessagesConstants.ERROR_ALERT as string);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        const searchGame = async () => {
            try {
                const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
                const game: Game = JSON.parse(sessionStorage.getItem(SessionStorageConstants.CURRENT_GAME) as string);
                const request: GetGameRequest = {gameId: game.gameId};
                const {data} = await AxiosUtils.get<GetGameResponse, GetGameRequest>(BackendConstants.GET_GAME_URL, request, token);
                sessionStorage.setItem(SessionStorageConstants.CURRENT_GAME, JSON.stringify(data.data));
                setSearchCurrentPlayer(game && game.status == GameStatusConstants.ACTIVE);
            } catch (err) {
            }
        }

        searchGame();
        const url: string = import.meta.env.VITE_BACKEND_URL + "/games";
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        const socket = io(url, {extraHeaders: {authorization: token}});
        socket.connect();
        socket.on('connect', () => {
            socket.on(SocketEventConstants.EVENT_START_GAME, () => {
                console.log("GAME STARTED");
                setSearchPlayers(true);
                setSearchCurrentPlayer(true);
            });
            socket.on(SocketEventConstants.EVENT_START_TURN, () => {
                setSearchPlayers(true);
            });
            socket.on(SocketEventConstants.EVENT_CHANGE_TURN, () => {
                setSearchPlayers(true);
                setSearchCurrentPlayer(true);
            });
            socket.on(SocketEventConstants.EVENT_JOIN_GAME, () => {
                setSearchPlayers(true);
            });
            socket.on(SocketEventConstants.EVENT_ERROR, (e: ErrorResponse) => {
                setAlertMessage(AlertsUtils.resolveMessage(e.response.data.message));
            });
            socket.on(SocketEventConstants.EVENT_WIN_GAME, () => {
                setAlertMessage(AlertsUtils.resolveMessage(AlertMessagesConstants.YOU_WIN_THE_GAME));
                setRedirect(true);
            })
        });
    }, []);

    return (
        <div id={"game-page-container"}>
            <div>
                <GamePlayersComponent
                    searchPlayers={searchPlayers}
                    setSearchPlayers={setSearchPlayers}
                    setAlertMessage={setAlertMessage}
                    setLoading={setLoadingPlayers}
                />
            </div>
            <div>
                <GameTableComponent
                    searchCurrentPlayer={searchCurrentPlayer}
                    setSearchCurrentPlayer={setSearchCurrentPlayer}/>
            </div>
            <div>
                <GameFooterComponent/>
            </div>
            <LoadingComponent loading={loadingPlayers}></LoadingComponent>
            <AlertComponent
                message={alertMessage}
                type={alertType}
                setAlertMessage={setAlertMessage}
            />
            {redirect ? <Navigate to={RoutesConstants.PRINCIPAL}></Navigate> : <></>}
        </div>

    )
}

export default GamePage;