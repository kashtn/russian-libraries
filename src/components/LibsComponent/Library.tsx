import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Libs.scss";
import { StateType } from "../../redux/reducer";
import { AppState } from "../../redux/store";

export default function Library() {
  const { allLibs } = useSelector<AppState, StateType>((state) => state);
  const { order } = useParams<{ order: string }>();

  let current = allLibs.find((lib) => lib.order === Number(order));

  return (
    <>
      <div className="oneLibContainer">
        <Button className="linkBtn" type="primary">
          <Link to="/">Назад</Link>
        </Button>
        {current && (
          <Card title={current.fullname}>
            <Card type="inner" title="Адрес">
              {current.address}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Количество библиотек"
            >
              {current.libraries}
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Количество зарегестрированных посетителей"
            >
              {current.subscribers}
            </Card>
          </Card>
        )}
      </div>
    </>
  );
}
