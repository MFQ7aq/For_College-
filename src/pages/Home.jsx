import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="https://intuit.kg/questionnaire/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="home__cards">
          <div className="home__card">
          <div className="card__img"></div>
            <p className="card__text">Бишкекский колледж компьютерных систем и технологий</p>
          </div>
          <div className="home__card">
          <div className="card__img"></div>
            <p className="card__text">Международный университет инновационных технологий</p>
          </div>
          <div className="home__card">
          <div className="card__img"></div>
            <p className="card__text">Колледж инновационных технологий и экономики</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home