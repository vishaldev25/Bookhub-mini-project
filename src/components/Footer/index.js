import {
  FaGoogle,
  FaCopyright,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'

import './index.css'

const date = new Date().getFullYear()

const Footer = () => (
  <footer className="footer">
    <div className="icons">
      <FaGoogle size={25} />
      <FaTwitter size={25} />
      <FaInstagram size={25} />
      <FaYoutube size={25} />
    </div>
    <div>
      <p className="contactus">
        Developed by <span className="special">Vishal</span>
      </p>
      <p className="copyright">
        <FaCopyright size={13} /> Copyright {date}
      </p>
    </div>
  </footer>
)

export default Footer
