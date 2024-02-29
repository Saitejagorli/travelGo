import styles from "./pageStyles.module.css";

import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1>🔥Let's Explore Together</h1>
      <p>
        Welcome to 🚀 <span className={styles.highlight}>travelGo</span>, where
        the journey is as exciting as the destination! We're thrilled to connect
        with fellow travel enthusiasts and curious souls. Whether you have
        questions, want to share your travel stories, or just say hello, we're
        here for it all.
      </p>
      <h2>Get in Touch</h2>
      <p>
        📧 Email: <br />
        Feel free to shoot us an email at{" "}
        <span className={styles.highlight}>travelgo.2004@gmail.com</span>. We
        love receiving messages from fellow travelers!
      </p>
      <h2>Follow the Adventure</h2>
      <p>
        🌐 Social Media: <br />
        Connect with us on social media for daily doses of travel inspiration,
        stunning visuals, and the latest updates:
        <br />
        <FaInstagram /> &nbsp;Instagram
        <br />
        <FaXTwitter /> &nbsp;Twitter <br />
        <FaFacebook /> &nbsp;Facebook
      </p>
      <h2>Let's Make Memories Together</h2>
      <p>
        <span className={styles.highlight}>travelGo</span> is more than just a
        blog; it's a community of passionate explorers. We look forward to
        hearing from you, sharing your adventures, and creating lasting memories
        together.
        <br />
        Bon voyage,
        <br />
        <h3>
          <span className={styles.highlight}>saiteja</span>
        </h3>
        <span className={styles.highlight}>Founder, travelGo</span>
      </p>
    </div>
  );
};
export default Contact;
