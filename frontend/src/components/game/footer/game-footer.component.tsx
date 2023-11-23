import './game-footer.component.css';
import {Button} from "@mui/material";
import Game from "../../../types/models/game.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import JoinGameRequest from "../../../types/services/join-game/join-game.request.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import {Navigate} from "react-router-dom";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {useState} from "react";
import LoadingComponent from "../../shared/loading/loading.component.tsx";

export default function GameFooterComponent() {

    const game: Game = JSON.parse(sessionStorage.getItem(SessionStorageConstants.CURRENT_GAME) as string);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const leave = () => {
        setLoading(true);
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        const body: JoinGameRequest = {gameCode: game.code};
        AxiosUtils.patch<{ success: boolean }, { gameCode: string }>(BackendConstants.LEAVE_GAME_URL, body, token)
            .then(() => {
                setLoading(false);
                setRedirect(true);
            })
            .catch((err: ErrorResponse) => AxiosUtils.mapError(err, () => {
                setLoading(false);
            }, false));
    }

    return (
        <div id={"game-footer-component-container"}>
            <div id={"game-footer-component-info"}>
                <p id={"game-footer-component-info-text"}>Código: {game.code}</p>
                <p id={"game-footer-component-info-text"}>Apuesta: {game.requiredPlayers * game.totalBet}</p>
            </div>
            <div id={"game-footer-component-buttons"}>
                <Button className={"game-button"}
                    variant="contained">Tocar</Button>
                <Button className={"game-button"}
                        variant="contained">Ganar</Button>
                <Button className={"game-button-2"} onClick={leave}>Salir</Button>

            </div>
            <LoadingComponent loading={loading}></LoadingComponent>
            {redirect ? <Navigate to={RoutesConstants.PRINCIPAL}></Navigate> : <></>}

        </div>
    )
}