import './card-designs.page.css';
import User from "../../types/models/user.ts";
import {SessionStorageConstants} from "../../constants/session-storage.constants.ts";
import CurrentCardDesignComponent
    from "../../components/card-designs/current-card-design/current-card-design-component.tsx";
import React, {useState} from "react";
import ActiveCardDesignsComponent
    from "../../components/card-designs/active-card-designs/active-card-designs.component.tsx";
import LoadingComponent from "../../components/shared/loading/loading.component.tsx";
import AlertComponent from "../../components/shared/alert/alert.component.tsx";
import AlertMessagesConstants from "../../constants/alert-messages.constants.ts";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {RoutesConstants} from "../../constants/routes.constants.ts";

function CardDesignsPage() {

    const user: User = JSON.parse(sessionStorage.getItem(SessionStorageConstants.USER) as string);
    const [selectedDesign, setSelectedDesign] = useState(user.cardDesign);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(AlertMessagesConstants.ERROR_ALERT as string);

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
                    >Cancelar</Button>
                </Link>
                <div className={"card-designs-page-button-container"}>
                    <Button className={"card-designs-page-button"}
                            variant="contained">Aceptar</Button>
                </div>
            </div>
            <div id={"card-designs-allowed-designs"}>
                <ActiveCardDesignsComponent
                    setSelectedDesign={setSelectedDesign}
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