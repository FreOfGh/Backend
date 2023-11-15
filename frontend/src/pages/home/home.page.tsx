import LoginComponent from "../../components/home/login/login.component.tsx";
import './home.page.css';
import RegisterComponent from "../../components/home/register/register.component.tsx";
import {useState} from "react";
import LoadingComponent from "../../components/shared/loading/loading.component.tsx";
import AlertComponent from "../../components/shared/alert/alert.component.tsx";
import AlertMessagesConstants from "../../constants/alert-messages.constants.ts";

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(AlertMessagesConstants.WARNING_ALERT as string);

    return (
        <div id={"home-page-container"}>
            <div id={"home-page-header"}>
                <h1 className={"home-page-title"}>Apuntado</h1>
            </div>
            <div id={"home-page-login"}>
                <LoginComponent
                    setLoading={setLoading}
                    setAlertType={setAlertType}
                    setAlertMessage={setAlertMessage}
                ></LoginComponent>
            </div>
            <div id={"home-page-line-container"}>
                <div id={"home-page-line"}></div>
            </div>
            <div id={"home-page-register"}>
                <RegisterComponent
                    setLoading={setLoading}
                    setAlertType={setAlertType}
                    setAlertMessage={setAlertMessage}
                ></RegisterComponent>
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

export default HomePage;