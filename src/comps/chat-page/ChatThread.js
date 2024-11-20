import React from "react";
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";


// ChatThread Component
const ChatThread = ({ thread }) => {
  const navigate = useNavigate();


  const goToChat = (thread) => {
    navigate("/chat", { state: thread });
  };

  return (
    <>
      <div className="flex h-auto w-1/2 border-r-12 border-custom-c2 bg-custom-c1">
        {/* Profile Picture Section */}
        <div className="w-1/4 flex justify-center items-center">
          <img
            className="rounded-full w-16 h-16 object-cover"
            src={thread.profile_pic}
            alt={`${thread.name} ${thread.last_name}`}
          />
        </div>

        {/* Thread Details Section */}
        <div className="flex flex-col w-3/4 px-4" onClick={() => { goToChat(thread) }} >
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="text-3xl text-custom-c4">
              {thread.name} {thread.last_name}
            </div>
            <Badge
              badgeContent={thread.unread_count}
              sx={{
                '& .MuiBadge-badge': {},
              }}
              color="primary"
            />
          </div>

          {/* Message Preview Section */}
          <div className="mt-2 text-sm text-custom-c4 overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-2">
            <MailIcon />
            <span>{thread.last_message}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-1/2 border-custom-c2" />
    </>

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