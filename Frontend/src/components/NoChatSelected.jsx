import { MessageSquare, Search, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-base-200/50 p-8">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2 text-left">
          <div className="rounded-lg border border-base-300 bg-base-100 p-4">
            <Search className="mb-2 size-5 text-primary" />
            <p className="text-sm font-medium">Find people fast</p>
            <p className="mt-1 text-xs text-base-content/60">Search by contact name.</p>
          </div>
          <div className="rounded-lg border border-base-300 bg-base-100 p-4">
            <Users className="mb-2 size-5 text-primary" />
            <p className="text-sm font-medium">See availability</p>
            <p className="mt-1 text-xs text-base-content/60">Filter active users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
