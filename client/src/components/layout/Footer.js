import "./styles.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  const date = new Date();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {date.getFullYear()} travelGo. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.instragram.com">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
