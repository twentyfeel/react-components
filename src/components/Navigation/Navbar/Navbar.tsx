import { NavbarProps } from "./props/NavbarProps.ts";
import { useCallback, useEffect, useState } from "react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle.tsx";
import "./Navbar.scss";

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
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // TODO: move to prop
  const commandItems = [
    {
      id: "introduction",
      label: "Introduction",
      onSelect: () => console.log("Introduction"),
    },
    {
      id: "getting-started",
      label: "Getting Started",
      onSelect: () => console.log("Getting Started"),
    },
  ];

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

  const handleSearch = (e?: React.FormEvent): void => {
    e?.preventDefault();
    setIsCommandOpen(true);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCloseCommand = () => {
    setIsCommandOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }

      if (!isCommandOpen) return;

      if (e.key === "Escape") {
        handleCloseCommand();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % commandItems.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + commandItems.length) % commandItems.length);
      }

      if (e.key === "Enter" && commandItems[selectedIndex]) {
        commandItems[selectedIndex].onSelect?.();
        handleCloseCommand();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen, selectedIndex, commandItems]);

  const baseColors = {
    backgroundColor: colors.backgroundColor || "navbar__bg-default",
    textColor: colors.textColor || "navbar__text-default",
    hoverColor: colors.hoverColor || "navbar__hover-default",
    activeColor: colors.activeColor || "navbar__active-default",
  };

  return (
    <>
      <header className={`${baseColors.backgroundColor} navbar ${className}`}>
        <div className="navbar__wrapper">
          <div className="navbar__logo-wrapper">
            {logoComponent || (
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
                              className="submenu-button"
                            >
                              {item.label}
                              <span className="submenu-icon">
                                {/*TODO: move to svg file*/}
                                <svg
                                  data-testid="geist-icon"
                                  height="16"
                                  strokeLinejoin="round"
                                  viewBox="0 0 16 16"
                                  width="16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
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
              {showThemeToggle && (
                <div className="navbar__mobile-theme-toggle">
                  <p>Theme</p>
                  <ThemeToggle />
                </div>
              )}
            </div>
            <div className="navbar__buttons-container">
              {showSearch && (
                <>
                  <button
                    className="navbar__search"
                    type="button"
                    aria-label="Search"
                    onClick={handleSearch}
                  >
                    {searchPlaceholder}
                    <kbd className="navbar__kbd">
                      {navigator.platform.toLowerCase().includes("mac") ? "⌘" : "Ctrl"}K
                    </kbd>
                  </button>
                  <button
                    className="navbar__search-mobile"
                    type="button"
                    aria-label="Search"
                    onClick={handleSearch}
                  >
                    {/*TODO: move to svg*/}
                    <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </>
              )}
              {showThemeToggle && <ThemeToggle className="navbar__desktop-theme-toggle" />}
              <button
                className="navbar__mobile-toggle"
                onClick={handleMenuToggle}
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
              >
                <div className="toggle-bar" data-position="top"></div>
                <div className="toggle-bar" data-position="bottom"></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isCommandOpen && (
        <>
          <div className="navbar__command-overlay" onClick={handleCloseCommand} />
          <div className="navbar__command-dialog" role="dialog" aria-modal="true">
            <div className="navbar__command-top">
              <div className="navbar__command-input-wrapper">
                <input
                  className="navbar__command-input"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => handleSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="navbar__command-esc" onClick={handleCloseCommand}>
                  Esc
                </button>
              </div>
            </div>
            <div className="navbar__command-content">
              <div className="navbar__command-list">
                {/*TODO: Disable scroll when search is active*/}
                {commandItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`navbar__command-item ${
                      selectedIndex === index ? "is-selected" : ""
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      item.onSelect?.();
                      onSearch?.(item.label);
                      handleCloseCommand();
                    }}
                  >
                    <div className="navbar__command-item-icon">
                      {/*TODO: move to svg*/}
                      <svg
                        data-testid="geist-icon"
                        height="16"
                        strokeLinejoin="round"
                        viewBox="0 0 16 16"
                        width="16"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
