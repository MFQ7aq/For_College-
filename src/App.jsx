import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './pages/PageNotFound'
import Wellcome from './pages/Wellcome'
import Home from './pages/Home'
import LPPS from './pages/home/LPPS'
import Authorization from './pages/home/Authorization'
import Registration from './pages/home/Registration'
import AuthorizationPPS from './pages/home/AuthorizationPPS'
import Questionnaire from './pages/home/Questionnaire'
import Office from './pages/home/Office'
import PrivateOffice from './pages/home/PrivateOffice'
import Muit from './pages/MUIT'
import Rating_pred from './pages/MUIT/Rating_pred'
import Rating_inst from './pages/MUIT/Rating_inst'
import Rating_pps from './pages/MUIT/Rating_pps'
import Rating_inst_un from './pages/MUIT/Rating_inst-un'
import Comteh from './pages/COMTEH'
import Ivtd from './pages/COMTEH/IVTD'
import Eubd from './pages/COMTEH/EUBD'
import Kite from './pages/KITE'
import GiED from './pages/KITE/GiED'
import EiTD from './pages/KITE/EiTD'
import Personal_Data from './pages/home/PersonalData'
import Test from './pages/home/test'

function App() {
  return (
    <Router>
			<Routes>
				<Route path='/' element={<Wellcome />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/LPPS' element={<LPPS />} />
        <Route path='/Authorization' element={<Authorization />} />
        <Route path='/Registration' element={<Registration/>} />
        <Route path='/Questionnaire' element={<Questionnaire />} />
        <Route path="/Office/:id" element={<Office />} />
        <Route path='/MUIT' element={<Muit />}/>
        <Route path='/MUIT/rating_pred' element={<Rating_pred />} />
        <Route path='/MUIT/rating_inst' element={<Rating_inst />} />
        <Route path='/MUIT/rating_pps-un' element={<Rating_pps />} />
        <Route path='/MUIT/rating_inst-un' element={<Rating_inst_un />} />
        <Route path='/COMTEHNO' element={<Comteh />}/>
        <Route path='/COMTEHNO/IVTD' element={<Ivtd />}/>
        <Route path='/COMTEHNO/EUBD' element={<Eubd />}/>
        <Route path='/KITE' element={<Kite />}/>
        <Route path='/KITE/GiED' element={<GiED />} />
        <Route path='/KITE/EiTD' element={<EiTD />} />
				<Route path="*" element={<PageNotFound/>} />
        <Route path='/test' element={<Test />} />
        <Route element={<PrivateRoute />}>
          <Route path='/private_office' element={<PrivateOffice />} />
          <Route path='/AuthorizationPPS' element={<AuthorizationPPS />} />
          <Route path='/Personal_data' element={<Personal_Data />} />
        </Route>
			</Routes>
    </Router>
  )
}

export default App