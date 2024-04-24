import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/NavBar";

function UserInfoA() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedStage, setSelectedStage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/account/${id}`);
        const data = resp.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  const toggleItemSelection = (itemId, stage) => {
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(item => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
    setSelectedStage(stage);
  };

  const handleFreezeSelected = async () => {
    try {
      const idBag = selectedItems.map(itemId => ({ id: itemId }));
      const requestData = { "idBag": idBag };
      await axios.put(`http://localhost:8092/api/admin/${selectedStage}/freeze`, requestData);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveSelected = async () => {
    try {
      const idBag = selectedItems.map(itemId => ({ id: itemId }));
      const requestData = { "idBag": idBag };
      await axios.put(`http://localhost:8092/api/admin/${selectedStage}/active`, requestData);
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
            <p className="userInfo__name">ФИО: {userData.userInfo && userData.userInfo.name}</p>
            <p className="userInfo__text">{userData.userInfo && userData.userInfo.institut}</p>
            <p className="userInfo__text">{userData.userInfo && userData.userInfo.regular}</p>
            <p className="userInfo__text">{userData.userInfo && userData.userInfo.position}</p>
            <p className="userInfo__text">{userData.userInfo && userData.userInfo.email}</p>
          </div>
          <div className="userAwards bline">
            <h2 className="userInfo__title">Личные достижения:</h2>
            {userData.userAwards &&
              userData.userAwards.map((award, i) => (
                <div className="userInfo-in userInfo__text-S" key={award.id} style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
                  <p className={`userInfo-in-text ${award.status === 'freeze' ? 'crossed-out' : ''}`}>{award.name}</p>
                  <div className="admin__link">
                    <Link to={award.link}>Link</Link>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(award.id)}
                      onChange={() => toggleItemSelection(award.id, award.stage)}
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
                    <Link to={research.link}>Link</Link>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(research.id)}
                      onChange={() => toggleItemSelection(research.id, research.stage)}
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
                    <Link to={innovative.link}>Link</Link>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(innovative.id)}
                      onChange={() => toggleItemSelection(innovative.id, innovative.stage)}
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
                    <Link to={social.link}>Link</Link>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(social.id)}
                      onChange={() => toggleItemSelection(social.id, social.stage)}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="auth__btn-center jc-sb">
            <button className="bnt__log" onClick={handleFreezeSelected}>Заморозить</button>
            <button className="bnt__log" onClick={handleActiveSelected}>Разморозить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoA;