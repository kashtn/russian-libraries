import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function LibsComponent() {
  const [allLibs, setAllLibs] = useState([]);
  const history = useHistory();

  async function getAllLibs() {
    const url = "https://cors-anywhere.herokuapp.com/";
    const response = await fetch(
      url +
        "https://data.gov.ru/opendata/7705851331-statlibrary/data-20161110T1744.json"
    );
    const result = await response.json();
    console.log(result);
    setAllLibs(result);
  }
  useEffect(() => {
    getAllLibs();
  }, []);

  function showLib(order) {
    history.push(`/library/${order}`);
  }

  return (
    <>
      <h1>Libraries</h1>
      <ul>
        <h2>Регионы</h2>
        {allLibs.map((lib) => (
          <>
            <li key={lib.order}>
              <button
                key={lib.order}
                href
                onClick={() => {
                  showLib(lib.order);
                }}
              >
                {lib.territory}
              </button>
              <p> {lib.libraries} Библиотек в регионе</p>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
