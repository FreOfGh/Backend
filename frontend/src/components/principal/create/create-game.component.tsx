import './create-game.component.css';
import {Button, TextField} from "@mui/material";
import CheckBoxGroupComponent from "../../shared/inputs/check-box-group/check-box-group.component.tsx";
import {useState} from "react";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import CreateGameRequest from "../../../types/services/create-game/create-game.request.ts";
import CreateGameResponse from "../../../types/services/create-game/create-game.response.ts";
import {Navigate} from "react-router-dom";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {AlertsUtils} from "../../../utils/alerts.utils.ts";


function CreateGameComponent(props: {
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void)
    setAlertType: (param: string) => (void),
}) {

    const [players, setPlayers] = useState(2);
    const [isPubic, setIsPublic] = useState(false);
    const [name, setName] = useState("");
    const [totalBet, setTotalBet] = useState<number | string>(1);
    const [redirect, setRedirect] = useState(false);

    const handleSetAlertMessage = (message: string, type: string = AlertMessagesConstants.ERROR_ALERT): boolean => {
        props.setAlertMessage(message);
        props.setAlertType(type);
        return false;
    }

    const create = (): boolean | void => {
        if (!name) return handleSetAlertMessage(AlertMessagesConstants.GAME_NAME_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (!totalBet) return handleSetAlertMessage(AlertMessagesConstants.GAME_BET_MISSING, AlertMessagesConstants.WARNING_ALERT);
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        props.setLoading(true);
        const body: CreateGameRequest = {totalBet: Number(totalBet), name, requiredPlayers: Number(players), isPublic: Boolean(isPubic)};
        AxiosUtils.post<CreateGameResponse, CreateGameRequest>(BackendConstants.CREATE_GAME_URL, body, token)
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
        <div id={"create-game-component-container"}>
            <div id={"create-game-content-info"}><h1 id={"create-game-component-tittle"}>Crear juego</h1></div>
            <form id={"create-game-component-form"} autoComplete={"off"}>
                <CheckBoxGroupComponent
                    fromLabel={"Jugadores"}
                    selected={players}
                    setSelected={setPlayers}
                    values={[
                        {value: 2, label: "2"},
                        {value: 3, label: "3"},
                        {value: 4, label: "4"},
                        {value: 5, label: "5"},
                        {value: 6, label: "6"},
                    ]}
                />
                <CheckBoxGroupComponent
                    selected={isPubic}
                    setSelected={setIsPublic}
                    fromLabel={"Visibilidad"}
                    values={[
                        {value: true, label: "Pública"},
                        {value: false, label: "Privada"},
                    ]}
                />
                <TextField
                    className={"create-game-component-form-input"}
                    required
                    variant="filled"
                    label="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
                <TextField
                    className={"create-game-component-form-input"}
                    required
                    variant="filled"
                    label="Valor de apuesta"
                    value={totalBet}
                    onChange={(e) => {
                        Number.isInteger(Number(e.target.value)) ? (Number(e.target.value) == 0 ? setTotalBet('') : setTotalBet(Number(e.target.value))) : setTotalBet(totalBet);
                    }}
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
            </form>
            <div id={"create-game-component-send-container"}>
                <Button id={"create-game-component-send-button"} onClick={create} variant="contained">Aceptar</Button>
            </div>
            {redirect ? <Navigate to={RoutesConstants.GAME}/> : <></>}
        </div>
    );
}

export default CreateGameComponent;