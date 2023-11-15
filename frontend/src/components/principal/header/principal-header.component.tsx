import './principal-header.component.css';
import {Button, ButtonGroup} from "@mui/material";
import User from "../../../types/models/user.ts";
import {SessionStorageConstants} from "../../../constants/session-storage.constants.ts";
import {Link} from 'react-router-dom';
import {RoutesConstants} from "../../../constants/routes.constants.ts";
import {useEffect, useState} from "react";
import {AxiosUtils} from "../../../utils/axios.utils.ts";
import GetUserResponse from "../../../types/services/get-user/get-user.response.ts";
import {BackendConstants} from "../../../constants/backend.constants.ts";

function PrincipalHeaderComponent(props: {
    loading: boolean,
    setLoading: (param: boolean) => (void),
}) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            props.setLoading(true);
            try {
                const token: string = sessionStorage.getItem(SessionStorageConstants.AUTH_TOKEN) as string;
                const {data} = await AxiosUtils.get<GetUserResponse, never>(BackendConstants.ME_URL, undefined, token);
                sessionStorage.setItem(SessionStorageConstants.USER, JSON.stringify(data.data))
                setUser(data.data);
                props.setLoading(false);
            } catch (err) {
                AxiosUtils.mapError(err as ErrorResponse, () => {
                        setError(true);
                        props.setLoading(false)
                    }
                )
            }
        }
        fetchData()
    }, []);

    if (error || props.loading) return (<></>)
    if (user) {
        return (
            <div id={"principal-header-container"}>
                <div id={"principal-header-buttons-container"}>
                    <ButtonGroup
                        variant="contained"
                        id={"principal-header-button-group"}
                        aria-label="outlined primary button group"
                    >
                        <div className={"principal-header-button-container"}>
                            <Button className={"principal-header-button"}>Tutorial</Button>
                        </div>
                        <Link to={RoutesConstants.CARD_DESIGNS} className={"principal-header-button-container"}>
                            <Button className={"principal-header-button"}>Personalizar</Button>
                        </Link>
                        <div className={"principal-header-button-container"}>
                            <Button className={"principal-header-button"}>Conprar tokens</Button>
                        </div>
                    </ButtonGroup>
                </div>
                <div id={"principal-header-info"}>
                    <div id={"principal-header-info-image"}></div>
                    <h2 id={"principal-header-info-tokens"}>{user.tokens}</h2>
                </div>
            </div>
        )
    }
}

export default PrincipalHeaderComponent;