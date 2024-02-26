import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar"
import { useNavigate } from "react-router-dom"

function Registration() {
  const navigate = useNavigate()
  const [institutes, setInstitutes] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValueInst, setSelectedValueInst] = useState('');
  const [selectedValuePost, setSelectedValuePost] = useState('');
  const [customInputValue, setCustomInputValue] = useState('');

  const handleSelectInst = (value) => {
    setSelectedValueInst(value);
    console.log(value)
  };
  
  const handleSelectPost = (value) => {
    setSelectedValuePost(value);
    console.log(value)
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8092/user/fill');
      setInstitutes(response.data.institutes);
    } catch (error) {
      console.log(error);
    }
	};

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const Post = selectedValuePost === "Другое" ? customInputValue : selectedValuePost;
    const Inst = selectedValueInst;
    axios.post('http://localhost:8092/pps/sign-up', {
      "username": name,
      "password": password,
      "Post": Post,
      "inst": Inst
    })
    .then(function (response) {
      if (response.status >= 200 && response.status <= 204) {
        navigate(-1)
        console.log(response)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [name, password, selectedValueInst, selectedValuePost, customInputValue, navigate]);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Регистрация</h2></div>
        <div className="auth__contain-doble">
          <label htmlFor="" className="auth__label">
            <form onSubmit={handleSubmit} className="auth_auth">
              <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="ФИО (Полностью)" />
              <select value={selectedValueInst} onChange={(e) => handleSelectInst(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Институт</option>
                {institutes.map((inst) =>
                  <option key={inst.id} value={inst.name}>
                    {inst.name}
                  </option>)}
              </select>
              <select value={selectedValuePost} onChange={(e) => handleSelectPost(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Должность</option>
                <option value="Директор Института / Директор структурного подразделения МУИТ">Директор Института / Директор структурного подразделения МУИТ</option>
                <option value="Заместитель директора">Заместитель директора</option>
                <option value="Профессор">Профессор</option>
                <option value="Доцент / и.о. доцента">Доцент / и.о. доцента</option>
                <option value="Старший преподаватель">Старший преподаватель</option>
                <option value="Преподаватель">Преподаватель</option>
                <option value="Другое">Другое</option>
              </select>
              {selectedValuePost === "Другое" && (<input type="text" className="auth__input Montherat" value={customInputValue} onChange={(e) => setCustomInputValue(e.target.value)} placeholder="Введите другую должность"/>
              )}
              <select value={selectedValuePost} onChange={(e) => handleSelectPost(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">штат/совм.</option>
                <option value="Штат">Штат</option>
                <option value="Совместитель">Совместитель</option>
              </select>
              <select value={selectedValuePost} onChange={(e) => handleSelectPost(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученая степень</option>
                <option value="Доктор наук">Доктор наук</option>
                <option value="Кандидат наук">Кандидат наук</option>
                <option value="PhD">PhD</option>
                <option value="Докторант / Аспирант">Докторант / Аспирант</option>
              </select>
              <select value={selectedValuePost} onChange={(e) => handleSelectPost(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученое звание</option>
                <option value="Академик">Академик</option>
                <option value="Профессор">Профессор</option>
                <option value="Профессор МУИТ">Профессор МУИТ</option>
                <option value="Доцент">Доцент</option>
                <option value="И.о. доцента">И.о. доцента</option>
              </select>
              <select value={selectedValuePost} onChange={(e) => handleSelectPost(e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Гос.награды</option>
                <option>Лауреат Госпремии Кыргызской Республики в области науки и техники</option>
                <option>Заслуженный деятель (по отраслям)</option>
                <option>Отличник образования Кыргызской Республики</option>
                <option>Отличник науки Кыргызской Республики</option>
              </select>
              <input type="email" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Email" />
            </form>
          </label>
          <div className="auth__btn-center">
            <button className="bnt__reg Edu__text-S" onClick={handleSubmit}>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration