import { FC, useEffect, useState } from "react";
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { RouteMap } from "@/router/RouteMap";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface SideBarProps {
  menuCollapsed: boolean;
  menuToggle?: () => void;
}
type MenuItem = Required<MenuProps>['items'];
const SideBar: FC<SideBarProps> = (props: SideBarProps) => {
  const { menuCollapsed }= props;
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
 
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [menuList, setMenuList ] = useState<MenuItem>([])

  useEffect(() => {
    let currentPath = location.pathname;
    let pathKeys = currentPath.split("/").filter((item: any )=> item)
    
    

    let defaultOpenKeyTemp = [pathKeys[0]];
    let defaultSelectedKeysTemp = pathKeys[1] ? [pathKeys[1]] : [""];
    if (pathKeys.length > 1) {
      setDefaultOpenKeys(defaultOpenKeyTemp);
      setDefaultSelectedKeys(defaultSelectedKeysTemp);
    } else {
      setDefaultSelectedKeys(defaultOpenKeyTemp);
    }
  }, [location])

  useEffect(() => {
    RouteMap.map((item) => {
      if (item.id === "layout") {
        let menuListTemp: MenuItem = [];
        let routes = item.children || []
        routes.map((route) => { 
          let subRoutes = route?.children || [];
          let temp: any = {
            key: route?.key,
            label: t(`menu.${route?.title}`),
            icon: route?.icon,
            children: subRoutes.length > 0 ? [] : null,
          }
          subRoutes.map((route) => {
            let subTemp: any = {
              key: route?.key,
              label: t(`menu.${route?.title}`),
              icon: route?.icon,
              children: null
            }
            temp?.children?.push(subTemp)
          })
  
          menuListTemp.push(temp)
        })
        setMenuList(menuListTemp);
      }
    })
  }, [i18n.language])
  return (
    <>
      <Menu
        theme={"dark"}
        style={{
          maxWidth: 240,
        }}
        key={defaultSelectedKeys.join("")}
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        onClick={({keyPath}) => {
          setDefaultOpenKeys([keyPath[1]])
          setDefaultSelectedKeys([keyPath[0]])
          let path = keyPath.reverse().join("/")
          navigate(path);
        }}
        items={menuList}
        mode="inline"
        inlineCollapsed={menuCollapsed}
      />
    </>
  )
}
export default SideBar;