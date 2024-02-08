import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [hamburgerClicked, setHamClicked] = useState(false)

  const hamClicked = () => {
    setHamClicked(prev => !prev)
  }

  const onClickClose = () => {
    setHamClicked(prev => !prev)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-mobile-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1706937603/My%20Work/BookHub%20React%20mini%20project/book_hub_logo_xs55yp.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <button
            type="button"
            className="hamburger-button"
            onClick={hamClicked}
            testid="hamburgerButton"
          >
            <GiHamburgerMenu size={18} />
          </button>
          <div className="navbar-desktop-links-container">
            <ul className="navbar-unordered-container">
              <Link to="/" className="nav-links">
                <li className="navbar-list-items-container">Home</li>
              </Link>
              <Link to="/shelf" className="nav-links">
                <li className="navbar-list-items-container">Bookshelves</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
              testid="logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {hamburgerClicked ? (
        <div className="navbar-harmburger-links-container">
          <ul className="navbar-unordered-container">
            <Link to="/" className="nav-links">
              <li className="navbar-list-items-container">Home</li>
            </Link>
            <Link to="/shelf" className="nav-links">
              <li className="navbar-list-items-container">Bookshelves</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
            testid="logout"
          >
            Logout
          </button>
          <button type="button" onClick={onClickClose} className="close-button">
            <IoIosCloseCircle size={20} />
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default withRouter(Header)
