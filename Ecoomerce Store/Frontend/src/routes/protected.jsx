import { Navigate,Outlet } from "react-router-dom"; 
import Cookies from 'js-cookie'


const Protected = () => {
    const token = Cookies.get('idToken')
    return token ? <Outlet /> : <Navigate to="signIn" />
}


export default Protected