import './register.component.css';
import {Button, TextField} from "@mui/material";
import {PasswordInputComponent} from "../../shared/inputs/password/password-input.component.tsx";
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AlertsUtils} from "../../../utils/alerts.utils.ts";
import RegisterRequest from "../../../types/services/register/register.request.ts";
import RegisterResponse from "../../../types/services/register/register.response.ts";

function RegisterComponent(props: {
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void)
    setAlertType: (param: string) => (void),
}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSetAlertMessage = (message: string, type: string = AlertMessagesConstants.ERROR_ALERT): boolean => {
        props.setAlertMessage(message);
        props.setAlertType(type);
        return false;
    }


    const register = (): void | boolean => {
        if (!username) return handleSetAlertMessage(AlertMessagesConstants.USERNAME_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (!password) return handleSetAlertMessage(AlertMessagesConstants.PASSWORD_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (!passwordConfirmation) return handleSetAlertMessage(AlertMessagesConstants.PASSWORD_CONFIRMATION_MISSING, AlertMessagesConstants.WARNING_ALERT);
        if (password !== passwordConfirmation) return handleSetAlertMessage(AlertMessagesConstants.PASSWORDS_ARE_DIFFERENT, AlertMessagesConstants.WARNING_ALERT);
        props.setLoading(true);
        const body: RegisterRequest = {username: username.toLowerCase(), password};
        AxiosUtils.post<RegisterResponse, RegisterRequest>(BackendConstants.REGISTER_URL, body)
            .then(({data}) => {
                sessionStorage.setItem(SessionStorageConstants.AUTH_TOKEN, data.data.token);
                sessionStorage.setItem(SessionStorageConstants.USER, JSON.stringify(data.data.user));
                props.setLoading(false);
                setRedirect(true);
            })
            .catch((err: ErrorResponse) => AxiosUtils.mapError(err, mapErrorsRegister, false));
    }

    const mapErrorsRegister = (err: ErrorResponse): void | boolean => {
        props.setLoading(false);
        handleSetAlertMessage(AlertsUtils.resolveMessage(err.response.data.message));
    }


    return (
        <div id={"register-component-container"}>
            <div><h1 id={"register-component-tittle"}>Registrarse</h1></div>
            <form id={"register-component-form"} autoComplete={"off"}>
                <TextField
                    className={"register-component-form-input"}
                    required
                    variant="filled"
                    label="Nombre de usuario"
                    value={username}
                    InputLabelProps={{style: {color: '#47525E'}}}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordInputComponent className={"register-component-form-input"}
                                        setPassword={setPassword}></PasswordInputComponent>
                <PasswordInputComponent className={"register-component-form-input"}
                                        labelName={"Confirmar contraseña"}
                                        setPassword={setPasswordConfirmation}></PasswordInputComponent>
            </form>
            <div id={"register-component-send-container"}>
                <Button
                    id={"register-component-send-button"}
                    onClick={register}
                    variant="contained"
                >Confirmar</Button>
            </div>
            {redirect ? <Navigate to={RoutesConstants.PRINCIPAL}/> : <></>}
        </div>
    )
}

export default RegisterComponent;