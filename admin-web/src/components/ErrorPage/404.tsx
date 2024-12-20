import { FC } from "react";
import { Button } from "antd";
import "./errorPage.scss";
import { useNavigate } from "react-router-dom";

const Notfound: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound_container">
      <div></div>
      <div className="notFound_content_container">
        <h1>
          Sorry, Page NotFound
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
export default Notfound;