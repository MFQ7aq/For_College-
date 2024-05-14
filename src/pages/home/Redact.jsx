import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";

const Redact = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [editedLinks, setEditedLinks] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/account/${id}`);
        const data = resp.data;
        setUserData(data);
        const initialEditedLinks = {};
        data.userAwards.forEach(item => {
          initialEditedLinks[item.id] = item.link || "";
        });
        setEditedLinks(initialEditedLinks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSaveLink = async () => {
    try {
      const bag = {};
      userData.userAwards.forEach(item => {
        bag[item.id] = {
          id: item.id,
          link: editedLinks[item.id] || item.link,
          stage: item.stage
        };
      });
      await axios.put(`http://localhost:8092/api/user/account/award/edit`, { bag }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      location.reload();
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
        <div className="userData">
          <div className="userInfo">
            <div className="userInfo__right">
              <p className="userInfo__name">ФИО: {userData.userInfo && userData.userInfo.name}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.institut}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.regular}</p>
            </div>
            <div className="userInfo__left">
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.position}</p>
              <p className="userInfo__text">{userData.userInfo && userData.userInfo.email}</p>
            </div>
          </div>
          <div className="userAwards bline">
            <h2 className="userInfo__title">Личные достижения:</h2>
            {userData.userAwards &&
              userData.userAwards.map((item, i) => (
                <div className="userInfo-in userInfo__text-S" key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${item.status === 'freeze' ? 'crossed-out' : ''}`}>{item.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[item.id] || item.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [item.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userResearch bline">
            <h2 className="userInfo__title">Научно-исследовательская деятельность:</h2>
            {userData.userResearch &&
              userData.userResearch.map((item, i) => (
                <div className="userInfo-in userInfo__text-S" key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${item.status === 'freeze' ? 'crossed-out' : ''}`}>{item.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[item.id] || item.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [item.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userInnovative bline">
            <h2 className="userInfo__title">Инновационно-образовательная деятельность:</h2>
            {userData.userInnovative &&
              userData.userInnovative.map((item, i) => (
                <div className="userInfo-in userInfo__text-S" key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${item.status === 'freeze' ? 'crossed-out' : ''}`}>{item.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[item.id] || item.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [item.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userSocial bline">
            <h2 className="userInfo__title">Воспитательная, общественная деятельность:</h2>
            {userData.userSocial &&
              userData.userSocial.map((item, i) => (
                <div className="userInfo-in userInfo__text-S" key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${item.status === 'freeze' ? 'crossed-out' : ''}`}>{item.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[item.id] || item.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [item.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="auth__btn-center jc-sb">
            <button className="bnt__log" onClick={handleSaveLink}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Redact;