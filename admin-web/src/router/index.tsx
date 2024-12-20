import { useRoutes } from "react-router-dom";
import { RouteMap } from "./RouteMap";
import { FC } from "react";

const Router:FC = () => {
    const router = useRoutes(RouteMap); //注册前端路由表
    return router;
};


export default Router;