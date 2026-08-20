import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="topbar">
      <Link to="/" className="brand-link"><Logo /></Link>
      <nav>
        <a href="/#home">Home</a>
        <a href="/#about">About</a>
        <a href="/#how">How It Works</a>
        <a href="/#contact">Contact</a>
        <Link className="btn btn-primary btn-small" to="/login">Login/Register</Link>
      </nav>
    </header>
  );
}
