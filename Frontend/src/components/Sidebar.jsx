import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getUsers) getUsers();
  }, [getUsers]);

  const onlineContactsCount = users.filter((user) => onlineUsers.includes(user._id)).length;
  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) => user.fullName?.toLowerCase().includes(searchTerm.trim().toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-full flex-col border-base-300 transition-all duration-200 md:w-80">
      <div className="w-full border-b border-base-300 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <div>
              <h2 className="font-semibold leading-tight">Conversations</h2>
              <p className="text-xs text-base-content/60">
                {onlineContactsCount} online of {users.length}
              </p>
            </div>
          </div>
        </div>

        <label className="input input-bordered mt-4 flex h-10 items-center gap-2 rounded-lg">
          <Search className="size-4 text-base-content/40" />
          <input
            type="search"
            className="grow text-sm"
            placeholder="Search people"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setShowOnlineOnly(false)}
            className={`btn btn-sm flex-1 ${!showOnlineOnly ? "btn-primary" : "btn-ghost"}`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setShowOnlineOnly(true)}
            className={`btn btn-sm flex-1 ${showOnlineOnly ? "btn-primary" : "btn-ghost"}`}
          >
            Online
          </button>
        </div>
      </div>

      <div className="w-full flex-1 overflow-y-auto py-2">
        {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-base-200
              ${selectedUser?._id === user._id ? "bg-primary/10 text-primary" : ""}
            `}
          >
            <div className="relative shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName || "Contact"}
                className="size-12 rounded-full object-cover"
              />
              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-base-100" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-base-content">{user.fullName}</div>
              <div className="text-sm text-base-content/60">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="px-6 py-10 text-center">
            <Users className="mx-auto mb-3 size-8 text-base-content/30" />
            <p className="font-medium">No conversations found</p>
            <p className="mt-1 text-sm text-base-content/60">
              Try a different search or show all contacts.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
