import { FC } from "react";
import { Spin } from "antd";

const LoadingPage:FC = () => {
  return (
    <Spin size="large" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}/>
  )
}
export default LoadingPage;