import {Backdrop, CircularProgress} from "@mui/material";

function LoadingComponent(props: { loading: boolean }) {
    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={props.loading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}

export default LoadingComponent;