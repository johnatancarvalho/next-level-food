import Link from "next/link";
import Image from "next/image";

import HeaderBackground from "./header-background";

import logoImg from "@/assets/logo.png";

import css from "./index.module.css";

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
              <Link href="/meals">Browse Meals</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
