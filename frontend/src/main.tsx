import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {RouterProvider} from "react-router-dom";
import Router from "./router.tsx";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: 'Agbalumo'
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={Router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
