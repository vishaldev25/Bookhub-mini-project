import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItems = props => {
  const {bookList} = props
  const {id, authorName, coverPic, readStatus, title, rating} = bookList

  return (
    <Link to={`/books/${id}`} className="book-links">
      <li className="book-item-list-container">
        <img src={coverPic} alt={title} className="book-item-cover-img" />
        <div className="book-item-desc-container">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-item-paras">{authorName}</p>
          <p className="book-item-paras">
            Avg rating: <BsFillStarFill color="#FBBF24" size={12} /> {rating}
          </p>
          <p className="book-item-paras">
            Status: <span className="status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItems
