import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex min-h-screen items-center justify-center px-0 pt-16 sm:px-4 lg:px-8">
        <div className="h-[calc(100vh-4rem)] w-full overflow-hidden border-base-300 bg-base-100 shadow-xl sm:h-[calc(100vh-6rem)] sm:max-w-7xl sm:rounded-lg sm:border">
          <div className="flex h-full">
            <div
              className={`h-full shrink-0 border-r border-base-200 bg-base-100 ${
                selectedUser ? "hidden md:block" : "block w-full md:w-auto"
              }`}
            >
              <Sidebar />
            </div>

            <div className={`min-w-0 flex-1 flex-col ${selectedUser ? "flex" : "hidden md:flex"}`}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
