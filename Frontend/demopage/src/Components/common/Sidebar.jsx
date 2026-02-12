import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";

import { MASTER_MENU } from "../../config/sidebar.master";
import { SUPERADMIN_MENU } from "../../config/sidebar.superadmin";
import { ADMIN_MENU } from "../../config/sidebar.admin";
import { ORG_MENU } from "../../config/sidebar.org";

import "./Sidebar.css";

export default function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();

  const [openKey, setOpenKey] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  let menu = [];

  if (role === "master") menu = MASTER_MENU;
  else if (role === "superadmin") menu = SUPERADMIN_MENU;
  else if (role === "admin") menu = ADMIN_MENU;
  else menu = ORG_MENU;

  const isChildActive = (children) => {
    return children?.some((child) =>
      location.pathname === child.path
    );
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h2>MyPlatform</h2>}
        <button onClick={() => setCollapsed(!collapsed)}>☰</button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li key={item.key}>
            
            {item.children ? (
              <>
                <div
                  onClick={() =>
                    setOpenKey(openKey === item.key ? null : item.key)
                  }
                  className={`sidebar-parent ${
                    isChildActive(item.children) ? "active" : ""
                  }`}
                >
                  <span className="icon">
                    {item.icon && <item.icon size={18} />}
                  </span>

                  {!collapsed && <span>{item.label}</span>}
                </div>

                {(openKey === item.key ||
                  isChildActive(item.children)) &&
                  !collapsed && (
                    <ul className="sidebar-submenu">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
              </>
            ) : (
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-link active"
                    : "sidebar-link"
                }
              >
                <span className="icon">
                  {item.icon && <item.icon size={18} />}
                </span>

                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
