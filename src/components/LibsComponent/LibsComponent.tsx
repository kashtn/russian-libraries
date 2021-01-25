import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllLibs, filterLibs } from "../../redux/actions";
import { List, Spin, Input, Button, Popover } from "antd";
import { StateType } from "../../redux/reducer";
import { AppState } from "../../redux/store";
import "antd/dist/antd.css";
import "./Libs.scss";
import { Ilib } from "../../interfaces";

const { Search } = Input;

type LibsComponentType = {
  children?: never;
};

const LibsComponent: FC<LibsComponentType> = (props): ReactElement => {
  const dispatch = useDispatch();
  const { allLibs, loading } = useSelector<AppState, StateType>((state) => state);

  const [region, setRegion] = useState<string>();

  const libs: Ilib[] = region
    ? allLibs.filter((lib) => {
        if (typeof lib.territory === "string") {
          let terrWords: string[] = lib.territory.split(" ");
          let flag: boolean = false;
          terrWords.map((word) => {
            if (word.toLowerCase().startsWith(region.toLowerCase())) {
              flag = true;
            }
          });
          if (flag) {
            return lib;
          }
        }
      })
    : allLibs;

  const PreloadedState: string | null = localStorage.getItem("redux");

  useEffect(() => {
    if (
      (PreloadedState && JSON.parse(PreloadedState).allLibs.length < 83) ||
      !PreloadedState
    ) {
      dispatch(getAllLibs());
    }
  }, [dispatch]);

  const content = (
    <>
      <div>
        <Button
          type="link"
          className="text"
          onClick={() => {
            dispatch(filterLibs(allLibs, "toHighest"));
          }}
        >
          По возрастанию
        </Button>
      </div>
      <div>
        <Button
          type="link"
          className="text"
          onClick={() => {
            dispatch(filterLibs(allLibs, "toLowest"));
          }}
        >
          По убыванию
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="container">
        <div className="topDataContainer">
          <h1 className="title">Библиотеки РФ</h1>
          <Search
            placeholder="Поиск по региону"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setRegion(event.currentTarget.value);
            }}
            style={{ width: 200 }}
          />
          <br />
          <Popover content={content} title={null} trigger="click">
            <Button className="text" type="link">
              Сортировать
            </Button>
          </Popover>
        </div>
        {!loading ? (
          <>
            <div className="allLibsContainer">
              <List
                dataSource={libs}
                renderItem={(item) => (
                  <List.Item key={item.id} className="linkField">
                    <List.Item.Meta
                      title={
                        <Link className="link" to={`/library/${item.order}`}>
                          <p className="text">{item.fullname}</p>
                        </Link>
                      }
                      description={`Всего библиотек в регионе: ${item.libraries}`}
                    />
                  </List.Item>
                )}
              ></List>
            </div>
          </>
        ) : (
          <div className="spin">
            <Spin />
          </div>
        )}
      </div>
    </>
  );
};

export default LibsComponent;
