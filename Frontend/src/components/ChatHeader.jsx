import { ArrowLeft, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Prevent rendering if no user is selected
  if (!selectedUser) return null;

  return (
    <div className="border-b border-base-300 bg-base-100/95 p-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle md:hidden"
            onClick={() => setSelectedUser(null)}
            aria-label="Back to conversations"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div className="avatar shrink-0">
            <div className="relative size-10 rounded-full">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName || "User"}
              />
              {onlineUsers?.includes(selectedUser?._id) && (
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-base-100" />
              )}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers?.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => setSelectedUser(null)}
          aria-label="Close conversation"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
