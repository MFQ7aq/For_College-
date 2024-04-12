import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/NavBar";

function UserInfoA() {
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
    <div className="сontents">
      <div className="private-office-contents">
        <div className="header">
          <NavBar />
        </div>
        <div className="userData">
          <div className="userInfo">
            <div className="userInfo-right">
              <p className="userInfo__name">ФИО: {userData.userInfo && userData.userInfo.name}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.institut}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.regular}</p>
            </div>
            <div className="userInfo-left">
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.position}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.email}</p>
            </div>
          </div>
          <div className="userAwards bline">
            <h2 className="userInfo__title">Личные достижения:</h2>
            {userData.userAwards &&
              userData.userAwards.map((award, i) => (
                <div className="userInfo-in userInfo__text-S" key={award.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className="userInfo-in-text">{award.name}</p>
                  {award.link != "Нет ссылки" ?
                    (
                      <div className="admin__link">
                        <Link to={award.link}>Link</Link>
                        <button className="trash_can"></button>
                      </div>
                    ) : (
                      <></>
                    )}
                </div>
              ))}
          </div>
          <div className="userResearch bline">
            <h2 className="userInfo__title">Государственные награды:</h2>
            {userData.userResearch &&
              userData.userResearch.map((research, i) => (
                <div className="userInfo-in userInfo__text-S" key={research.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className="userInfo-in-text">{research.name}</p>
                  <div className="admin__link">
                    <Link to={research.link}>Link</Link>
                    <button className="trash_can"></button>
                  </div>
                </div>
              ))}
          </div>
          <div className="userInnovative bline">
            <h2 className="userInfo__title">Научно-исследовательсская деятельность:</h2>
            {userData.userInnovative &&
              userData.userInnovative.map((innovative, i) => (
                <div className="userInfo-in userInfo__text-S" key={innovative.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className="userInfo-in-text">{innovative.name}</p>
                  <div className="admin__link">
                    <Link to={innovative.link}>Link</Link>
                    <button className="trash_can"></button>
                  </div>
                </div>
              ))}
          </div>
          <div className="userSocial bline">
            <h2 className="userInfo__title">Инновационно-образовательная деятальность:</h2>
            {userData.userSocial &&
              userData.userSocial.map((social, i) => (
                <div className="userInfo-in userInfo__text-S" key={social.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className="userInfo-in-text">{social.name}</p>
                  <div className="admin__link">
                    <Link to={social.link}>Link</Link>
                    <button className="trash_can"></button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoA;