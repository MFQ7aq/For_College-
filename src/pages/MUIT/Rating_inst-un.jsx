import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Rating_inst_un() {
  const [inst, setInst] = useState([])

  useEffect(() => {
    const getInst = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/rating/institutes');
        const data = response.data.institutions;
        setInst(data);
      } catch (error) {
        console.log(error);
      }
    };

    getInst();
  }, [])

  return (
    <div className="сontents">
      <div className="header">
        <NavBar />
      </div>
      <div className="main">
        <div className="title__table-un">
          <h2 className="Edu__text-L">Рейтинг ППС</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="un_l">Институты МУИТ</th>
              <th className="un_l">Средний балл ППС</th>
              <th className="un_l">Итого</th>
            </tr>
          </thead>
          <tbody>
            {inst.map((institution, i) => (
              <tr key={i}>
                <td>{institution.name}</td>
                <td>{institution.middlePoints}</td>
                <td>{institution.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <BackButton />
      </div>
    </div>
  )
}

export default Rating_inst_un