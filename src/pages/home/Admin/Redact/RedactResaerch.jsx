import { Link } from "react-router-dom";
import NavBar from "../../../../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

function RedactResaerch() {
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/admin/stage/edit/social/title`);
        const data = resp.data.titles;
        setTitles(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const resp = await axios.post(`http://localhost:8092/api/admin/stage/edit/social/title`, {
        name: newTitle
      });
      const updatedTitles = [...titles, resp.data.title];
      setTitles(updatedTitles);
      setNewTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="сontents">
      <div className="private-office-contents">
        <div className="header">
          <NavBar />
        </div>
        <>
          <div className="header__menu-m">
            <Link to="/redact_progres" className="head__item_1 Montherat">Личные достижения</Link>
            <Link to="/redact_resaerch" className="head__item Montherat">Научно-исследовательская деятельность</Link>
            <Link to="/redact_education" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
            <Link to="/redact_social" className="head__item Montherat">Воспитательная, общественная деятельность</Link>
          </div>
        </>
        <h2 className='Edu__text-M stage_name'>Воспитательная, общественная деятельность</h2>
        <div className="admin__links" >
          {titles.map((title) => (
            <Link key={title.id} to='/' className="admin__link">{title.name}</Link>
          ))}
        </div>
        <div>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button onClick={handleSave}>Добавить награду</button>
        </div>
      </div>
    </div>
  );
}

export default RedactResaerch;