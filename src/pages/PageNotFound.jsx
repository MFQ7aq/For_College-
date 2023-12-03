import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <h2 className="PNF__text"><Link to="/home" className="PNF__link">Страница не найдена!</Link></h2>
      </div>
    </div>
  )
}

export default PageNotFound