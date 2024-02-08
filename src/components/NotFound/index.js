import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dfhnfwuur/image/upload/v1707297807/My%20Work/BookHub%20React%20mini%20project/not_found_image_n3yv91.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button" testid="goBackToHome">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
