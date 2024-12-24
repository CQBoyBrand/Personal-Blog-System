import { FC, useState } from "react";
import Header from "./Header";
import Content from "./Content";
import SideBar from "./SideBar";
import "./layout.scss";

const Layout: FC = () => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const menuToggle = () => {
        setMenuCollapsed(!menuCollapsed);
    }
    return (
        <div className="layout_container">
            <Header menuCollapsed={menuCollapsed} menuToggle={menuToggle} />
            <div className="layout_content">
                <SideBar menuCollapsed={menuCollapsed} menuToggle={menuToggle} />
                <Content />
            </div>
        </div>
    )
}
export default Layout;