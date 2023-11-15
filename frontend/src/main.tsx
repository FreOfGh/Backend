import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {RoutesConstants} from "./constants/routes.constants.ts";
import HomePage from "./pages/home/home.page.tsx";
import {PrincipalPage} from "./pages/principal/principal.page.tsx";
import {SessionStorageConstants} from "./constants/session-storage.constants.ts";


const theme = createTheme({
    typography: {
        fontFamily: 'Agbalumo'
    }
})

export const Guard = ({element}: { element: React.ReactNode }): React.ReactNode => {
    const location = useLocation();
    return !!sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN)
        ? <>{element}</>
        : <Navigate to={RoutesConstants.HOME} replace state={{from: location}}/>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={RoutesConstants.GAME} element={<Guard element={<p>Game</p>}/>}></Route>
                    <Route path={RoutesConstants.PRINCIPAL} element={<Guard element={<PrincipalPage/>}/>}></Route>
                    <Route path={RoutesConstants.HOME} element={<HomePage/>}></Route>
                    <Route path='*' element={<Navigate to={RoutesConstants.HOME} replace/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
