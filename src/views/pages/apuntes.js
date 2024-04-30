import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter";
import SectionApuntes from "views/sections/apuntes-sections/sectionApuntes";

function Apuntes() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });
    return (
        <>
            <IndexNavbar />
            <IndexHeader />
            <div className="main">
                <div className="page-title">
                    <h1>Apuntes</h1>
                </div>
                <SectionApuntes />
            </div>
            <br />
            <DemoFooter className="index-page" />
        </>
    );
}

export default Apuntes;



