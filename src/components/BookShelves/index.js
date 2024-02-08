import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import BookTabs from '../BookTabs'
import BookItems from '../BookItems'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksList: [],
    activeValue: bookshelvesList[0].value,
    activeLabel: bookshelvesList[0].label,
    searchValue: '',
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue, activeValue} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeValue}&search=${searchValue}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const formated = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))
      // console.log(formated)
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksList: formated,
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
    this.getBooks()
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

  onChangeSearch = event => {
    const {booksList} = this.state
    this.setState({searchValue: event.target.value})
    const searchResults = booksList.filter(each =>
      each.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )
    this.setState({booksList: searchResults})
  }

  searchClicked = event => {
    if (event.key === 'Enter') {
      this.getBooks()
    }
  }

  onClickSearchButton = () => {
    this.getBooks()
  }

  renderSearchInput = () => {
    const {searchValue} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          value={searchValue}
          placeholder="Search"
          onChange={this.onChangeSearch}
          onKeyDown={this.searchClicked}
        />
        <button
          type="button"
          onClick={this.onClickSearchButton}
          className="search-button"
          testid="searchButton"
        >
          <BsSearch size={15} />
        </button>
      </div>
    )
  }

  tabClicked = value => {
    this.setState({activeValue: value})
    const {booksList} = this.state

    const filtered = booksList.filter(
      each =>
        each.readStatus.replace('_', ' ').toLowerCase() ===
        value.replaceAll('_', ' ').toLowerCase(),
    )
    this.setState({booksList: filtered}, this.getBooks)
  }

  labelChanged = label => {
    this.setState({activeLabel: label})
  }

  renderBooksList = () => {
    const {booksList, activeLabel} = this.state

    return (
      <>
        <h2 className="books-active">{activeLabel} Books</h2>

        <ul className="unordered-books-list">
          {booksList.map(each => (
            <BookItems key={each.id} bookList={each} />
          ))}
        </ul>
      </>
    )
  }

  renderBookTabs = () => {
    const {activeValue} = this.state
    return (
      <div>
        <h1 className="shelf-heading">Bookshelves</h1>
        <ul className="unordered-tabs">
          {bookshelvesList.map(each => (
            <BookTabs
              key={each.id}
              bookTabs={each}
              tabClicked={this.tabClicked}
              labelChanged={this.labelChanged}
              value={activeValue}
              isActive={activeValue === each.value}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderNosearchResults = () => {
    const {searchValue} = this.state
    return (
      <div className="no-search-container">
        <img
          src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1707322589/My%20Work/BookHub%20React%20mini%20project/no_search_smoecz.png"
          alt="no books"
          className="nobooks-image"
        />
        <p className="no-search-para">
          Your search for <span className="special">{searchValue}</span> did not
          find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksList} = this.state

    return (
      <>
        {this.renderSearchInput()}
        {this.renderBookTabs()}
        {booksList.length === 0
          ? this.renderNosearchResults()
          : this.renderBooksList()}
      </>
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
    // console.log(jwtToken)
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="books-home-container">
          <div className="shelf-mobile-container" testid="bookShelves">
            {this.renderTotal()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default BookShelves
