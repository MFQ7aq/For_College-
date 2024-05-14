import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";

const Redact = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [editedLinks, setEditedLinks] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/account/${id}`);
        const data = resp.data;
        setUserData(data);
        const initialEditedLinks = {};
        data.userAwards.forEach(award => {
          initialEditedLinks[award.id] = award.link || "";
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
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        bag[i + 1] = {
          id: item.id,
          link: editedLinks[item.id] || item.link,
          stage: item.stage
        };
      }
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
              userData.userAwards.map((award, i) => (
                <div className="userInfo-in userInfo__text-S" key={award.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${award.status === 'freeze' ? 'crossed-out' : ''}`}>{award.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[award.id] || award.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [award.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userResearch bline">
            <h2 className="userInfo__title">Научно-исследовательская деятельность:</h2>
            {userData.userResearch &&
              userData.userResearch.map((research, i) => (
                <div className="userInfo-in userInfo__text-S" key={research.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${research.status === 'freeze' ? 'crossed-out' : ''}`}>{research.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[research.id] || research.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [research.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userInnovative bline">
            <h2 className="userInfo__title">Инновационно-образовательная деятельность:</h2>
            {userData.userInnovative &&
              userData.userInnovative.map((innovative, i) => (
                <div className="userInfo-in userInfo__text-S" key={innovative.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${innovative.status === 'freeze' ? 'crossed-out' : ''}`}>{innovative.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[innovative.id] || innovative.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [innovative.id]: e.target.value })}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="userSocial bline">
            <h2 className="userInfo__title">Воспитательная, общественная деятельность:</h2>
            {userData.userSocial &&
              userData.userSocial.map((social, i) => (
                <div className="userInfo-in userInfo__text-S" key={social.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${social.status === 'freeze' ? 'crossed-out' : ''}`}>{social.name}</p>
                  <div className="admin__link">
                    <input
                      type="text"
                      value={editedLinks[social.id] || social.link}
                      onChange={(e) => setEditedLinks({ ...editedLinks, [social.id]: e.target.value })}
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