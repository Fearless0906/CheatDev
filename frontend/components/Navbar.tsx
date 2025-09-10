"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./ui/mode-toggle";

type NavItem = {
  name: string;
  link: string;
};

interface NavbarProps {
  navItems: NavItem[];
  onLogin: () => void;
  onSignUp: () => void;
}

const NavbarPage = ({ navItems, onLogin, onSignUp }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar>
        <NavBody className="flex justify-between items-center gap-4">
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" onClick={onLogin}>
              Login
            </NavbarButton>
            <NavbarButton variant="primary" onClick={onSignUp}>
              Sign in
            </NavbarButton>

            {/* <ModeToggle /> */}
          </div>
        </NavBody>
      </Navbar>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Sign In
            </NavbarButton>

            <ModeToggle />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </>
  );
};

export default NavbarPage;
