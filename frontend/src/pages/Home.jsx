import { Link } from "react-router-dom";
import { UserRound, Building2, Zap, Users, Clock3, ShieldCheck, Search, Heart, Droplet } from "lucide-react";
import Header from "../components/Header";
import Logo from "../components/Logo";

const features = [
  [UserRound, "Individual Donors", "Register as a person (age 18-65) with your blood group. Help save lives in your community."],
  [Building2, "Institutional Donors", "NGOs, hospitals, and blood banks can register to manage their donation programs efficiently."],
  [Zap, "Smart Matching System", "Our intelligent matching connects blood requests with available donors quickly."],
  [Users, "Multi-Role User System", "One account can serve as both donor and seeker. Switch roles seamlessly."],
  [Clock3, "Fast Emergency Support", "Get immediate notifications and respond to urgent blood requests quickly."],
  [ShieldCheck, "Secure & Trusted", "Your data is protected. Verified donors and a secure platform for all users."],
];

export default function Home() {
  return (
    <div>
      <Header />
      <main id="home">
        <section className="hero">
          <p className="hero-intro">
            DonorGO connects blood donors with those in urgent need. Simple,<br/>
            secure, and fast. Save a life today. Save Lives. Join DonorGO
          </p>
          <h3>EVERY DROP COUNTS. <Heart fill="currentColor" /></h3>
          <Heart className="hero-heart" fill="currentColor" />
          <h1>Be a Hero.</h1>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/register">Become a Donor →</Link>
            <Link className="btn btn-outline" to="/request-blood">Need Blood? →</Link>
          </div>
        </section>

        <section id="about" className="section">
          <h2>Why Choose DonorGO?</h2>
          <p className="section-subtitle">Features designed to make blood donation accessible and efficient</p>
          <div className="feature-grid">
            {features.map(([Icon, title, text]) => (
              <article className="card" key={title}>
                <Icon className="feature-icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="section section-soft">
          <h2>How DonorGO Works</h2>
          <p className="section-subtitle">Simple steps to make a difference in someone's life</p>
          <div className="three-grid">
            <article className="card center">
              <div className="circle-icon red"><UserRound /></div>
              <h3>For Donors</h3>
              <p>Register as an individual or institution. Set your availability and blood group. Help save lives when needed.</p>
            </article>
            <article className="card center">
              <div className="circle-icon blue"><Search /></div>
              <h3>For Seekers</h3>
              <p>Request blood during emergencies. Our smart matching system connects you with available donors instantly.</p>
            </article>
            <article className="card center">
              <div className="circle-icon purple"><Users /></div>
              <h3>For Both</h3>
              <p>Create a unified profile. Switch between donor and seeker roles seamlessly. One account, multiple ways to help.</p>
            </article>
          </div>
        </section>

        <section className="cta">
          <h2>Ready to Save a Life Today?</h2>
          <p>Join donors and seekers making a difference in India. Your registration could save someone's life.</p>
          <Link className="btn btn-light" to="/register">Register Now →</Link>
        </section>
      </main>

      <footer id="contact">
        <div>
          <Logo />
          <p>India's modern blood donation platform connecting donors and seekers. Join us in saving lives, one donation at a time.</p>
          <p>✉ contact@donorgo.in</p>
          <p>☎ +91 1800-DONORGO</p>
          <p>⌖ India</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p><a href="/#home">Home</a></p>
          <p><a href="/#about">About</a></p>
          <p><a href="/#how">How It Works</a></p>
          <p><a href="/#contact">Contact</a></p>
        </div>
        <div>
          <h4>Resources</h4>
          <p><Link to="/register">Become a Donor</Link></p>
          <p><Link to="/request-blood">Request Blood</Link></p>
          <p>FAQ</p>
          <p>Privacy Policy</p>
        </div>
        <div className="copyright">© 2026 DonorGO. All rights reserved.</div>
      </footer>
    </div>
  );
}
