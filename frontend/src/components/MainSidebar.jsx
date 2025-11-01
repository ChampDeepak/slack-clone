import { Home, MessageSquare, Bell, FileText, MoreHorizontal } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import '../styles/main-sidebar.css';

const MainSidebar = () => {
  const { user } = useUser();

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: MessageSquare, label: 'DMs', id: 'dms' },
    { icon: Bell, label: 'Activity', id: 'activity' },
    { icon: FileText, label: 'Files', id: 'files' },
    { icon: MoreHorizontal, label: 'More', id: 'more' },
  ];

  // Get user initials for avatar
  const getUserInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="main-sidebar">
      {/* Workspace Logo */}
      <div className="main-sidebar__workspace">
        <div className="workspace-logo">
          SS
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="main-sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="main-sidebar__nav-item"
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="nav-item-icon" />
              <span className="nav-item-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div className="main-sidebar__user">
        <div className="user-avatar">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="User avatar" />
          ) : (
            <span>{getUserInitial()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;