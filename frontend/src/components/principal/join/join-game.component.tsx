import './join-game.component.css';
import {Button, IconButton, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import React from "react";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {Link} from "react-router-dom";

function JoinGameComponent() {

    const testList = [
        {
            id: "1",
            name: 'Un nombre super largo y extenso',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "2",
            name: 'Test 2',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "3",
            name: 'Test 3',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "4",
            name: 'Test 4',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "5",
            name: 'Test 5',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "6",
            name: 'Test 5',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
        {
            id: "7",
            name: 'Test 5',
            totalDue: 1000,
            requiredPlayers: 10,
            totalPlayers: 6,
        },
    ]

    return (
        <div id={"join-game-component-container"}>
            <div id={"join-game-content-info"}><h1 id={"join-game-component-tittle"}>Ingresar</h1></div>
            <div id={"join-game-component-public"}>
                <div id={"join-game-component-public-list-container"}>
                    {testList.map((game) => {
                        return (
                            <ListItem
                                className={"join-game-component-public-list-item"}
                                key={game.id}
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
                                            {`Apuesta: ${game.totalDue} - Jugadores: ${game.requiredPlayers}/${game.totalPlayers}`}
                                        </Typography>
                                    </React.Fragment>
                                }/>
                            </ListItem>
                        )
                    })}
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
    )
}

export default JoinGameComponent;