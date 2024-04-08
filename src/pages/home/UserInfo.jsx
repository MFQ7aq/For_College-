import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";

function UserInfo() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/account/${id}`);
        const data = resp.data;
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="userData">
        <h2 className="Edu__text-M">User Info</h2>
        <p className="Edu__text-S">Name: {userData.userInfo && userData.userInfo.name}</p>
        <p className="Edu__text-S">Institut: {userData.userInfo && userData.userInfo.institut}</p>
        <p className="Edu__text-S">Position: {userData.userInfo && userData.userInfo.position}</p>
        <p className="Edu__text-S">Regular: {userData.userInfo && userData.userInfo.regular}</p>
        <p className="Edu__text-S">Email: {userData.userInfo && userData.userInfo.email}</p>
        <h2 className="Edu__text-M">User Awards</h2>
        {userData.userAwards &&
          userData.userAwards.map((award) => (
            <p className="Edu__text-S" key={award.id}>{award.name}</p>
          ))}
        <h2 className="Edu__text-M">User Research</h2>
        {userData.userResearch &&
          userData.userResearch.map((research) => (
            <p className="Edu__text-S" key={research.id}>{research.name}</p>
          ))}
        <h2 className="Edu__text-M">User Innovative</h2>
        {userData.userInnovative &&
          userData.userInnovative.map((innovative) => (
            <p className="Edu__text-S" key={innovative.id}>{innovative.name}</p>
          ))}
        <h2 className="Edu__text-M">User Social</h2>
        {userData.userSocial &&
          userData.userSocial.map((social) => (
            <p className="Edu__text-S" key={social.id}>{social.name}</p>
          ))}
      </div>
    </div>
  );
}

export default UserInfo;