import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookDetails: {},
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
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
      const foramted = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      // console.log(foramted)
      this.setState({
        bookDetails: foramted,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container-book-details" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onTryagain = () => {
    this.getBookDetails()
  }

  renderFailureView = () => (
    <div className="book-details-failure-container">
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
    const {bookDetails} = this.state
    const {
      coverPic,
      title,
      authorName,
      aboutBook,
      aboutAuthor,
      rating,
      readStatus,
    } = bookDetails
    return (
      <div className="book-details-container" testid="bookDetails">
        <div className="book-details-image-desc-container">
          <img src={coverPic} alt={title} className="book-details-image" />
          <div className="book-details-description">
            <h1 className="book-details-heading">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <p className="book-details-author">
              Avg Rating: <BsFillStarFill size={15} color="#FBBF24" /> {rating}
            </p>
            <p className="book-details-author">
              Status: <span className="special">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr color="#94A3B8" />
        <div className="book-details-desc-container">
          <h2 className="book-details-about-auth-heading">About Author</h2>
          <p className="book-details-desc">{aboutAuthor}</p>
        </div>
        <div className="book-details-desc-container">
          <h2 className="book-details-about-auth-heading">About Book</h2>
          <p className="book-details-desc">{aboutBook}</p>
        </div>
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
    return (
      <>
        <Header />
        <div className="books-home-container">
          <div className="books-placement-container">{this.renderTotal()}</div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookDetails
