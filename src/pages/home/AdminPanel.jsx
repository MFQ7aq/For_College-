import { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const resp = await axios.get("http://localhost:8092/api/admin/offence");
      const data = resp.data.offence;
      setUsers(data)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="admin-panel__main">
        <div className="users">
          <h2 className="Edu__text-M">{users.userId} {users.userName}</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;