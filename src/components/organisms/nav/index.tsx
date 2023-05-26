import React  from "react";
import styles from "./nav.module.css";
import { BsChevronDown } from 'react-icons/bs';

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
            <li className="transition-all duration-150 p-2" key={option}>
              <a className="flex items-center" href="#">
                {option}
                <BsChevronDown className="cursor-pointer text-xs" />
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
