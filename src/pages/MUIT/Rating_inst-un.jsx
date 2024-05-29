import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Rating_inst_un() {
  const token = localStorage.getItem('token')
  const [inst, setInst] = useState([])

  useEffect(() => {
    const getInst = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/info', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { institutes } = response.data;
        setInst(institutes);
      } catch (error) {
        console.log(error);
      }
    };

    getInst();
  }, [token])

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
              <th className="un_l">Баллы институтов</th>
              <th className="un_l">Итого</th>
            </tr>
          </thead>
          <tbody>
            {inst.map((inst, i) => (
              <tr key={i}>
                <td>{inst}</td>
                <td></td>
                <td></td>
                <td></td>
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