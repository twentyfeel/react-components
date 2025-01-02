import { NavbarProps } from "./props/NavbarProps.ts";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "../../ThemeToggle/ThemeToggle.tsx";
import File from "../../../assets/icons/Navbar/File.svg?react";
import Search from "../../../assets/icons/Navbar/Search.svg?react";
import "./Navbar.scss";

const Navbar: React.FC<NavbarProps> = ({
  logo = "Twentyfeel",
  menuItems = [],
  commandItems = [],
  showThemeToggle = false,
  showSearch = false,
  onSearch,
  searchPlaceholder = "Search...",
  logoComponent,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null);
  const [dropdownDir, setDropdownDir] = useState<null | "l" | "r">(null);
  const [dropdownPosition, setDropdownPosition] = useState(0);

  const handleDropdownSelect = (index: number | null) => {
    if (index !== null && !menuItems[index]?.submenu) {
      return;
    }

    if (typeof selectedDropdown === "number" && typeof index === "number") {
      setDropdownDir(selectedDropdown > index ? "r" : "l");
    } else if (index === null) {
      setDropdownDir(null);
    }
    setSelectedDropdown(index);
  };

  useEffect(() => {
    if (selectedDropdown !== null) {
      const tab = document.getElementById(`navbar-tab-${selectedDropdown}`);
      const content = document.getElementById("dropdown-content");

      if (tab && content) {
        const tabRect = tab.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const tabCenter = tabRect.left + tabRect.width / 2;
        setDropdownPosition(tabCenter - contentRect.left);
      }
    }
  }, [selectedDropdown]);

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
        commandItems[selectedIndex].onSelect?.(
          commandItems[selectedIndex].id,
          commandItems[selectedIndex].label,
        );
        handleCloseCommand();
      }
    };

    const disableScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isCommandOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", disableScroll, { passive: false });
      window.addEventListener("touchmove", disableScroll, { passive: false });
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
    };
  }, [isCommandOpen, selectedIndex, commandItems]);

  const mobileSubmenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
  };

  const mobileSubmenuItemVariants = {
    closed: (i: number) => ({
      x: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        delay: 0.1 - i * 0.05,
      },
    }),
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1 + i * 0.05,
      },
    }),
  };

  return (
    <>
      <header className={`navbar ${className}`}>
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
                  <>
                    {/*DESKTOP PART*/}
                    <div className="navbar__menu-desktop">
                      <div
                        className="navbar__menu-items"
                        onMouseLeave={() => handleDropdownSelect(null)}
                      >
                        {menuItems.map((item, index) =>
                          item.submenu ? (
                            <button
                              key={index}
                              id={`navbar-tab-${index}`}
                              className={`navbar__menu-button ${selectedDropdown === index ? "is-selected" : ""}`}
                              onMouseEnter={() => handleDropdownSelect(index)}
                              onClick={() => handleDropdownSelect(index)}
                            >
                              <span>{item.label}</span>
                              <svg
                                className={`navbar__chevron ${selectedDropdown === index ? "is-rotated" : ""}`}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.46967 5.46967L3 4.93934L8 9.93934L13 4.93934L13.5303 5.46967L8.53033 10.4697C8.23744 10.7626 7.76256 10.7626 7.46967 10.4697L2.46967 5.46967Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          ) : (
                            <a key={index} href={item.href} className="navbar__menu-link">
                              {item.label}
                            </a>
                          ),
                        )}

                        <AnimatePresence>
                          {selectedDropdown !== null && (
                            <motion.div
                              id="dropdown-content"
                              className="navbar__dropdown"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                            >
                              <div className="navbar__dropdown-bridge" />
                              <motion.span
                                className="navbar__dropdown-nub"
                                animate={{ left: dropdownPosition }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                              />

                              {menuItems.map((item, idx) => (
                                <div key={idx} className="navbar__dropdown-content">
                                  {selectedDropdown === idx && item.submenu && (
                                    <motion.ul
                                      className="navbar__submenu"
                                      initial={{
                                        opacity: 0,
                                        x:
                                          dropdownDir === "l"
                                            ? 100
                                            : dropdownDir === "r"
                                              ? -100
                                              : 0,
                                      }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                      {item.submenu.map((subitem, subindex) => (
                                        <li key={subindex}>
                                          <a href={subitem.href}>{subitem.label}</a>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/*MOBILE PART*/}
                    <div className="navbar__menu-mobile">
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
                                    <svg
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
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    initial="closed"
                                    animate={openSubmenu === index ? "open" : "closed"}
                                    exit="closed"
                                    variants={mobileSubmenuVariants}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <ul>
                                      {item.submenu.map((subitem, subindex) => (
                                        <motion.li
                                          key={subindex}
                                          custom={subindex}
                                          variants={mobileSubmenuItemVariants}
                                          initial="closed"
                                          animate={openSubmenu === index ? "open" : "closed"}
                                          exit="closed"
                                        >
                                          <a href={subitem.href}>{subitem.label}</a>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                </AnimatePresence>
                              </div>
                            ) : (
                              <a href={item.href}>{item.label}</a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
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
                    <Search />
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

      <AnimatePresence>
        {isCommandOpen && (
          <>
            <motion.div
              className="navbar__command-overlay"
              onClick={handleCloseCommand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
            <motion.div
              className="navbar__command-dialog"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, transform: "translateX(-50%) scale(0.95)" }}
              animate={{ opacity: 1, transform: "translateX(-50%) scale(1)" }}
              exit={{ opacity: 0, transform: "translateX(-50%) scale(0.95)" }}
              transition={{ duration: 0.15 }}
            >
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
                  {commandItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`navbar__command-item ${selectedIndex === index ? "is-selected" : ""}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => {
                        item.onSelect?.(item.id, item.label);
                        onSearch?.(item.label);
                        handleCloseCommand();
                      }}
                    >
                      <div className="navbar__command-item-icon">
                        <File />
                      </div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
