import {Alert, AlertColor, Snackbar} from "@mui/material";

function AlertComponent(props: {
    message?: string, type: string, setAlertMessage: (param: string) => (void)
}) {
    return (
        <Snackbar open={!!props.message} autoHideDuration={6000} onClose={() => props.setAlertMessage("")}>
            <Alert severity={props.type as AlertColor} sx={{width: '100%'}} onClose={() => props.setAlertMessage("")}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

export default AlertComponent;