import MainSidebar from './MainSidebar';
import TopHeader from './TopHeader';
import NavSidebar from './NavSidebar';
import '../styles/slack-layout.css';

const SlackLayout = ({
  chatClient,
  activeChannel,
  setActiveChannel,
  onCreateChannel,
  children
}) => {
  return (
    <div className="slack-layout">
      {/* Far Left Sidebar */}
      <MainSidebar />

      {/* Main Area (everything except far left sidebar) */}
      <div className="slack-layout__main">
        {/* Top Header */}
        <TopHeader />

        {/* Content Area (Nav Sidebar + Channel Content) */}
        <div className="slack-layout__content">
          {/* Nav Sidebar */}
          <NavSidebar
            chatClient={chatClient}
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
            onCreateChannel={onCreateChannel}
          />

          {/* Channel Content Area */}
          <div className="slack-layout__channel">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackLayout;