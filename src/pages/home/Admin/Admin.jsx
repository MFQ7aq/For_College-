import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";

function Admin() {

  return (
    <div className="сontents">
      <div className="private-office-contents">
        <div className="header">
          <NavBar />
        </div>
        <div className="admin__links">
          <Link to='/admin_list' className="admin__link">Список препподователей</Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;