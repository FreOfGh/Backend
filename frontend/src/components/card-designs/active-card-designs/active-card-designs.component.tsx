import './active-card-designs.component.css';
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import ActiveCardDesignsResponse from "../../../types/services/active-card-designs/active-card-designs.response.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";
import {useEffect, useState} from "react";
import CardDesign from "../../../types/models/card-design.ts";
import AlertMessagesConstants from "../../../constants/alert-messages.constants.ts";
import {Button} from "@mui/material";

function ActiveCardDesignsComponent(props: {
    loading: boolean,
    setLoading: (param: boolean) => (void),
    setAlertMessage: (param: string) => (void),
    setSelectedDesign: (param: string) => (void),
}) {
    const [data, setData] = useState<Array<CardDesign> | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            props.setLoading(true);
            try {
                const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
                const {data} = await AxiosUtils.get<ActiveCardDesignsResponse, never>(BackendConstants.ACTIVE_CARD_DESIGNS_URL, undefined, token)
                setData(data.data);
                props.setLoading(false);
            } catch (error) {
                setError(true);
                props.setLoading(false);
                props.setAlertMessage(AlertMessagesConstants.CANNOT_GET_ACTIVE_CARD_DESIGNS)
            }
        }

        fetchData();
    }, []);

    if (error || props.loading) return (<></>)
    if (data) {
        return (
            <div id={"active-card-design-component-container"}>
                {
                    data.map(cD => {
                        return (
                            <div key={cD.cardDesignId} className={"active-card-design-card"}>
                                <h3 className={"active-card-design-title"}>{cD.title}</h3>
                                <div className={"active-card-design-select-button-container"}>
                                    <Button className={"active-card-design-page-button"}
                                            variant="contained"
                                            onClick={() => props.setSelectedDesign(cD.name)}>Seleccionar</Button>
                                </div>
                                <img alt={"Error"}
                                     className={"card-designs-img-card card-design-img-card-active-card"}
                                     src={'/src/assets/card-designs/' + cD.name + '/P1.png'}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ActiveCardDesignsComponent;