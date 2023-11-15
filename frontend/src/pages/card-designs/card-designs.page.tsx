import './card-designs.page.css';
import User from "../../types/models/user.ts";
import {SessionStorageConstants} from "../../constants/session-storage.constants.ts";
import CurrentCardDesignComponent
    from "../../components/card-designs/current-card-design/current-card-design-component.tsx";
import {useState} from "react";
import ActiveCardDesignsComponent
    from "../../components/card-designs/active-card-designs/active-card-designs.component.tsx";
import LoadingComponent from "../../components/shared/loading/loading.component.tsx";
import AlertComponent from "../../components/shared/alert/alert.component.tsx";
import AlertMessagesConstants from "../../constants/alert-messages.constants.ts";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {RoutesConstants} from "../../constants/routes.constants.ts";
import {AxiosUtils} from "../../utils/axios.utils.ts";
import {BackendConstants} from "../../constants/backend.constants.ts";
import {AlertsUtils} from "../../utils/alerts.utils.ts";
import ChangeCardDesignRequest from "../../types/services/change-card-design/change-card-design.request.ts";
import ChangeCardDesignResponse from "../../types/services/change-card-design/change-card-design.response.ts";

function CardDesignsPage() {

    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);
    const [selectedDesign, setSelectedDesign] = useState(user.cardDesign);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(AlertMessagesConstants.ERROR_ALERT as string);

    const handleSetAlertMessage = (message: string, type: string = AlertMessagesConstants.ERROR_ALERT): boolean => {
        setAlertMessage(message);
        setAlertType(type);
        return false;
    }

    const handleChangeCardDesign = (): boolean | void => {
        if (selectedDesign === user.cardDesign) return handleSetAlertMessage(AlertMessagesConstants.CARD_DESIGN_NOT_CHANGE, AlertMessagesConstants.WARNING_ALERT)
        setLoading(true);
        const body: ChangeCardDesignRequest = {cardDesignId: selectedId as string};
        const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
        AxiosUtils.patch<ChangeCardDesignResponse, ChangeCardDesignRequest>(BackendConstants.CHANGE_CARD_DESIGN, body, token)
            .then(({data}) => {
                sessionStorage.setItem(SessionStorageConstants.USER, JSON.stringify(data.data));
                setLoading(false);
                handleSetAlertMessage(AlertMessagesConstants.CARD_DESIGN_CHANGED, AlertMessagesConstants.SUCCESS_ALERT);
            })
            .catch((err: ErrorResponse) => AxiosUtils.mapError(err, mapSetDesignErrors));
    }

    const mapSetDesignErrors = (err: ErrorResponse): void | boolean => {
        setLoading(false);
        handleSetAlertMessage(AlertsUtils.resolveMessage(err.response.data.message));
    }

    return (
        <div id={"card-designs-page-container"}>
            <div id={"card-designs-current-design"}>
                <CurrentCardDesignComponent cardDesign={selectedDesign}></CurrentCardDesignComponent>
            </div>
            <div id={"card-designs-buttons"}>
                <Link to={RoutesConstants.PRINCIPAL} className={"card-designs-page-button-container"}>
                    <Button
                        className={"card-designs-page-button"}
                        variant="contained"
                    >Atrás</Button>
                </Link>
                <div className={"card-designs-page-button-container"}>
                    <Button
                        onClick={handleChangeCardDesign}
                        className={"card-designs-page-button"}
                        variant="contained">Aceptar</Button>
                </div>
            </div>
            <div id={"card-designs-allowed-designs"}>
                <ActiveCardDesignsComponent
                    setSelectedDesign={setSelectedDesign}
                    setSelectedId={setSelectedId}
                    setLoading={setLoading}
                    loading={loading}
                    setAlertMessage={setAlertMessage}
                ></ActiveCardDesignsComponent>
            </div>
            <LoadingComponent loading={loading}></LoadingComponent>
            <AlertComponent
                message={alertMessage}
                type={alertType}
                setAlertMessage={setAlertMessage}
            />
        </div>
    )
}

export default CardDesignsPage;