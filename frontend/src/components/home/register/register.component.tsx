import './register.component.css';
import {Button, TextField} from "@mui/material";
import {PasswordInputComponent} from "../../shared/inputs/password/password-input.component.tsx";

export function RegisterComponent() {
    return (
        <div id={"register-component-container"}>
            <div><h1 id={"register-component-tittle"}>Registrarse</h1></div>
            <form id={"register-component-form"} autoComplete={"off"}>
                <TextField
                    className={"register-component-form-input"}
                    required
                    variant="filled"
                    label="Nombre de usuario"
                    InputLabelProps={{style: {color: '#47525E'}}}
                />
                <PasswordInputComponent className={"register-component-form-input"}></PasswordInputComponent>
                <PasswordInputComponent className={"register-component-form-input"} labelName={"Confirmar contraseña"}></PasswordInputComponent>
            </form>
            <div id={"register-component-send-container"}>
                <Button id={"register-component-send-button"} variant="contained">Confirmar</Button>
            </div>
        </div>
    )
}