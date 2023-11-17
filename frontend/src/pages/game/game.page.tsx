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

function GamePage() {

    const [loadingPlayers, setLoadingPlayers] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(AlertMessagesConstants.ERROR_ALERT as string);

    useEffect(() => {
        const url: string = import.meta.env.VITE_BACKEND_URL + "/games";
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        const socket = io(url, {extraHeaders: {authorization: token}});
        socket.connect();
        socket.on('connect', () => {
            socket.on('EVENT_START_GAME', (data) => {
                console.log("Game Started", data);
            });

            socket.on('EVENT_START_TURN', (data) => {
                console.log("Turn Started", data);
            });

            socket.on('EVENT_CHANGE_TURN', (data) => {
                console.log("Turn changed", data);
            });

            socket.on('EVENT_ERROR', () => {
                console.log("SUCEDIÓ UN ERROR");
            })
        });
    }, []);

    return (
        <div id={"game-page-container"}>
            <div>
                <GamePlayersComponent
                    setAlertMessage={setAlertMessage}
                    setLoading={setLoadingPlayers}
                />
            </div>
            <div>
                <GameTableComponent/>
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
        </div>
    )
}

export default GamePage;