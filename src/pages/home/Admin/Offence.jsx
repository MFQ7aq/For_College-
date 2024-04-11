import { useCallback, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import axios from "axios";

function Offence() {
  const [users, setUsers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [openStates, setOpenStates] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/admin/offence");
      setUsers(response.data.offence);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleOptions = (userId) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [userId]: !prevStates[userId]
    }));
  };

  const handleOptionClick = (userId, optionId, optionName) => {
    setSelectedOptions((prevOptions) => {
      const userOptions = { ...prevOptions[userId] }; 
      userOptions[optionId] = userOptions[optionId] || "";
      return {
        ...prevOptions,
        [userId]: { ...userOptions, id: optionId, name: optionName }
      };
    });
  };

  const handleInputChange = (userId, optionId, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [userId]: { ...prevOptions[userId], [optionId]: value }
    }));
  };

  const sendData = async () => {
    try {
      const formattedData = { offence: {} };
      for (const userId in selectedOptions) {
        const userOptions = selectedOptions[userId];
        for (const optionId in userOptions) {
          const quantity = userOptions[optionId];
          formattedData.offence[`${+userId}_${optionId}`] = { userId: +userId, id: optionId, quantity }; 
        }
      }
      const response = await axios.post("http://localhost:8092/api/admin/offence/add", formattedData);
      setSelectedOptions({});
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="admin-panel__main">
        <button className="btn__link btn__green-a montherat admin__btn" onClick={sendData}>
          Изменить
        </button>
        <div className="users">
          {users.map((user) => (
            <div key={user.userId} className="user">
              <h2 className="Edu__text-M">{user.userName}</h2>
              <div className="select">
                <div className="custom-select">
                  <span
                    className={`selected ${openStates[user.userId] ? 'open' : ''}`}
                    onClick={() => toggleOptions(user.userId)}
                  >
                    {"Срывы, замена, опоздания"}
                  </span>
                  {openStates[user.userId] && (
                    <div className="options-container">
                      <div className="options">
                        {user.offences.map((option) => (
                          <div
                            key={option.id}
                            className="option"
                          >
                            <div onClick={() => handleOptionClick(user.userId, option.id, option.name)}>
                              {option.name}
                            </div>
                            <input
                              type="Number"
                              value={selectedOptions[user.userId]?.[option.id] || ""}
                              onChange={(e) => handleInputChange(user.userId, option.id, e.target.value)}
                              placeholder="Число"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offence;