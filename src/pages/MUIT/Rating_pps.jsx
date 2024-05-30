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
        setUserData(Object.values(resp.data.pps));
        console.log(resp.data.pps);
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
              <th>II. Научно-исследовательская деятельность</th>
              <th>III. Инновационно-образовательная деятельность</th>
              <th>IV. Воспитательная, общественная деятельность</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
          {userData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td><Link to={`http://localhost:5173/user/${data.id}`}>{data.name}</Link></td>
              <td>{data.institute}</td>
              <td>{data.awardPoints}</td>
              <td>{data.researchPoints}</td>
              <td>{data.innovativePoints}</td>
              <td>{data.socialPoints}</td>
              <td>{data.sum}</td>
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