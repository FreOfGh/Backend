import {createBrowserRouter} from "react-router-dom";
import HomePage from "./pages/home/home.page.tsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>
    },
])

export default Router;