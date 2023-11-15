import './principal-header.component.css';
import {Button, ButtonGroup} from "@mui/material";

function PrincipalHeaderComponent() {
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
                <h2 id={"principal-header-info-tokens"}>1000</h2>
            </div>
        </div>
    )
}

export default PrincipalHeaderComponent;