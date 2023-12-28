import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"

function Rating_pps() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__table-un">
          <h2 className="Edu__text-L">Рейтинг ППС</h2>
          <label htmlFor="" className="search__label">
            <input type="text" className="search__input-rating"/>
            <div className="search__btn-rating"><div className="search__btn-in"></div>
          </div>
        </label>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>ФИО</th>
              <th>Институты</th>
              <th>I.Личные достижения</th>
              <th>II. Научно-исследовательская и инновационная деятельность</th>
              <th>III. Учебная и методическая работа</th>
              <th>IV. Участие в мероприятиях, повышаюших имидж МУИТ</th>
              <th>V. Электронная загрузка материалов в MOODLE</th>
              <th>Итого (Анкеты)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Жамалова Венера Жумашбековна</td>
              <td>Институт цифровой трансформации и программирования</td>
              <td>330</td>
              <td>875</td>
              <td>130</td>
              <td>30</td>
              <td>104</td>
              <td>1469</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Жамалова Венера Жумашбековна</td>
              <td>Институт цифровой трансформации и программирования</td>
              <td>330</td>
              <td>875</td>
              <td>130</td>
              <td>30</td>
              <td>104</td>
              <td>1469</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Жамалова Венера Жумашбековна</td>
              <td>Институт цифровой трансформации и программирования</td>
              <td>330</td>
              <td>875</td>
              <td>130</td>
              <td>30</td>
              <td>104</td>
              <td>1469</td>
            </tr>
          </tbody>
        </table>
        <BackButton/>
      </div>
    </div>
  )
}

export default Rating_pps