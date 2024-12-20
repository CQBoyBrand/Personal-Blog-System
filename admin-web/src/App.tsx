import { FC, useEffect, useState } from "react"
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import "@/styles/App.scss"
import BaseRouter from "@/router"
import { useTranslation } from "react-i18next";


const App: FC = () => {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(enUS)
  useEffect(() => {
    let currentLang = i18n.language;
    switch (currentLang) {
      case "zh":
        setCurrentLang(zhCN)
        break;
      case "en":
        setCurrentLang(enUS)
        break;
      default:
        setCurrentLang(enUS)
    }
  }, [i18n.language])
  return (
    <ConfigProvider
      locale={currentLang}>
      <BaseRouter />
    </ConfigProvider>
  )
}

export default App
