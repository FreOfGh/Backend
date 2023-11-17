import './buy-tokens.component.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";

export default function BuyTokensComponent(props: {
    open: boolean,
    handleOpen: (param: boolean) => (void),
}) {

    const tokenPrice: number = 100;
    const [tokens, setTokens] = useState<string | number>(0);

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                {"Comprar tokens"}
            </DialogTitle>
            <DialogContent>
                <div id={"alert-dialog-container"}>
                    <div>
                        <TextField
                            className={"join-game-component-private-input buy-tokens-component-input"}
                            required
                            variant="filled"
                            label="Cantidad"
                            value={tokens}
                            onChange={(e) => Number.isInteger(Number(e.target.value)) ? (Number(e.target.value) == 0 ? setTokens('') : setTokens(Number(e.target.value))) : setTokens(tokens)}
                            InputLabelProps={{style: {color: '#47525E'}}}
                        />
                    </div>
                    <div id={"buy-tokens-component-page-line-container"}>
                        <div id={"buy-tokens-component-page-line"}></div>
                    </div>
                    <div id={"buy-tokens-component-info"}>
                        <p>Precio del token: {tokenPrice} COP</p>
                        <p>Total: {Number(tokens) * tokenPrice} COP</p>
                    </div>
                </div>
                <DialogContentText>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    className={"buy-tokens-component-button"}
                    variant="contained"
                    onClick={() => props.handleOpen(false)}>Cancelar</Button>
                <Button
                    className={"buy-tokens-component-button"}
                    variant="contained"
                    onClick={() => props.handleOpen(false)}
                    autoFocus>Comprar</Button>
            </DialogActions>
        </Dialog>
    )
}