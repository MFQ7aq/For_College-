import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Wellcome from './pages/Wellcome'
import Home from './pages/Home'
import Muit from './pages/MUIT'

function App() {
  return (
    <Router>
			<Routes>
				<Route path='/' element={<Wellcome />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/MUIT' element={<Muit />}/>
				<Route path="*" element={<h2>Page not Found</h2>} />
			</Routes>
    </Router>
  )
}

export default App
// https://www.figma.com/file/OFgcx9OImozjqQCZBQZBpv/Untitled?node-id=60%3A35&mode=dev