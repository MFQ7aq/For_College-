import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"

function Rating_inst_un() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__table-un">
          <h2 className="Edu__text-L">Рейтинг ППС</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Институты МУИТ</th>
              <th>Средний балл ППС</th>
              <th>Баллы институтов</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Институт цифровойтрансформации и программирования</td>
              <td>672</td>
              <td>11670</td>
              <td>12342</td>
            </tr>
            <tr>
              <td>Институт дизайна, архитектуры и текстиля</td>
              <td>151</td>
              <td>8660</td>
              <td>8811</td>
            </tr>
            <tr>
              <td>Институт строительстваи инновационных технологий</td>
              <td>327</td>
              <td>9895</td>
              <td>10222</td>
            </tr>
            <tr>
              <td>Институт энергетики и транспорта</td>
              <td>373</td>
              <td>11540</td>
              <td>11913</td>
            </tr>
            <tr>
              <td>Институт экономики и менеджмента</td>
              <td>658</td>
              <td>13400</td>
              <td>14058</td>
            </tr>
            <tr>
              <td>Институт межкультурной коммуникации и психологии</td>
              <td>495</td>
              <td>8995</td>
              <td>9490</td>
            </tr>
            <tr>
              <td>Российско-Кыргызский институт автоматизации управления бизнеса</td>
              <td>685</td>
              <td>18560</td>
              <td>19245</td>
            </tr>
          </tbody>
        </table>
        <BackButton/>
      </div>
    </div>
  )
}

export default Rating_inst_un