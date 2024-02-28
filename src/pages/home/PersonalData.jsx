import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import MultipleSelectCheckmarks from "../../components/CheckMark";

function UserInfo() {
  const navigate = useNavigate();
  let token = localStorage.getItem('token')

  const [institutes, setInstitutes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [degree, setDegree] = useState([]);
  const [rank, setRank] = useState([]);
  const [stateAwards, setStateAwards] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValues, setSelectedValues] = useState({
    inst: '',
    post: '',
    stat: '',
    degree: '',
    rank: '',
    awards: [],
    links: {}
  });
  const [customInputValue, setCustomInputValue] = useState('');

  const handleChangeLinks = useCallback(links => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      links: links
    }));
  }, []);

  const handleSelect = useCallback((field, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8092/user/fill');
      const { institutes, positions, degree, rank, state_awards } = response.data;
      setInstitutes(institutes);
      setPositions(positions);
      setDegree(degree);
      setRank(rank);
      setStateAwards(state_awards);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const post = selectedValues.post === "Другое" ? customInputValue : selectedValues.post;
    axios.post('http://localhost:8092/pps/sign-up', {
      "username": name,
      "password": password,
      "post": post,
      "inst": selectedValues.inst,
      "stat": selectedValues.stat,
      "degree": selectedValues.degree,
      "rank": selectedValues.rank,
      "awards": selectedValues.awards,
      "links": selectedValues.links,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        if (response.status >= 200 && response.status <= 204) {
          navigate(-1);
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [customInputValue, name, navigate, password, selectedValues, token]);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar />
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Персональные данные</h2></div>
        <div className="auth__contain-doble">
          <label htmlFor="" className="auth__label">
            <form onSubmit={handleSubmit} className="auth_auth">
              <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="ФИО (Полностью)" />
              <select value={selectedValues.inst} onChange={(e) => handleSelect('inst', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Институт</option>
                {institutes.map((inst) =>
                  <option key={inst.id} value={inst.name}>
                    {inst.name}
                  </option>)}
              </select>
              <select value={selectedValues.post} onChange={(e) => handleSelect('post', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Должность</option>
                {positions.map((post) =>
                  <option key={post.id} value={post.name}>
                    {post.name}
                  </option>)}
                <option value="Другое">Другое</option>
              </select>
              {selectedValues.post === "Другое" && (
                <input type="text" className="auth__input Montherat" value={customInputValue} onChange={(e) => setCustomInputValue(e.target.value)} placeholder="Введите другую должность" />
              )}
              <select value={selectedValues.stat} onChange={(e) => handleSelect('stat', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">штат/совм.</option>
                <option value="Штат">Штат</option>
                <option value="Совместитель">Совместитель</option>
              </select>
              <select value={selectedValues.degree} onChange={(e) => handleSelect('degree', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученая степень</option>
                {degree.map((degree) =>
                  <option key={degree.id} value={degree.name}>
                    {degree.name}
                  </option>)}
              </select>
              <select value={selectedValues.rank} onChange={(e) => handleSelect('rank', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученое звание</option>
                {rank.map((rank) =>
                  <option key={rank.id} value={rank.name}>
                    {rank.name}
                  </option>)}
              </select>
              <MultipleSelectCheckmarks
                data={stateAwards}
                value={selectedValues.awards}
                onChange={(value) => handleSelect('awards', value)}
                links={selectedValues.links} onChangeLinks={handleChangeLinks}
              />
              <input type="email" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Email" />
            </form>
          </label>
          <div className="auth__btn-center">
            <button className="bnt__reg Edu__text-S" onClick={handleSubmit}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;