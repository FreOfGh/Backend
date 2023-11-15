import PrincipalHeaderComponent from '../../components/principal/header/principal-header.component';
import './principal.page.css';
import CreateGameComponent from "../../components/principal/create/create-game.component.tsx";
import JoinGameComponent from "../../components/principal/join/join-game.component.tsx";

export function PrincipalPage() {
    return (
        <div id={"principal-page-container"}>
            <div id={"principal-page-header"}>
                <PrincipalHeaderComponent></PrincipalHeaderComponent>
            </div>
            <div>
                <CreateGameComponent></CreateGameComponent>
            </div>
            <div id={"principal-page-line-container"}>
                <div id={"principal-page-line"}></div>
            </div>
            <div>
                <JoinGameComponent></JoinGameComponent>
            </div>
        </div>
    )
}