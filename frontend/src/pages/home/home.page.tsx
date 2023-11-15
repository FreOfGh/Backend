import LoginComponent from "../../components/home/login/login.component.tsx";
import './home.page.css';
import RegisterComponent from "../../components/home/register/register.component.tsx";

function HomePage() {
    return (
        <div id={"home-page-container"}>
            <div id={"home-page-header"}>
                <h1 className={"home-page-title"}>Apuntado</h1>
            </div>
            <div id={"home-page-login"}>
                <LoginComponent></LoginComponent>
            </div>
            <div id={"home-page-line-container"}>
                <div id={"home-page-line"}></div>
            </div>
            <div id={"home-page-register"}>
                <RegisterComponent></RegisterComponent>
            </div>
        </div>
    )
}

export default HomePage;