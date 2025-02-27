import { Outlet } from "react-router";
import Navigation from "../Navigation/Navigation";
import Header from "../../Shared/Header/Header";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen md:flex">
            <div className="hidden md:block md:w-2/5 lg:w-1/5">
                <Navigation />
            </div>
            <div className="relative w-full md:w-4/5">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Main;