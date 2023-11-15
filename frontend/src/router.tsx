import {createBrowserRouter} from "react-router-dom";
import HomePage from "./pages/home/home.page.tsx";
import {PrincipalPage} from "./pages/principal/principal.page.tsx";
import {RoutesConstants} from "./constants/routes.constants.ts";

const Router = createBrowserRouter([
    {
        path: RoutesConstants.HOME,
        element: <HomePage></HomePage>
    },
    {
        path: RoutesConstants.PRINCIPAL,
        element: <PrincipalPage></PrincipalPage>
    },
    {
        path: RoutesConstants.GAME,
        element: <p>Game</p>
    }
])

export default Router;