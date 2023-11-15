import './login.component.css';
import {Button, TextField} from "@mui/material";
import {PasswordInputComponent} from "../../shared/inputs/password/password-input.component.tsx";
import {useState} from "react";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import LoginResponse from "../../../types/services/login/login.response.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import LoginRequest from "../../../types/services/login/login.request.ts";
import {AlertsUtils} from "../../../utils/alerts.utils.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {Navigate} from "react-router-dom";
import {RoutesConstants} from '../../../constants/routes.constants.ts';


function LoginComponent(props: {
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void)
    setAlertType: (param: string) => (void),
}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const handleSetAlertMessage = (message: string, type: string = AlertMessagesConstants.ERROR_ALERT): boolean => {
        props.setAlertMessage(message);
        props.setAlertType(type);
        return false;
    }

    const login = (): void | boolean => {
        if (!username) return handleSetAlertMessage(AlertMessagesConstants.USERNAME_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (!password) return handleSetAlertMessage(AlertMessagesConstants.PASSWORD_MISSING, AlertMessagesConstants.WARNING_ALERT);
        props.setLoading(true);
        const body: LoginRequest = {username: username.toLowerCase(), password};
        AxiosUtils.post<LoginResponse, LoginRequest>(BackendConstants.LOGIN_URL, body)
            .then(({data}) => {
                sessionStorage.setItem(SessionStorageConstants.AUTH_TOKEN, data.data.token);
                sessionStorage.setItem(SessionStorageConstants.USER, JSON.stringify(data.data.user));
                props.setLoading(false);
                setRedirect(true);
            })
            .catch((err: ErrorResponse) => AxiosUtils.mapError(err, mapErrorsLogin, false));
    }

    const mapErrorsLogin = (err: ErrorResponse): void | boolean => {
        props.setLoading(false);
        handleSetAlertMessage(AlertsUtils.resolveMessage(err.response.data.message));
    }

    return (
        <div id={"login-component-container"}>
            <div><h1 id={"login-component-tittle"}>Iniciar sesión</h1></div>
            <form id={"login-component-form"} autoComplete={"off"}>
                <TextField
                    className={"login-component-form-input"}
                    required
                    value={username}
                    variant="filled"
                    label="Nombre de usuario"
                    InputLabelProps={{style: {color: '#47525E'}}}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordInputComponent
                    className={"login-component-form-input"}
                    setPassword={setPassword}
                    value={password}
                ></PasswordInputComponent>
            </form>
            <div id={"login-component-send-container"}>
                <Button id={"login-component-send-button"} variant="contained" onClick={login}>Ingresar</Button>
            </div>
            {redirect ? <Navigate to={RoutesConstants.PRINCIPAL}/> : <></>}
        </div>
    )
}

export default LoginComponent;