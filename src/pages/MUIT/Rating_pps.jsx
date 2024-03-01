import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Rating_pps() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/rating/pps');
        setUserData(resp.data.pps);
        console.log(resp)
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
  }, []);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__table-un">
          <h2 className="Edu__text-L">Рейтинг ППС</h2>
          <label htmlFor="" className="search__label">
            <input type="text" className="search__input-rating"/>
            <div className="search__btn-rating"><div className="search__btn-in"></div>
          </div>
        </label>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Институты</th>
              <th>I.Личные достижения</th>
              <th>II. Научно-исследовательская и инновационная деятельность</th>
              <th>III. Учебная и методическая работа</th>
              <th>IV. Участие в мероприятиях, повышающих имидж МУИТ</th>
              <th>V. Электронная загрузка материалов в MOODLE</th>
              <th>Итого (Анкеты)</th>
            </tr>
          </thead>
          <tbody>
          {userData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td><Link to={`http://localhost:5173/office/?id=${data.id}`}>{data.name}</Link></td>
              <td>{data.institut}</td>
              <td>{data.total}</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>{data.total}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <BackButton/>
      </div>
    </div>
  )
}

export default Rating_pps