import LazyImportComponent from "@/components/LazyImportComponent";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
    FundOutlined,
    SettingFilled,
    BarsOutlined
} from "@ant-design/icons";
import PermissionCheck from "./authLoader";
const Login = lazy(() => import("@/views/Login/Login"));
const Layout = lazy(() => import("@/components/Layout/Layout"));
const noAuth = lazy(() => import("@/components/ErrorPage/403"));
const notFound = lazy(() => import("@/components/ErrorPage/404"));
const ErrorBoundary = lazy(() => import("@/components/ErrorBoundary/Index"));
// 根据文件目录自动生成路由
// let rout = import.meta.glob("../views/**/*.tsx");
// console.log(rout);
/**
 * 路由配置
 * 1. path 路由路径
 * 2. title 标题
 *  以上两个参数的值必须保持一样，国际化的时候需要用到！
 */
interface IRoute {
    path: string;
    title: string;
    key?: string;
    id?: string;
    index?: true;
    icon?: React.ReactNode;
    element?: React.ReactNode;
    errorElement?: React.ReactNode;
    children?: IRoute[];
}
export const RouteMap: IRoute[] = [
    {
        path: "/login",
        key: "login",
        id: "login",
        title: "login",
        element: <LazyImportComponent lazyChildren={Login} />,
    },
    {
        path: "/",
        id: "layout",
        key: "layout",
        title: "layout",
        element: <PermissionCheck><LazyImportComponent lazyChildren={Layout} /></PermissionCheck>,
        children: [
            {
                index: true, 
                id: "Dashboard",
                key: "Dashboard",
                title: `Dashboard`,
                path: "Dashboard",
                icon: <FundOutlined />,
                element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Dashboard/Index"))} />,
            },
            {
                id: 'article',
                path: 'article',
                key: 'article',
                title: 'article',
                icon: <SettingFilled />,
                children: [
                    {
                        index: true, 
                        id: 'articleList',
                        path: 'articleList',
                        key: 'articleList',
                        title: 'articleList',
                        icon: <SettingFilled />,
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Article/ArticleList"))} />,
                    },
                    {
                        id: 'articlePublish',
                        path: 'articlePublish',
                        key: 'articlePublish',
                        title: 'articlePublish',
                        icon: <SettingFilled />,
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Article/ArticlePublish"))} />,
                    }
                ]
            },
            {
                id: "category",
                key: "category",
                title: "category",
                icon: <SettingFilled />,
                path: "category",
                children: [
                    {
                        index: true, 
                        id: "categoryList",
                        key: "categoryList",
                        path: "categoryList",
                        icon: <BarsOutlined />,
                        title: "categoryList",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Category/Category"))} />,
                        children: []
                    },
                ]
            },
            {
                id: "tag",
                key: "tag",
                title: "tag",
                icon: <SettingFilled />,
                path: "tag",
                children: [
                    {
                        index: true, 
                        id: "tagList",
                        key: "tagList",
                        path: "tagList",
                        icon: <BarsOutlined />,
                        title: "tagList",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Tag/Tag"))} />,
                        children: []
                    },
                ]
            },
            {
                id: "comment",
                key: "comment",
                title: "comment",
                icon: <SettingFilled />,
                path: "comment",
                children: [
                    {
                        index: true, 
                        id: "commentList",
                        key: "commentList",
                        path: "commentList",
                        icon: <BarsOutlined />,
                        title: "commentList",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Comment/Comment"))} />,
                        children: []
                    },
                ]
            },
            {
                id: "link",
                key: "link",
                title: "link",
                icon: <SettingFilled />,
                path: "link",
                children: [
                    {
                        index: true, 
                        id: "linkList",
                        key: "linkList",
                        path: "linkList",
                        icon: <BarsOutlined />,
                        title: "linkList",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Friend/Friend"))} />,
                        children: []
                    },
                ]
            },
            {
                id: "ad",
                key: "ad",
                title: "ad",
                icon: <SettingFilled />,
                path: "ad",
                children: [
                    {
                        index: true, 
                        id: "adList",
                        key: "adList",
                        path: "adList",
                        icon: <BarsOutlined />,
                        title: "adList",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/Ad/Ad"))} />,
                        children: []
                    },
                ]
            },
            {
                id: "setting",
                key: "setting",
                title: "setting",
                path: "setting",
                icon: <SettingFilled />,
                children: [
                    {
                        index: true, 
                        id: "usersetting",
                        key: "usersetting",
                        path: "usersetting",
                        title: "usersetting",
                        icon: <BarsOutlined />,
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/SystemConfiguration/ManagerUsers/UserSetting"))} />,
                        children: []
                    },
                    {
                        id: "websetting",
                        key: "websetting",
                        path: "websetting",
                        icon: <BarsOutlined />,
                        title: "websetting",
                        element: <LazyImportComponent lazyChildren={lazy(() => import("@/views/SystemConfiguration/ManagerWeb/WebSetting"))} />,
                        children: []
                    },
                ]
            },
        ],
        errorElement: <ErrorBoundary />
    },
    {
        path: "/403",
        title: "/403",
        id: "NoAuth",
        key: "NoAuth",
        element: <LazyImportComponent lazyChildren={noAuth} />,
    },
    {
        path: "/404",
        title: "/404",
        id: "NotFound",
        key: "NotFound",
        element: <LazyImportComponent lazyChildren={notFound} />,
    },
    {
        path: "*",
        title: "*",
        element: <Navigate to="/Login" />,
    },
]