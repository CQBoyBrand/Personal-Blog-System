import { getStatisticsInfo } from "@/api/modules/statistics";
import { FC, useEffect, useState } from "react";
import "./index.scss";

const Index: FC = () => {
  const [visitInfo, setVisitInfo] = useState<any>({})
  useEffect(() => {
    getStatisticsInfo().then(res => {
      if (res.code === 200) {
        setVisitInfo(res.data);
      }
    })
  }, [])
  return (
    <div className="dashboard_container">
      <div className="statics_container">
        <div className="statics_item">
          <div className="today_info">
            <div className="today_item">今日IP</div>
            <div className="today_num">{visitInfo.currentIp}</div>
          </div>
          <div className="total_info">
            <div className="totla_item">总计IP</div>
            <div>{visitInfo.ip}</div>
          </div>
        </div>
        <div className="statics_item">
          <div className="today_info">
            <div className="today_item">今日UV</div>
            <div className="today_num">{visitInfo.currentUv}</div>
          </div>
          <div className="total_info">
            <div className="totla_item">总计UV</div>
            <div>{visitInfo.uv}</div>
          </div>
        </div>
        <div className="statics_item">
          <div className="today_info">
            <div className="today_item">今日PV</div>
            <div className="today_num">{visitInfo.currentPv}</div>
          </div>
          <div className="total_info">
            <div className="totla_item">总计PV</div>
            <div>{visitInfo.pv}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;