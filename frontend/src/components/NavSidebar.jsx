import { ChevronDown, Edit, Headphones, Book, Hash, Users } from 'lucide-react';
import { useState } from 'react';
import { ChannelList } from 'stream-chat-react';
import CustomChannelPreview from './CustomChannelPreview';
import UsersList from './UsersList';
import '../styles/nav-sidebar.css';

const NavSidebar = ({
  chatClient,
  activeChannel,
  setActiveChannel,
  onCreateChannel
}) => {
  const [showChannels, setShowChannels] = useState(true);
  const [showDMs, setShowDMs] = useState(true);
  const [showStarred, setShowStarred] = useState(true);

  const workspaceName = "Scaler School Of Tech...";

  return (
    <div className="nav-sidebar">
      {/* Workspace Header */}
      <div className="nav-sidebar__header">
        <button className="workspace-selector">
          <span className="workspace-name">{workspaceName}</span>
          <ChevronDown className="workspace-icon" />
        </button>
        <button
          className="new-message-btn"
          aria-label="New message"
          title="New message"
        >
          <Edit className="edit-icon" />
        </button>
      </div>

      {/* Navigation Content */}
      <div className="nav-sidebar__content">
        {/* Quick Actions */}
        <div className="nav-section">
          <button className="nav-item">
            <Headphones className="nav-item-icon" />
            <span>Huddles</span>
          </button>
          <button className="nav-item">
            <Book className="nav-item-icon" />
            <span>Directories</span>
          </button>
        </div>

        {/* Starred Section */}
        <div className="nav-section">
          <button
            className="section-header"
            onClick={() => setShowStarred(!showStarred)}
          >
            <ChevronDown
              className={`section-header-icon ${!showStarred ? 'collapsed' : ''}`}
            />
            <span className="section-header-text">Starred</span>
          </button>
          {showStarred && (
            <div className="section-content">
              <div className="starred-placeholder">
                Drag and drop important stuff here
              </div>
            </div>
          )}
        </div>

        {/* Channels Section */}
        <div className="nav-section">
          <button
            className="section-header"
            onClick={() => setShowChannels(!showChannels)}
          >
            <ChevronDown
              className={`section-header-icon ${!showChannels ? 'collapsed' : ''}`}
            />
            <span className="section-header-text">Channels</span>
          </button>
          {showChannels && chatClient && (
            <div className="section-content">
              <ChannelList
                filters={{
                  type: 'messaging',
                  members: { $in: [chatClient.user?.id] }
                }}
                options={{ state: true, watch: true }}
                Preview={({ channel }) => (
                  <CustomChannelPreview
                    channel={channel}
                    activeChannel={activeChannel}
                    setActiveChannel={setActiveChannel}
                  />
                )}
                List={({ children, loading, error }) => (
                  <div className="channels-list">
                    {loading && <div className="loading-text">Loading...</div>}
                    {error && <div className="error-text">Error loading channels</div>}
                    {children}
                  </div>
                )}
              />
            </div>
          )}
        </div>

        {/* Direct Messages Section */}
        <div className="nav-section">
          <button
            className="section-header"
            onClick={() => setShowDMs(!showDMs)}
          >
            <ChevronDown
              className={`section-header-icon ${!showDMs ? 'collapsed' : ''}`}
            />
            <span className="section-header-text">Direct messages</span>
          </button>
          {showDMs && (
            <div className="section-content">
              <UsersList activeChannel={activeChannel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;