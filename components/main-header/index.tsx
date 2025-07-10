import Link from "next/link";
import Image from "next/image";

import HeaderBackground from "./header-background";

import logoImg from "@/assets/logo.png";

import css from "./index.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <HeaderBackground />
      <header className={css.header}>
        <Link className={css.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={css.nav}>
          <ul className="flex gap-4">
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
