import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-base-100 rounded-xl shadow-lg w-full max-w-7xl h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-80 border-r border-base-300">
              <Sidebar />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;