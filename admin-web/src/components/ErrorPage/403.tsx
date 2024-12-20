import { FC } from "react";
import { Button } from "antd";
import "./errorPage.scss";
import { useNavigate } from "react-router-dom";

const NoAuth: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="noAuth_container">
      <div></div>
      <div className="noAuth_content_container">
        <h1>
          Sorry, you are not authorized to access this page.
        </h1>
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
            Back Home
        </Button>
      </div>
    </div>
  );
};

export default NoAuth;