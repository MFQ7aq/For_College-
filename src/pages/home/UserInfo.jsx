import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";

function UserInfo() {
  const { id } = useParams()
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/account/${id}`)
        const data = resp.data
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
  }, [id]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>

    </div>
  );
}

export default UserInfo;