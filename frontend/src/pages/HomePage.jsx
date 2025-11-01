import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat.js";
import PageLoader from "../components/PageLoader";
import { UserButton } from "@clerk/clerk-react";


import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";

import "../styles/stream-chat-theme.css";
import CreateChannelModal from "../components/CreateChannelModal";
import CustomChannelHeader from "../components/CustomChannelHeader";
import SlackLayout from "../components/SlackLayout";

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { chatClient, error, isLoading } = useStreamChat();

  // set active channel from URL params
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error)
  {
    // console.log(error)
    return <p>Something went wrong...</p>;
  } 
  if (isLoading || !chatClient) return <PageLoader />;
// if (true) return <PageLoader />;

  return (
    <Chat client={chatClient}>
      <SlackLayout
        chatClient={chatClient}
        activeChannel={activeChannel}
        setActiveChannel={(channel) => {
          setActiveChannel(channel);
          setSearchParams({ channel: channel.id });
        }}
        onCreateChannel={() => setIsCreateModalOpen(true)}
      >
        <Channel channel={activeChannel}>
          <Window>
            <CustomChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </SlackLayout>

      {isCreateModalOpen && <CreateChannelModal onClose={() => setIsCreateModalOpen(false)} />}
    </Chat>
  );
};
export default HomePage;