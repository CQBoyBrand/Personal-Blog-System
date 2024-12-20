import { FC, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb } from 'antd';
import { useTranslation } from "react-i18next";

interface BreadItem {
  title: string;
  href?: string;
}
const Content: FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [ breadcrumbName, setBreadcrumbName ] = useState<BreadItem[]>([]);
  
  useEffect(() => {
    const pathname = location.pathname.split('/').filter((item: string) => item);
    let breadcrumbNameTemp: BreadItem[] = [];
    pathname.map((item: string) => {
      let temp: BreadItem = {
        title: t(`menu.${item}`)
      }
      breadcrumbNameTemp.push(temp)
    })
    setBreadcrumbName(breadcrumbNameTemp);
  }, [location])
  return (
    <div className="content_container">
      <Breadcrumb
        separator=">"
        items={breadcrumbName}
      />
      <Outlet />
    </div>
  )
}
export default Content;