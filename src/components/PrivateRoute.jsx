import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
	let userLogged = localStorage.getItem('token')

  return (
    !userLogged ? <Outlet /> : <Navigate to="/Authorization"/>
  )
}

export default PrivateRoute