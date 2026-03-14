import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (

    <div style={styles.navbar}>

      <h2 style={styles.logo}>
        ExpenseTracker
      </h2>

      <div style={styles.links}>

        <Link style={styles.link} to="/dashboard">
          Dashboard
        </Link>

        <Link style={styles.link} to="/add-transaction">
          Add Transaction
        </Link>

        <button style={styles.button} onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );

}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#222",
    color: "white",
  },

  logo: {
    margin: 0,
  },

  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
  },

  button: {
    padding: "6px 12px",
    cursor: "pointer",
  },

};

export default Navbar;