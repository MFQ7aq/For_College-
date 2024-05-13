import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './pages/PageNotFound'
import Wellcome from './pages/Wellcome'
import Home from './pages/Home'
import LPPS from './pages/home/LPPS'
import Authorization from './pages/home/Authorization'
import Registration from './pages/home/Registration'
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
import Progress from './pages/home/Progress'
import Research from './pages/home/Research'
import Education from './pages/home/Education'
import Social from './pages/home/Social'
import Offence from './pages/home/Admin/Offence'
import UserInfo from './pages/home/UserInfo'
import UserInfoA from './pages/home/Admin/UserInfoA'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Admin from './pages/home/Admin/Admin'
import Lppsa from './pages/home/Admin/LPPSA'
import RedactInfo from './pages/home/RedactInfo'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8092/api/get/role", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAdmin(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getUserRole();
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Wellcome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/LPPS' element={<LPPS />} />
        <Route path='/Authorization' element={<Authorization />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/Questionnaire' element={<Questionnaire />} />
        <Route path="/Office/:id" element={<Office />} />
        <Route path='/MUIT' element={<Muit />} />
        <Route path='/MUIT/rating_pred' element={<Rating_pred />} />
        <Route path='/MUIT/rating_inst' element={<Rating_inst />} />
        <Route path='/MUIT/rating_pps-un' element={<Rating_pps />} />
        <Route path='/MUIT/rating_inst-un' element={<Rating_inst_un />} />
        <Route path='/COMTEHNO' element={<Comteh />} />
        <Route path='/COMTEHNO/IVTD' element={<Ivtd />} />
        <Route path='/COMTEHNO/EUBD' element={<Eubd />} />
        <Route path='/KITE' element={<Kite />} />
        <Route path='/KITE/GiED' element={<GiED />} />
        <Route path='/KITE/EiTD' element={<EiTD />} />
        <Route path="*" element={<PageNotFound />} />
        {isAdmin === 'admin' && (
          <Route element={<PrivateRouteAdmin />}>
            <Route path='/private_office' element={<PrivateOffice />} />
            <Route path='/Progress' element={<Progress />} />
            <Route path='/Ural' element={<Research />} />
            <Route path='/Education' element={<Education />} />
            <Route path='/Social' element={<Social />} />
            <Route path="/user/:id" element={<UserInfo />} />
            <Route path='/admin' element={<Admin/>} />
            <Route path='/user/admin/:id' element={<UserInfoA />} />
            <Route path='/Offence' element={<Offence />} />
            <Route path='/admin_list' element={<Lppsa />} />
            <Route path='/my_account/:id' element={<RedactInfo/>}/>
          </Route>)}
        {isAdmin === 'user' && (
          <Route element={<PrivateRoute />}>
            <Route path='/private_office' element={<PrivateOffice />} />
            <Route path='/Progress' element={<Progress />} />
            <Route path='/Ural' element={<Research />} />
            <Route path='/Education' element={<Education />} />
            <Route path='/Social' element={<Social />} />
            <Route path="/user/:id" element={<UserInfo />} />
            <Route path='/my_account/:id' element={<RedactInfo/>}/>
          </Route>
        )}
      </Routes>
    </Router>
  )
}

export default App