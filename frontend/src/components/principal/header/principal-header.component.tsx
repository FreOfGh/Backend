import './principal-header.component.css';
import {Button, ButtonGroup} from "@mui/material";
import User from "../../../types/models/user.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";

function PrincipalHeaderComponent() {
    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);

    return (
        <div id={"principal-header-container"}>
            <div id={"principal-header-buttons-container"}>
                <ButtonGroup
                    sx={{
                        ".MuiButtonGroup-grouped:not(:last-of-type)": {
                            borderColor: "#13CE66",
                        },
                    }}
                    variant="contained"
                    id={"principal-header-button-group"}
                    aria-label="outlined primary button group"
                >
                    <Button className={"principal-header-button"}>Tutorial</Button>
                    <Button className={"principal-header-button"}>Personalizar</Button>
                    <Button className={"principal-header-button"}>Conprar tokens</Button>
                </ButtonGroup>
            </div>
            <div id={"principal-header-info"}>
                <div id={"principal-header-info-image"}></div>
                <h2 id={"principal-header-info-tokens"}>{user.tokens}</h2>
            </div>
        </div>
    )
}

export default PrincipalHeaderComponent;