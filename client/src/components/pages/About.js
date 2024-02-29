import { Link } from "react-router-dom";

import styles from "./pageStyles.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1>
        🌍 Welcome to ✈️ <span className={styles.highlight}>travelGo!</span>
      </h1>
      <p>
        Hello, fellow wanderer! I'm{" "}
        <span className={styles.highlight}>sai teja</span>, the adventurer
        behind this digital travel heaven. travelGo is not just a travel blog;
        it's a canvas where I paint my tales of exploration, discovery, and the
        sheer joy of being lost in the beauty of the world.
      </p>
      <h2>Our Journey</h2>
      <p>
        The seeds of my passion for travel were planted in{" "}
        <span className={styles.highlight}>India</span>, where the allure of
        far-off lands and diverse cultures beckoned me from an early age. Fast
        forward to today, and I've turned that passion into a virtual compass
        that guides me and my readers to captivating destinations.
      </p>
      <h2>Our Mission</h2>
      <p>
        At <span className={styles.highlight}>travelGo</span>, our mission is
        simple — to inspire and empower you to embark on your own transformative
        journeys. Whether you're a seasoned globetrotter or someone taking the
        first steps beyond their comfort zone, this blog is a resource for
        meaningful travel experiences, practical tips, and the celebration of
        global diversity.
      </p>
      <h2>What You'll Find Here</h2>
      <p>
        📸 <span className={styles.highlight}>Captivating Stories</span>: Dive
        into immersive narratives that transport you to the heart of each
        destination, accompanied by vivid photographs that capture the essence
        of the moment.
        <br />
        🌐 <span className={styles.highlight}>Travel Guides</span>: Practical
        tips and comprehensive guides to help you plan your adventures, from
        hidden gems to well-trodden paths.
        <br /> 🎒 <span className={styles.highlight}>Packing Wisdom</span>:
        Learn from triumphs and mishaps, and discover the art of packing light
        without compromising on essentials.
        <br /> 🌟 <span className={styles.highlight}>Cultural Insights</span>:
        Explore the rich tapestry of cultures around the world through firsthand
        experiences and encounters.
      </p>
      <h2>Join the Journey</h2>
      <p>
        This blog isn't just about my adventures; it's a collective exploration.
        Join us as we navigate the globe, sharing insights, laughter, and the
        occasional travel misadventure. This space is open for you to
        contribute, connect with like-minded souls, and collectively celebrate
        our love for exploration and curiosity about the world we inhabit.{" "}
        <br />
        <span className={styles.highlight}>Your Contributions Matter:</span> We
        invite you to share your own travel stories, tips, and unique
        experiences. This blog thrives on the diverse perspectives of our
        community. Whether you're a seasoned traveler or someone embarking on
        your first journey, your voice adds to the richness of our shared
        adventures.
      </p>
      <h2>Let's Connect</h2>
      <p>
        Have a question, suggestion, or just want to say hello? I'd love to hear
        from you! Head over to the{" "}
        <Link className={styles.link} to="/contact">
          Contact
        </Link>{" "}
        Page to drop me a message. Thank you for being a part of this incredible
        journey. Let's explore the world together!
        <br />
        <br />
        Happy travels,
        <h3>
          <span className={styles.highlight}>saiteja</span>
        </h3>
      </p>
    </div>
  );
};
export default About;
