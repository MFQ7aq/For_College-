import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import Wellcome from './pages/Wellcome'
import Home from './pages/Home'
import Muit from './pages/MUIT'
import Komteh from './pages/KOMTEH'
import Kite from './pages/KITE'
import GiED from './pages/KITE/GiED'
import EiTD from './pages/KITE/EiTD'

function App() {
  return (
    <Router>
			<Routes>
				<Route path='/' element={<Wellcome />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/MUIT' element={<Muit />}/>
        <Route path='/KOMTEHNO' element={<Komteh />}/>
        <Route path='/KITE' element={<Kite />}/>
        <Route path='/KITE/GiED' element={<GiED />} />
        <Route path='/KITE/EiTD' element={<EiTD />} />
				<Route path="*" element={<PageNotFound/>} />
			</Routes>
    </Router>
  )
}

export default App
// https://www.figma.com/file/OFgcx9OImozjqQCZBQZBpv/Untitled?node-id=60%3A35&mode=dev