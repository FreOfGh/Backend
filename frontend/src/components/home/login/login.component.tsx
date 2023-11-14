import './login.component.css';
import {Button, TextField} from "@mui/material";
import {PasswordInputComponent} from "../../shared/inputs/password/password-input.component.tsx";


function LoginComponent() {

    return (
        <div id={"login-component-container"}>
            <div><h1 id={"login-component-tittle"}>Iniciar sesión</h1></div>
            <form id={"login-component-form"} autoComplete={"off"}>
                <TextField
                    className={"login-component-form-input"}
                    required
                    variant="filled"
                    label="Nombre de usuario"
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
                <PasswordInputComponent className={"login-component-form-input"}></PasswordInputComponent>
            </form>
            <div id={"login-component-send-container"}>
                <Button id={"login-component-send-button"} variant="contained">Ingresar</Button>
            </div>
        </div>
    )
}

export default LoginComponent;