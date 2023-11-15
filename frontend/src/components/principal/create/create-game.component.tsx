import './create-game.component.css';
import {Button, TextField} from "@mui/material";
import CheckBoxGroupComponent from "../../shared/inputs/check-box-group/check-box-group.component.tsx";
import {Link} from "react-router-dom";
import {RoutesConstants} from "../../../constants/routes.constants.ts";


function CreateGameComponent() {
    return (
        <div id={"create-game-component-container"}>
            <div id={"create-game-content-info"}><h1 id={"create-game-component-tittle"}>Crear juego</h1></div>
            <form id={"create-game-component-form"} autoComplete={"off"}>
                <CheckBoxGroupComponent fromLabel={"Jugadores"} values={
                    [
                        {value: 2, label: "2"},
                        {value: 3, label: "3"},
                        {value: 4, label: "4"},
                        {value: 5, label: "5"},
                        {value: 6, label: "6"},
                    ]}/>
                <CheckBoxGroupComponent fromLabel={"Visibilidad"} values={
                    [
                        {value: true, label: "Pública"},
                        {value: false, label: "Privada"},
                    ]}/>
                <TextField
                    className={"create-game-component-form-input"}
                    required
                    variant="filled"
                    label="Nombre"
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
                <TextField
                    className={"create-game-component-form-input"}
                    required
                    variant="filled"
                    label="Valor de apuesta"
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
            </form>
            <div id={"create-game-component-send-container"}>
                <Link to={RoutesConstants.GAME} id={"create-game-component-send-link"}>
                    <Button id={"create-game-component-send-button"} variant="contained">Aceptar</Button>
                </Link>
            </div>
        </div>
    );
}

export default CreateGameComponent;