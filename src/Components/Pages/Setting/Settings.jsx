import { Helmet } from "react-helmet-async";
import { Tooltip } from "react-tooltip";

const Settings = () => {
    return (
        <section className="max-h-screen min-h-screen overflow-y-auto pt-20 bg-[#FAFAFA] dark:bg-base-300">
            <Tooltip id="my-tooltip" />
            <Helmet>
                <title>GS Seller Center | Settings</title>
            </Helmet>
            <div className="flex justify-center items-center min-h-screen">
                <h1>Coming Soon...</h1>
            </div>
        </section>
    );
};

export default Settings;