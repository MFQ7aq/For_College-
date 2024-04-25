import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar";

function Admin() {


  return (
    <div className="сontents">
      <div className="private-office-contents">
        <div className="header">
          <NavBar />
        </div>
        <Link to='/admin_list'>Список препподователей</Link>
      </div>
    </div>
  );
}

export default Admin;