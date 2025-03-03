import { Outlet } from "react-router";
import Navigation from "../Navigation/Navigation";
import Header from "../../Shared/Header/Header";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen md:flex">
            <div className="relative hidden lg:block w-1/5 bg-gray-200 dark:bg-base-200">
                <Navigation />
            </div>
            <div className="relative w-full lg:w-4/5">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Main;