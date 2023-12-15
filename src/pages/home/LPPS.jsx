import NavBar from "../../components/NavBar"
import BackButton from "../../components/Back"

function Lpps() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <label htmlFor="">
          <input type="text" />
        </label>
        <BackButton/>
      </div>
    </div>
  )
}

export default Lpps