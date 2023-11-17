import './join-game.component.css';
import {Button, IconButton, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import React, {useEffect, useState} from "react";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {Link} from "react-router-dom";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import Game from "../../../types/models/game.ts";
import GetPublicGamesResponse from "../../../types/services/public-games/get-public-games.response.ts";

function JoinGameComponent(props: {
    loading: boolean,
    setLoading: (param: boolean) => (void),
}) {

    const [games, setGames] = useState<Array<Game> | null>(null);

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
                                    <IconButton aria-label="comment">
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
                        label="Código"
                        InputLabelProps={{style: {color: '#47525E'}}}
                    />
                </div>
                <Link to={RoutesConstants.GAME} className={"join-game-component-button-container"}>
                    <Button className={"join-game-component-private-input"}
                            variant="contained">Aceptar</Button>
                </Link>
            </div>
        </div>
    );
}

export default JoinGameComponent;