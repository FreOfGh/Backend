import PrincipalHeaderComponent from '../../components/principal/header/principal-header.component';
import './principal.page.css';
import CreateGameComponent from "../../components/principal/create/create-game.component.tsx";
import JoinGameComponent from "../../components/principal/join/join-game.component.tsx";
import LoadingComponent from "../../components/shared/loading/loading.component.tsx";
import {useState} from "react";
import AlertMessagesConstants from "../../constants/alert-messages.constants.ts";
import AlertComponent from "../../components/shared/alert/alert.component.tsx";
import BuyTokensComponent from "../../components/principal/buy-tokens/buy-tokens.component.tsx";

export function PrincipalPage() {

    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingPublicGames, setloadingPublicGames] = useState(false);
    const [loadingCreateGame, setLoadingCreateGame] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(AlertMessagesConstants.WARNING_ALERT as string);
    const [openTokens, setOpenTokens] = useState(false);

    return (
        <div id={"principal-page-container"}>
            <div id={"principal-page-header"}>
                <PrincipalHeaderComponent
                    loading={loadingUser}
                    setLoading={setLoadingUser}
                    setOpenTokens={setOpenTokens}
                ></PrincipalHeaderComponent>
            </div>
            <div>
                <CreateGameComponent
                    setLoading={setLoadingCreateGame}
                    setAlertMessage={setAlertMessage}
                    setAlertType={setAlertType}
                ></CreateGameComponent>
            </div>
            <div id={"principal-page-line-container"}>
                <div id={"principal-page-line"}></div>
            </div>
            <div id={"principal-page-join-game"}>
                <JoinGameComponent
                    setAlertMessage={setAlertMessage}
                    setAlertType={setAlertType}
                    setLoading={setloadingPublicGames}
                    loading={loadingPublicGames}
                ></JoinGameComponent>
            </div>
            <LoadingComponent loading={loadingPublicGames || loadingUser || loadingCreateGame}></LoadingComponent>
            <AlertComponent
                message={alertMessage}
                type={alertType}
                setAlertMessage={setAlertMessage}
            />
            <BuyTokensComponent open={openTokens} handleOpen={setOpenTokens}></BuyTokensComponent>
        </div>
    )
}