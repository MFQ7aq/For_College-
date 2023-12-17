import NavBar from "../../components/NavBar"

function Lpps() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain-M"><h2 className="Edu__text-M">Список ППС</h2></div>
        <label htmlFor="" className="search__label">
          <input type="text" className="search__input"/>
          <div className="search__btn"><div className="search__btn-in"></div></div>
        </label>
      </div>
    </div>
  )
}

export default Lpps