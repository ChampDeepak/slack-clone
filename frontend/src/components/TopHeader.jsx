import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, Headphones, MoreVertical } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import '../styles/top-header.css';

const TopHeader = ({ workspaceName = "Scaler School Of Technology" }) => {
  const { user } = useUser();

  return (
    <div className="top-header">
      {/* Left Side - Navigation Arrows */}
      <div className="top-header__left">
        <button className="top-header__nav-btn" aria-label="Back" disabled>
          <ArrowLeft className="icon-disabled" />
        </button>
        <button className="top-header__nav-btn" aria-label="Forward" disabled>
          <ArrowRight className="icon-disabled" />
        </button>
      </div>

      {/* Center - Search Bar */}
      <div className="top-header__center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder={`Search ${workspaceName}`}
            className="search-input"
          />
          <button className="search-filter-btn" aria-label="Search filters">
            <SlidersHorizontal className="filter-icon" />
          </button>
        </div>
      </div>

      {/* Right Side - Actions & User */}
      <div className="top-header__right">
        <div className="notification-badge">94</div>

        {user?.imageUrl && (
          <div className="top-header__avatar">
            <img src={user.imageUrl} alt="User" />
          </div>
        )}

        <button className="huddle-btn" aria-label="Start a huddle">
          <Headphones className="huddle-icon" />
          <span>Huddle</span>
        </button>

        <button className="more-btn" aria-label="More options">
          <MoreVertical className="more-icon" />
        </button>
      </div>
    </div>
  );
};

export default TopHeader;