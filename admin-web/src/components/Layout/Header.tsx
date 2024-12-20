import { FC, useEffect, useState } from "react"
import { Input } from "antd";
import {
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BellFilled,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import I18n from "@/components/I18n";
import { use } from "i18next";
import { userInfo } from "@/api/modules/user";
interface HeaderProps {
  menuCollapsed: boolean;
  menuToggle: (params: boolean) => void;
}
const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { menuCollapsed, menuToggle }= props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    userInfo({
      username: sessionStorage.getItem('username')
  }).then(res => {
      if (res.code === 200) {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          setNickname(res.data.nickname)
      }
  })
  }, []);
 
  return (
    <div className="header_container">
      <div onClick={() => menuToggle(!menuCollapsed)}>
        {menuCollapsed ? <MenuUnfoldOutlined className="collapasedBtn" /> : <MenuFoldOutlined className="collapasedBtn"/>}
      </div>
      <h1>Blog Admin</h1>
      <div className="header_search_container">
        <Input
          className="header_search_input"
          placeholder="search here"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </div>
      <div className="header_operation_container">
        {
          isFullScreen ? <FullscreenExitOutlined className="header_operation_icon" onClick={() => {
            setIsFullScreen(false);
            document.exitFullscreen()
          }} /> :
          <FullscreenOutlined className="header_operation_icon" onClick={() => {
            setIsFullScreen(true);
            document.body.requestFullscreen()
          }} />
        }
        <I18n style={{color: "#7c7efa"}}/>
        <BellFilled style={{color: "#f59a23"}} className="header_operation_icon" />
      </div>
    </div>
  )
}
export default Header;