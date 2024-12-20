import { Navigate, useLocation  } from "react-router-dom"
const PermissionCheck = (props: any) => {
    const Location = useLocation();
    const hasPermission = sessionStorage.getItem("token");
    if (Location.pathname === '/Login') {
        return <Navigate to={'/Login'} />
    }
    if (Location.pathname === '/') {
        return <Navigate to={'/Dashboard'} />
    }
    if (!hasPermission) {
        return <Navigate to={'/Login'} />
    }
    return <>{props.children}</>;
}

export default PermissionCheck