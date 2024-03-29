import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import AccountConf from '../../components/AccountConf';
import NavBar from '../../components/NavBar';
import RegNav from '../../components/RegNav';
import { useNavigate } from 'react-router-dom';

function Research() {
  const [isOpen, setIsOpen] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectNames, setSelectNames] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const toggleDropdown = (index) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = !updatedIsOpen[index];
    setIsOpen(updatedIsOpen);
  };

  const handleOptionClick = (index, option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = option;
    setSelectedOptions(updatedSelectedOptions);
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = false;
    setIsOpen(updatedIsOpen);
  };

  const addInput = (optionIndex, subtitleIndex) => {
    setInputValues(prevState => ({
      ...prevState,
      [optionIndex]: {
        ...prevState[optionIndex],
        [subtitleIndex]: [...(prevState[optionIndex]?.[subtitleIndex] || []), '']
      }
    }));
  };

  const sendDataToAPI = async () => {
    try {
      const uralsData = {};
      options.forEach((optionGroup, optionIndex) => {
        optionGroup.subtitles.forEach((subtitle, subtitleIndex) => {
          const subData = inputValues[optionIndex]?.[subtitleIndex] || [];
          const subId = subtitle.id;
          subData.forEach((link, linkIndex) => {
            uralsData[`${optionIndex}_${subtitleIndex}_${linkIndex}`] = {
              subId: subId,
              link: link
            };
          });
        });
      });

      const response = await axios.post(
        "http://localhost:8092/api/user/research/add",
        { ural: uralsData },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/user/research");
      const data = response.data[0];
      const newOptions = data.map(item => ({
        ...item,
        subtitles: item.researchActivitiesSubtitles.map(subtitle => ({
          id: subtitle.id,
          name: subtitle.name
        }))
      }));
      const newSelectNames = data.map(item => item.name);
      setOptions(newOptions);
      setSelectNames(newSelectNames);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
        <div className="private-office-bg">
          <RegNav />
        </div>
      </div>
      <div className="private-office__main">
        <AccountConf />
        <div className="auth__contain-doble">
          <div className="auth-auth-c">
            {options.map((optionGroup, optionIndex) => (
              <div className="custom-select-container" key={optionIndex}>
                <div className="selected-option" onClick={() => toggleDropdown(optionIndex)}>
                  {selectNames[optionIndex]}
                </div>
                {isOpen[optionIndex] && (
                  <div className="options">
                    {optionGroup.subtitles.map((subtitle, subtitleIndex) => (
                      <div key={subtitleIndex} className="option">
                        <div onClick={() => handleOptionClick(optionIndex, subtitle)}>{subtitle.name}</div>
                        <div className="option__link">
                        {inputValues[optionIndex]?.[subtitleIndex]?.map((value, inputIndex) => (
                          <input
                            key={inputIndex}
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const newInputValues = { ...inputValues };
                              newInputValues[optionIndex][subtitleIndex][inputIndex] = e.target.value;
                              setInputValues(newInputValues);
                            }}
                          />
                        ))}
                        </div>
                        <button onClick={() => addInput(optionIndex, subtitleIndex)} className='add__link'>Добавить</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button type="submit" onClick={sendDataToAPI} className="bnt__reg btn__green btn__link">
            Отправить
          </button>
          <button onClick={Back} className="btn__link btn__blue montherat">
            Назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default Research;