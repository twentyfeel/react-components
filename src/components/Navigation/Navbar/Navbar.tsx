import { NavbarProps } from "./props/NavbarProps.ts";
import "./Navbar.scss";
import ThemeToggle from "../../ThemeToggle/ThemeToggle.tsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../Button/Button.tsx";

const Navbar: React.FC<NavbarProps> = ({
  logo = "Twentyfeel",
  menuItems = [],
  showThemeToggle = true,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search...",
  logoComponent,
  className = "",
  colors = {},
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleMenuToggle = useCallback(() => {
    if (!isOpen) {
      setScrollPosition(window.scrollY);
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (isOpen) {
        window.scrollTo(0, scrollPosition);
        e.preventDefault();
      }
    };

    if (isOpen) {
      window.addEventListener("scroll", handleScroll, { passive: false });
      document.documentElement.style.scrollBehavior = "auto";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "smooth";
    };
  }, [isOpen, scrollPosition]);

  const toggleSubmenu = (index: number): void => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const baseColors = {
    backgroundColor: colors.backgroundColor || "navbar__bg-default",
    textColor: colors.textColor || "navbar__text-default",
    hoverColor: colors.hoverColor || "navbar__hover-default",
    activeColor: colors.activeColor || "navbar__active-default",
  };

  return (
    <header className={`${baseColors.backgroundColor} navbar ${className}`}>
      <div className="navbar__wrapper">
        <div className="navbar__logo-wrapper">
          {logoComponent || (
            // NOTE: This is simple a href change to Link if we use Next, React etc
            <a href="/" className="navbar__logo">
              {logo}
            </a>
          )}
        </div>
        <div className="navbar__container">
          <div className={`navbar__menu-container ${isOpen ? "is-open" : ""}`}>
            <nav className="navbar__menu-nav">
              {menuItems.length > 0 && (
                <ul className="navbar__menu-content">
                  {menuItems.map((item, index) => (
                    <li key={index} className="navbar__menu-item">
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(index)}
                            aria-expanded={openSubmenu === index}
                          >
                            {item.label}
                          </button>
                          {openSubmenu === index && (
                            <ul>
                              {item.submenu.map((subitem, subindex) => (
                                <li key={subindex}>
                                  <a href={subitem.href}>{subitem.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <a href={item.href}>{item.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </div>
          <div className="navbar__buttons-container">
            {showSearch && (
              <form onSubmit={handleSearch}>
                <div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                  />
                  <button type="submit">
                    <span>ICON</span>
                    <span>Search</span>
                  </button>
                </div>
              </form>
            )}
            {showThemeToggle && <ThemeToggle />}
            <Button
              className="navbar__mobile-toggle"
              onClick={handleMenuToggle}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <span>CLOSE</span> : <span>MENU</span>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
