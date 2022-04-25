import React from "react";
import "./Header.css"

function Header() {

  const smoothScroll = () => {
    window.scroll(0, 0);
  }

  return (
    <div className="header" onClick={smoothScroll} >
      📷 Movies Mania 🎥
    </div>
  )
}

export default Header;