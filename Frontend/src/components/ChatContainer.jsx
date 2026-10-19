import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages = [], 
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto bg-base-200/50 p-4">
        {Array.isArray(messages) && messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-sm rounded-lg border border-dashed border-base-300 bg-base-100/70 p-6">
              <p className="font-semibold">Start the conversation</p>
              <p className="mt-2 text-sm text-base-content/60">
                Send a message or share an image to begin chatting with {selectedUser.fullName}.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {Array.isArray(messages) && messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="ml-1 text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex max-w-[82vw] flex-col break-words md:max-w-md">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="mb-2 max-h-72 rounded-md object-cover sm:max-w-[240px]"
                  />
                )}
                {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
