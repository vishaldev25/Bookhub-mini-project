import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooksList: [],
    apiStatus: apiStatusConstants.initital,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const formatData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        title: each.title,
        coverPic: each.cover_pic,
      }))
      // console.log(formatData)
      this.setState({
        topRatedBooksList: formatData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onTryagain = () => {
    this.getTopRatedBooks()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1707043869/My%20Work/BookHub%20React%20mini%20project/failure_cat_image_nc1lne.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button type="button" className="logout-button" onClick={this.onTryagain}>
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {topRatedBooksList} = this.state

    const settings = {
      slidesToShow: 3,
      infinite: false,
      slidesToScroll: 1,
      speed: 500,
      initalSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {topRatedBooksList.map(each => {
            const {coverPic, authorName, title, id} = each
            return (
              <div key={id} className="slick-item">
                <Link to={`/books/${id}`} className="slider-links">
                  <img src={coverPic} alt={title} className="logo-image" />
                  <div className="para-container">
                    <h1 className="slick-para">{title}</h1>
                    <p className="slick-author">{authorName}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderTotal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return ''
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content-mobile" testid="home">
            <h1 className="home-heading">Find Your Next Favorite Books? </h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf">
              <button
                type="button"
                className="find-books-button1"
                testid="findBooks"
              >
                Find Books
              </button>
            </Link>
            <div className="top-books-showcase-container">
              <div className="top-contanier">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <Link to="/shelf">
                  <button type="button" className="find-books-button2">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderTotal()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
