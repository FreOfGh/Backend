import './game-footer.component.css';
import {Button} from "@mui/material";
import Game from "../../../types/models/game.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";

export default function GameFooterComponent() {

    const game: Game = JSON.parse(sessionStorage.getItem(SessionStorageConstants.CURRENT_GAME) as string);

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
            </div>
        </div>
    )
}