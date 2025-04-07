import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  Home,
  Newspaper,
  MessageSquareQuote,
  Plus,
  ListFilter,
  Menu,
  X,
  ArrowLeftCircle,
  ArrowRightCircle,
  BuildingIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: { title: string; path: string; icon: React.ReactNode }[];
}

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Properties: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on wider screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin",
    },
    {
      title: "Properties",
      icon: <Home className="h-5 w-5" />,
      submenu: [
        {
          title: "All Properties",
          path: "/admin/properties",
          icon: <ListFilter className="h-4 w-4" />,
        },
        {
          title: "Add Property",
          path: "/admin/properties/new",
          icon: <Plus className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Blogs",
      icon: <Newspaper className="h-5 w-5" />,
      submenu: [
        {
          title: "All Blogs",
          path: "/admin/blogs",
          icon: <ListFilter className="h-4 w-4" />,
        },
        {
          title: "Add Blog",
          path: "/admin/blogs/new",
          icon: <Plus className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Testimonies",
      icon: <MessageSquareQuote className="h-5 w-5" />,
      submenu: [
        {
          title: "All Testimonies",
          path: "/admin/testimonies",
          icon: <ListFilter className="h-4 w-4" />,
        },
        {
          title: "Add Testimony",
          path: "/admin/testimonies/new",
          icon: <Plus className="h-4 w-4" />,
        },
      ],
    },
  ];

  const toggleMenu = (title: string) => {
    // Close all other menus and toggle the clicked one
    setOpenMenus((prev) => {
      const newState: Record<string, boolean> = {};
      newState[title] = !prev[title];
      return newState;
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Close all submenus when collapsing
    if (!isCollapsed) {
      setOpenMenus({});
    }
  };

  // Mobile menu toggle button (outside the sidebar)
  const MobileMenuToggle = () => (
    <button
      type="button"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden fixed right-4 top-4 z-50 p-2 rounded-full bg-primary text-white shadow-md hover:bg-primary/90 transition-colors"
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMobileMenuOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );

  const isMenuActive = (item: MenuItem) => {
    // For dashboard, exact match only
    if (item.path === "/admin") {
      return location.pathname === "/admin";
    }

    // For items with submenu, check if current path exactly matches this section
    if (item.submenu) {
      const sectionPath = item.submenu[0].path.split("/")[2]; // gets 'properties', 'blogs', or 'testimonies'
      const currentSection = location.pathname.split("/")[2]; // get current section from path
      return sectionPath === currentSection;
    }

    return false;
  };

  const isSubmenuItemActive = (path: string) => {
    return location.pathname === path;
  };

  // Update useEffect to handle menu state based on current path
  useEffect(() => {
    // Reset all menus first
    const newMenuState: Record<string, boolean> = {};

    // Find the current active section and only open that menu
    const currentSection = location.pathname.split("/")[2]; // get 'properties', 'blogs', or 'testimonies'

    menuItems.forEach((item) => {
      if (item.submenu) {
        const sectionPath = item.submenu[0].path.split("/")[2];
        if (sectionPath === currentSection) {
          newMenuState[item.title] = true;
        }
      }
    });

    setOpenMenus(newMenuState);
  }, [location.pathname]);

  return (
    <>
      <MobileMenuToggle />

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-white/95 backdrop-blur-md border-r border-gray-100 shadow-lg transition-all duration-300 z-40",
          isMobileMenuOpen
            ? "fixed inset-y-0 left-0 w-[280px] max-w-[80%] h-full"
            : "fixed -left-full lg:left-0 h-full",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          "lg:sticky lg:top-0 lg:h-screen"
        )}
      >
        {/* Header with Logo */}
        <div className="p-4 h-16 flex items-center justify-between border-b border-gray-100 bg-white/50">
          <div className="flex items-center">
            <div className="flex items-center justify-center text-primary">
              <BuildingIcon className="h-8 w-8 text-primary" />
              {!isCollapsed && (
                <span className="ml-2 font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  House Rental
                </span>
              )}
            </div>
          </div>

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-full text-gray-400 transition-colors duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ArrowRightCircle className="h-5 w-5" />
            ) : (
              <ArrowLeftCircle className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-300 to-gray-200">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.submenu ? (
                <>
                  <button
                    className={cn(
                      "flex items-center justify-between w-full rounded-lg",
                      "transition-all duration-200",
                      isMenuActive(item)
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-gray-700 bg-white/50",
                      isCollapsed ? "px-2 py-3" : "px-4 py-3"
                    )}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <div
                      className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center w-full" : "space-x-3"
                      )}
                    >
                      <span className="text-inherit">{item.icon}</span>
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <span
                        className={cn(
                          "transition-transform duration-200",
                          openMenus[item.title] ? "rotate-180" : ""
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                  {openMenus[item.title] && item.submenu && !isCollapsed && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "flex items-center space-x-2 p-2 rounded-md",
                            "transition-all duration-200",
                            isSubmenuItemActive(subItem.path)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-600"
                          )}
                        >
                          <span
                            className={cn(
                              "transition-colors duration-200",
                              isSubmenuItemActive(subItem.path)
                                ? "text-primary"
                                : "text-gray-500"
                            )}
                          >
                            {subItem.icon}
                          </span>
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || "#"}
                  className={cn(
                    "flex items-center rounded-lg",
                    "transition-all duration-200",
                    isMenuActive(item)
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-700 bg-white/50",
                    isCollapsed
                      ? "justify-center px-2 py-3"
                      : "space-x-3 px-4 py-3"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <span className="text-inherit">{item.icon}</span>
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
