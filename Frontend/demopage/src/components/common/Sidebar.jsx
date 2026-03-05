import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ORG_MENU } from "../../config/sidebar.org";
import "./Sidebar.css";
import { ROLE_PERMISSIONS } from "../../config/permission";
import {useUser } from "../../hooks/useUser"


export default function Sidebar() {
  const { role } = useAuth();
  const location = useLocation();
  const { user } = useUser();


  const [openKey, setOpenKey] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  // 🔥 Get full menu
  const fullMenu = ORG_MENU(role);
  console.log(user);
  // 🔥 STRICT ROLE-BASED FILTERING
  // If item.roles is missing OR role not included → hide
 const permissions = ROLE_PERMISSIONS[role] || [];

const menu = fullMenu
  .map((item) => {
    // 🔹 If item has children (Dropdown)
    if (item.children) {
      const allowedChildren = item.children.filter((child) =>
        permissions.includes(child.key)
      );

      // Show parent ONLY if at least one child allowed
      if (allowedChildren.length > 0) {
        return {
          ...item,
          children: allowedChildren,
        };
      }

      return null;
    }

    // 🔹 Normal item
    if (permissions.includes(item.key)) {
      return item;
    }

    return null;
  })
  .filter(Boolean);

  const isChildActive = (children) => {
  return children?.some(
    (child) => location.pathname === child.path
  );
};

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h2>{role} Platform</h2>}
        <button onClick={() => setCollapsed(!collapsed)}>☰</button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {menu.map((item) => (
          <li key={item.key}>
            {item.children ? (
              <>
                {/* Parent Dropdown */}
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

                {/* Dropdown Children */}
                {(openKey === item.key ||
                  isChildActive(item.children)) &&
                  !collapsed && (
                    <ul className="sidebar-submenu">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <NavLink
                            to={child.path}
                            end
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
              /* Normal Link */
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