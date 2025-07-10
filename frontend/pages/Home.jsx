import React from 'react'
import { handleSuccess } from '../src/util.js';
import { ToastContainer } from "react-toastify";
import {useNavigate} from "react-router-dom"
function Home() {
  const Navigate = useNavigate();
  const [loginUser, setLoginUser] = React.useState('');
  React.useEffect(() => {
    setLoginUser(localStorage.getItem('LoggedInUser'))
  },[])

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
          handleSuccess('Logout Successfully');

    setTimeout(() => {
    Navigate('/login');
    },1000)

    // window.location.href = '/login';
  
  }
  return (
    <div className='container'>
      <h1>{loginUser}</h1>
      <button className="btn" onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home