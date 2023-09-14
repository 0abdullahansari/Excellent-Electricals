import'./Topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useStateValue } from "./StateProvider";
import { auth } from "./Firebase";
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}
from 'react-router-dom';

function Topbar() {

  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className='topbar' >
      
      {/* Logo */}
      <Link to="/">
        <img className='logo' src="src\assets\topf.png"  />
      </Link>

      {/* search */}
      <div className='topSearch'>
        <input id="searchinput" type="text" className='topSearchInput' />
        <SearchIcon className='topbarsearchicon'/>
      </div>
      
      <div className='navoptions'>
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className='baroption'>
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to="/cart">
          <div className='cart'>
            <ShoppingCartOutlinedIcon className='carticon'/>
            <span className='cartcount'>{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Topbar