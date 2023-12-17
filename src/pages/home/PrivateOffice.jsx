import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function PrivateOffice() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain-M"><h2 className="Edu__text-M">Анкета институтов</h2></div>
        <div className="table__links Edu__text-S">
          <ul>
            <li><Link className="Link" to="/">Институт цифровой трансформации и программирования</Link></li>
            <li><Link className="Link" to="/">Институт дизайна, архитектуры и текстиля</Link></li>
            <li><Link className="Link" to="/">Институт строительства и инновационных технологий</Link></li>
            <li><Link className="Link" to="/">Институт энергетики и транспорта</Link></li>
            <li><Link className="Link" to="/">Институт экономики и менеджмента</Link></li>
            <li><Link className="Link" to="/">Институт межкультурной коммуникации и психологии</Link></li>
            <li><Link className="Link" to="/">Российско-Кыргызский институт автоматизации управления бизнеса</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PrivateOffice