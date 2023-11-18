import './join-game.component.css';
import {Button, IconButton, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import React, {useEffect, useState} from "react";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {Navigate} from "react-router-dom";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import Game from "../../../types/models/game.ts";
import GetPublicGamesResponse from "../../../types/services/public-games/get-public-games.response.ts";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import JoinGameRequest from "../../../types/services/join-game/join-game.request.ts";
import JoinGameResponse from "../../../types/services/join-game/join-game.response.ts";
import {AlertsUtils} from "../../../utils/alerts.utils.ts";

function JoinGameComponent(props: {
    loading: boolean,
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void)
    setAlertType: (param: string) => (void),
}) {

    const [games, setGames] = useState<Array<Game> | null>(null);
    const [code, setCode] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        async function fetchData() {
            props.setLoading(true);
            try {
                const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
                const {data} = await AxiosUtils.get<GetPublicGamesResponse, never>(BackendConstants.GET_PUBLIC_GAMES_URL, undefined, token);
                setGames(data.data);
                props.setLoading(false);
            } catch (err) {
                AxiosUtils.mapError(err as ErrorResponse, () => {
                    props.setLoading(false)
                })
            }
        }

        fetchData()
    }, []);

    const handleSetAlertMessage = (message: string, type: string = AlertMessagesConstants.ERROR_ALERT): boolean => {
        props.setAlertMessage(message);
        props.setAlertType(type);
        return false;
    }

    const join = (propCode?: string): boolean | void => {
        const gameCode = propCode ?? code;
        if (!gameCode) return handleSetAlertMessage(AlertMessagesConstants.CODE_GAME_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (gameCode.length != 8) return handleSetAlertMessage(AlertMessagesConstants.CODE_GAME_LENGTH_INVALID, AlertMessagesConstants.WARNING_ALERT);
        props.setLoading(true);
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        const body: JoinGameRequest = {gameCode};
        AxiosUtils.patch<JoinGameResponse, JoinGameRequest>(BackendConstants.JOIN_GAME_URL, body, token)
            .then(({data}) => {
                sessionStorage.setItem(SessionStorageConstants.CURRENT_GAME, JSON.stringify(data.data));
                props.setLoading(false);
                setRedirect(true);
            })
            .catch((err: ErrorResponse) => AxiosUtils.mapError(err, () => {
                props.setLoading(false);
                handleSetAlertMessage(AlertsUtils.resolveMessage(err.response.data.message));
            }, false));
    }

    return (
        <div id={"join-game-component-container"}>
            <div id={"join-game-content-info"}><h1 id={"join-game-component-tittle"}>Ingresar</h1></div>
            <div id={"join-game-component-public"}>
                <div id={"join-game-component-public-list-container"}>
                    {games ? games.map((game) => {
                        return (
                            <ListItem
                                className={"join-game-component-public-list-item"}
                                key={game.gameId}
                                disableGutters
                                secondaryAction={
                                    <IconButton aria-label="comment" onClick={() => {
                                        join(game.code);
                                    }}>
                                        <AddCircleOutlined className={"join-game-list-button"}></AddCircleOutlined>
                                    </IconButton>
                                }
                            >
                                <ListItemText className={""} primary={game.name} secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{display: 'inline', color: "#EBEBEB"}}
                                            component="span"
                                            variant="body2"
                                        >
                                            {`Apuesta: ${game.totalBet} - Jugadores: ${game.totalPlayers}/${game.requiredPlayers}`}
                                        </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                        )
                    }) : <></>}
                </div>
            </div>
            <div id={"join-game-component-private"}>
                <div className={"join-game-component-button-container"}>
                    <TextField
                        className={"join-game-component-private-input"}
                        required
                        variant="filled"
                        value={code}
                        onChange={(e) => e.target.value.length > 8 ? setCode(code) : setCode(e.target.value)}
                        label="Código"
                        InputLabelProps={{style: {color: '#47525E'}}}
                    />
                </div>
                <div className={"join-game-component-button-container"}>
                    <Button
                        className={"join-game-component-private-input"}
                        onClick={() => join()}
                        variant="contained"
                    >Aceptar</Button>
                </div>
            </div>
            {redirect ? <Navigate to={RoutesConstants.GAME}/> : <></>}
        </div>
    );
}

export default JoinGameComponent;