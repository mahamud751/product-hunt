"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import MenuItems from "./MenuItems";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const [activeSection, setActiveSection] = useState<string>("Dashboard"); // Track active top-level menu
  const [activeSubSection, setActiveSubSection] = useState<string>(""); // Track active submenu
  const pathname = usePathname();

  const toggleMenu = (label: string): void => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Sync active section/subsection with pathname on page load or navigation
  React.useEffect(() => {
    const currentItem = MenuItems.find((item) => item.path === pathname);
    if (currentItem) {
      setActiveSection(currentItem.label);
      setActiveSubSection("");
    } else {
      MenuItems.forEach((item) => {
        const subItem = item.subItems.find((sub) => sub.path === pathname);
        if (subItem) {
          setActiveSection(item.label);
          setActiveSubSection(subItem.label);
        }
      });
    }
  }, [pathname]);

  return (
    <aside
      className={`${
        sidebarCollapsed ? "w-16" : "w-64"
      } border-r border-gray-200 dark:border-gray-700 px-4 py-6 transition-all duration-300 ease-in-out relative bg-white dark:bg-gray-900`}
    >
      <div className="mb-8 flex items-center">
        <h1
          className={`text-xl font-bold text-content-light dark:text-content-dark ${
            sidebarCollapsed ? "hidden" : "block"
          }`}
        >
          LaunchPad
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {MenuItems.map((item) => (
            <li key={item.label}>
              {/* If item has submenus, make it a button; otherwise, a Link */}
              {item.subItems.length > 0 ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                    activeSection === item.label
                      ? "text-primary-500 bg-primary-50 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      activeSection === item.label ? "text-primary-500" : ""
                    }`}
                  />
                  <span className={`${sidebarCollapsed ? "hidden" : "block"}`}>
                    {item.label}
                  </span>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      className={`w-4 h-4 ml-auto transition-transform ${
                        expandedMenus[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.path}
                  onClick={() => {
                    setActiveSection(item.label);
                    setActiveSubSection("");
                  }}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                    activeSection === item.label && !activeSubSection
                      ? "text-primary-500 bg-primary-50 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      activeSection === item.label && !activeSubSection
                        ? "text-primary-500"
                        : ""
                    }`}
                  />
                  <span className={`${sidebarCollapsed ? "hidden" : "block"}`}>
                    {item.label}
                  </span>
                </Link>
              )}
              {item.subItems.length > 0 &&
                expandedMenus[item.label] &&
                !sidebarCollapsed && (
                  <ul className="ml-8 relative">
                    {/* Vertical timeline line spanning the entire list */}

                    {item.subItems.map((subItem, index) => (
                      <li
                        key={subItem.label}
                        className={`relative rounded-md ${
                          activeSubSection === subItem.label
                            ? "text-primary-500 bg-primary-50 dark:bg-gray-800"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Link
                          href={subItem.path} // Use subItem.path here
                          onClick={() => {
                            setActiveSection(item.label);
                            setActiveSubSection(subItem.label);
                          }}
                          className="flex items-center w-full rounded-lg transition-colors py-2 mt-1"
                        >
                          <div className="relative flex h-6 w-6 items-center justify-center">
                            {index === 0 && (
                              <div className="absolute -bottom-1/2 top-1/2 w-px bg-gray-300 dark:bg-gray-600" />
                            )}
                            {index > 0 && index < item.subItems.length - 1 && (
                              <>
                                <div className="absolute -top-1/2 bottom-1/2 w-px bg-gray-300 dark:bg-gray-600" />
                                <div className="absolute -bottom-1/2 top-1/2 w-px bg-gray-300 dark:bg-gray-600" />
                              </>
                            )}
                            {index === item.subItems.length - 1 &&
                              item.subItems.length > 1 && (
                                <div className="absolute -top-1/2 bottom-1/2 w-px bg-gray-300 dark:bg-gray-600" />
                              )}
                            <span className="relative h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                          </div>
                          <span className="ml-2 text-sm">{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </aside>
  );
};
