import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Layout = () => {
    return (
        <>
            <div className="wrapper">
                <Sidebar />
                <div className="p-4 sm:ml-64">
                    <Topbar />
                    <Outlet>

                    </Outlet>
                </div>
            </div>
        </>
    )
}

export default Layout;