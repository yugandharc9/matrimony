import React from "react";



const goToChat = (profileId)  => {
  console.log('goint to chat',profileId);
};

// ChatThread Component
const ChatThread = ({ thread }) => {
  return (
        <div className="flex flex-row">
    <div class="p-4 bg-blue-500">{thread.name}</div>
  <div class="p-4 bg-green-500">{thread.lastName}</div>
  <div class="p-4 bg-red-500">{thread.unread_count}</div>
        </div>      
  );
};

export default ChatThread;

/*
        <div key={thread.id} className={`chat-thread ${thread.unread > 0 ? "unread" : ""}`} onClick={() => goToChat(thread.from_profile)} >
          <div className="chat-thread-header">
            <span className="sender-name">{thread.name} {thread.lastName}</span>
            {thread.unread_count > 0 && (
              <span className="unread-count">{thread.unread_count}</span>
            )}
          </div>
          <div className="latest-message">{thread.last_message}</div>
        </div>      

*/