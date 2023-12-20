import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from "react-redux"
import './css/App.css'
import "./css/NavBar.css"
import './css/Wellcome.css'
import "./css/Home.css"
import "./css/Educational.css"
import "./css/PrivateOffice.css"
import "./css/Table.css"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)