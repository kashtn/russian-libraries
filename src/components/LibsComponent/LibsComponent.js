import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllLibs, filterLibs } from "../../redux/actions";
import { List, Spin, Input, Button, Popover } from "antd";
import "antd/dist/antd.css";
import "./Libs.scss";

const { Search } = Input;

export default function LibsComponent() {
  const dispatch = useDispatch();
  const { allLibs } = useSelector((state) => state);
  const { loading } = useSelector((state) => state);

  const [region, setRegion] = useState();

  const libs = region
    ? allLibs.filter((lib) => {
        let terrWords = lib.territory.split(" ");
        let flag = false;
        terrWords.map((word) => {
          if (word.toLowerCase().startsWith(region.toLowerCase())) {
            flag = true;
          }
        });
        if (flag) {
          return lib;
        }
      })
    : allLibs;

  const PreloadedState = JSON.parse(window.localStorage.getItem("redux"));

  useEffect(() => {
    if (PreloadedState && PreloadedState.allLibs.length < 83) {
      dispatch(getAllLibs());
    } else if (!PreloadedState) {
      dispatch(getAllLibs());
    }
  }, [dispatch]);

  const content = (
    <>
      <div>
        <Button
          type="link"
          className='text'
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
          className='text'
          onClick={() => {
            dispatch(filterLibs(allLibs, "toLowest"));
          }}
        >
          По убыванию
        </Button>
      </div>
    </>
  );

  function sort() {
    libs.sort((a, b) => {
      console.log(a, b);
      return a.libraries - b.libraries;
    });
  }

  return (
    <>
      <div className="container">
        <div className="demo-infinite-container">
          <h1 className="title">Библиотеки РФ</h1>
          {!loading ? (
            <>
              <Search
                placeholder="Поиск по региону"
                onChange={(event) => {
                  setRegion(event.target.value);
                }}
                style={{ width: 200 }}
              />
              <br />
              <Popover content={content} title={null} trigger="click">
                <Button className='text' type="link" onClick={sort}>
                  Сортировать
                </Button>
              </Popover>
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
            </>
          ) : (
            <div className="spin">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
