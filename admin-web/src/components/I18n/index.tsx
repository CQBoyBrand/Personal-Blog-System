import { FC, useEffect, useState } from "react";
import { Popover } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface I18nProps {
    style?: React.CSSProperties;
}
const I18n:FC<I18nProps> = (pops: I18nProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { i18n } = useTranslation();
    const { style } = pops;
    const changeLanguageHandle = (item: any) => {
      i18n.changeLanguage(item.value);
      setPopoverOpen(false);
    }
    const PopoverContent = () => {
      const languageList = [
        { label: 'English', value: 'en' },
        { label: '中文', value: 'zh' }
      ];
      return (
        <div>
          {
            languageList.map((item, index) => (
              <div className="language_item" onClick={() => changeLanguageHandle(item)} key={index}>{item.label}</div>
            ))
          }
        </div>
      )
    }
    const handleOpenChange = (newOpen: boolean) => {
      setPopoverOpen(newOpen);
    };
  return (
    <Popover
        trigger="click"
        open={popoverOpen}
        content={PopoverContent()}
        onOpenChange={handleOpenChange}
    >
        <GlobalOutlined style={{...style}} className="header_operation_icon"/>
    </Popover>
  );
};
export default I18n;