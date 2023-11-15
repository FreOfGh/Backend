import './principal-header.component.css';
import {Button, ButtonGroup} from "@mui/material";
import User from "../../../types/models/user.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {Link} from 'react-router-dom';
import {RoutesConstants} from "../../../constants/routes.constants.ts";

function PrincipalHeaderComponent() {
    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);

    return (
        <div id={"principal-header-container"}>
            <div id={"principal-header-buttons-container"}>
                <ButtonGroup
                    variant="contained"
                    id={"principal-header-button-group"}
                    aria-label="outlined primary button group"
                >
                    <div className={"principal-header-button-container"}>
                        <Button className={"principal-header-button"}>Tutorial</Button>
                    </div>
                    <Link to={RoutesConstants.CARD_DESIGNS} className={"principal-header-button-container"}>
                        <Button className={"principal-header-button"}>Personalizar</Button>
                    </Link>
                    <div className={"principal-header-button-container"}>
                        <Button className={"principal-header-button"}>Conprar tokens</Button>
                    </div>
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