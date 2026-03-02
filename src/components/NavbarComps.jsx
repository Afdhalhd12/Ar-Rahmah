import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
} from "flowbite-react";
import arrahmah from "../assets/Ar-Rahmah.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


export default function NavbarComps() {
  useEffect(() => {
    const navigasi = document.getElementById('navigasi');

  }, []);
  return (
    <Navbar
      fluid
      rounded
      className="bg-[#99b5b8] border border-[#99b5b8] backdrop-blur-sm w-full"
    >
      <NavbarBrand href="#">
        <img
          src={arrahmah}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-emerald-700">
          Ar-Rahmah
        </span>
      </NavbarBrand>

      <NavbarCollapse>
        <Link to="/">
          <NavbarLink active className="!text-emerald-700">
            Beranda
          </NavbarLink>
        </Link>
        <HashLink smooth to="/#membaca">
          <NavbarLink className="!text-emerald-700">
            Membaca
          </NavbarLink>
        </HashLink>
      </NavbarCollapse>
    </Navbar>
  );
}
