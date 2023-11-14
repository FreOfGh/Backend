import {
    createTheme,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ThemeProvider
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from "react";

const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#47525E !important",
                    fontFamily: "Agbalumo"
                }
            }
        }
    }
});


export function PasswordInputComponent(props: { className: string, labelName?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl
            className={props.className}
        >
            <ThemeProvider theme={theme}>
                <InputLabel
                    required
                    variant={'filled'}
                    htmlFor="filled-adornment-password">
                    {props.labelName || "Contraseña"}
                </InputLabel>
            </ThemeProvider>
            <FilledInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}