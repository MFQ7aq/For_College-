import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"
import axios from "axios";
import { useState, useEffect } from "react";

function Rating_inst_un() {
  const [inst, setInst] = useState([]);
  const [sortedField, setSortedField] = useState('sum');
  const [filteredInst, setFilteredInst] = useState([]);

  useEffect(() => {
    const getInst = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/rating/institutes');
        const data = response.data.institutions;
        setInst(data);
        setFilteredInst(data); // Set filtered data initially as all data
      } catch (error) {
        console.log(error);
      }
    };

    getInst();
  }, []);

  useEffect(() => {
    // Call sortData function when sortedField changes
    sortData(sortedField);
  }, [sortedField]);

  const sortData = (field) => {
    const sortedData = [...filteredInst].sort((a, b) => b[field] - a[field]);
    setFilteredInst(sortedData);
    setSortedField(field);
  };

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
              <th className="sorter un_l" onClick={() => sortData('middlePoints')}>Средний балл ППС</th>
              <th className="sorter un_l" onClick={() => sortData('sum')}>Итого</th>
            </tr>
          </thead>
          <tbody>
            {filteredInst.map((institution, i) => (
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

export default Rating_inst_un;