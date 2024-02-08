import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMessage, showError: true})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderusername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          Username*
        </label>
        <input
          type="text"
          value={username}
          className="input"
          id="username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasssword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          Password*
        </label>
        <input
          type="password"
          value={password}
          className="input"
          id="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form">
        <div className="login-page-main-image-mobile">
          <img
            src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1706938367/My%20Work/BookHub%20React%20mini%20project/Login_page_side_image_lc1w3b.png"
            alt="website login"
            className="login-side-image"
          />
          <div className="login-box-container">
            <img
              src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1706937603/My%20Work/BookHub%20React%20mini%20project/book_hub_logo_xs55yp.png"
              alt="login website logo"
              className="login-logo-image"
            />
            <form className="form-container" onSubmit={this.onClickSubmit}>
              <div className="input-container">{this.renderusername()}</div>
              <div className="input-container">{this.renderPasssword()}</div>
              {showError && <p className="error-para">{errorMessage}</p>}
              <button type="submit" className="login-button" testid="login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
