import React from 'react';

const Header = ({ toggleMenu }) => {
  return (
    <header className="app-header">
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <h1>Purchase Order System</h1>
    </header>
  );
};

export default Header;