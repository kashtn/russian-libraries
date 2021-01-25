import React, { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useAppDispatch} from '../../redux/store'
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
  const dispatch = useAppDispatch();
  const { allLibs, loading } = useSelector<AppState, StateType>(
    (state) => state
  );
  // const { loading } = useSelector((state) => state);

  const [region, setRegion] = useState<string>();

  const libs: Ilib[] = region
    ? allLibs.filter((lib) => {
        if (typeof lib.territory === "string") {        //!!!!!!!!!!check this out
          let terrWords:string[] = lib.territory.split(" ");
          let flag:boolean = false;
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

    // const useLocalStorage = (key: string) => {
    //   // initialize the value from localStorage
    //   const [currentValue, setCurrentValue] = useState<string | null>(() =>
    //     localStorage.getItem(key)
    //   );
    
    //   // update localStorage when the currentValue changes via setCurrentValue
    //   useEffect(() => {
    //     localStorage.setItem(key, currentValue);
    //   }, [key, currentValue]);
    
    //   // use as const to tell TypeScript this is a tuple
    //   return [currentValue, setCurrentValue] as const;
    // };

  const PreloadedState:string | null = localStorage.getItem("redux");
  const dispatch1 = useDispatch()

  useEffect(() => {
    if (PreloadedState && JSON.parse(PreloadedState).allLibs.length < 83 || !PreloadedState) {
      dispatch1(getAllLibs());
      // dispatch(getAllLibs());
    } 
    // else if (!PreloadedState) {
    //   dispatch(getAllLibs());
    // }
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

  // function sort() {
  //   libs.sort((a, b) => {
  //     console.log(a, b);
  //     return a.libraries - b.libraries;
  //   });
  // }

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
            <Button className="text" type="link" 
            // onClick={sort}
            >
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
