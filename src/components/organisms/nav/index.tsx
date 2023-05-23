import React, { useState, useEffect } from "react";
import styles from "./nav.module.css";

function Nav() {
  let navOptions: string[] = ["Our Health Plans", "Support", "Resources"];
  return (
    <nav id="nav" className={styles.nav}>
      <div className="flex basis-full md:basis-1/5 self-stretch items-center justify-between py-2 px-4">
        <img className="w-4/5" src="/logo.svg" alt="" />
      </div>

      <div id="nav-list" className="px-5 md:p-3 hidden md:block">
        <ul id="nav-ul" className={styles.nav_list}>
          {navOptions.map((option) => (
            <li className="transition-all duration-150 p-2">
              <a className="flex items-center" href="#">
                {option}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </li>
          ))}
          <li className="transition-all duration-150 p-2">
            <a href="#">Login</a>
          </li>
          <li className="font-bold transition-all duration-150 p-2 bg-sky-800 text-white rounded-md">
            <a href="#">Get started</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
