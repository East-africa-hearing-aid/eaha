import React from "react";
import "./MenuBtn.css";

interface MenuBtnProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuBtn = ({ isOpen, toggleMenu }: MenuBtnProps) => {
  return (
    <div
      className={`menu-toggle z-50 bg-[rgba(0,0,0,0.4)] rounded-3xl text-white ${isOpen ? "opened" : "closed"}`}
      onClick={toggleMenu}
    >
      <div className="menu-toggle-icon bg-white">
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy font-suisse-regular">
        <p>Menu</p>
      </div>
    </div>
  );
};

export default MenuBtn;
