import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './pages/PageNotFound'
import Wellcome from './pages/Wellcome'
import Home from './pages/Home'
import LPPS from './pages/home/LPPS'
import Authorization from './pages/home/Authorization'
import Questionnaire from './pages/home/Questionnaire'
import PrivateOffice from './pages/home/PrivateOffice'
import Muit from './pages/MUIT'
import Komteh from './pages/KOMTEH'
import Ivtd from './pages/KOMTEH/IVTD'
import Eubd from './pages/KOMTEH/EUBD'
import Kite from './pages/KITE'
import GiED from './pages/KITE/GiED'
import EiTD from './pages/KITE/EiTD'

function App() {
  return (
    <Router>
			<Routes>
				<Route path='/' element={<Wellcome />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/home/LPPS' element={<LPPS />} />
        <Route path='/home/Authorization' element={<Authorization />} />
        <Route path='/home/Questionnaire' element={<Questionnaire />} />
        <Route path='/MUIT' element={<Muit />}/>
        <Route path='/KOMTEHNO' element={<Komteh />}/>
        <Route path='/KOMTEHNO/IVTD' element={<Ivtd />}/>
        <Route path='/KOMTEHNO/EUBD' element={<Eubd />}/>
        <Route path='/KITE' element={<Kite />}/>
        <Route path='/KITE/GiED' element={<GiED />} />
        <Route path='/KITE/EiTD' element={<EiTD />} />
				<Route path="*" element={<PageNotFound/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/home/private_office' element={<PrivateOffice />} />
        </Route>
			</Routes>
    </Router>
  )
}

export default App
// https://www.figma.com/file/OFgcx9OImozjqQCZBQZBpv/Untitled?node-id=60%3A35&mode=dev