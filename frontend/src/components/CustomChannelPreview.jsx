import { HashIcon } from "lucide-react";
import '../styles/custom-channel-preview.css';

const CustomChannelPreview = ({ channel, setActiveChannel, activeChannel }) => {
  const isActive = activeChannel && activeChannel.id === channel.id;
  const isDM = channel.data.member_count === 2 && channel.data.id.includes("user_");

  if (isDM) return null;

  const unreadCount = channel.countUnread();

  return (
    <button
      onClick={() => setActiveChannel(channel)}
      className={`channel-preview-button ${isActive ? 'active' : ''}`}
    >
      <HashIcon className="channel-preview-icon" />
      <span className="channel-preview-name">{channel.data.id}</span>

      {unreadCount > 0 && (
        <span className="channel-preview-badge">
          {unreadCount}
        </span>
      )}
    </button>
  );
};
export default CustomChannelPreview;