import ApplicationBar from '../application-bar/ApplicationBar';
import BottomBar2 from '../application-bar/BottomBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';

const messages = [
    { id: 1, text: "Hello!", fromCurrentUser: false },
    { id: 2, text: "Hi! How are you?", fromCurrentUser: true },
    { id: 3, text: "I'm good, thanks! How about you?", fromCurrentUser: false },
    { id: 4, text: "I'm doing well too, thanks for asking!", fromCurrentUser: true }
  ];

export const UserChat = () => {
    const location = useLocation();
    const thread = location.state;
    return (
        <>
            <div className="h-screen bg-custom-c1">
                <ApplicationBar />
                <div className="flex flex-row h-16 bg-white">
                        < ArrowBackIosIcon style={{ width: "full", height: "full"}} />
                    <div className="w-1/4 flex justify-center items-center">
                        <img
                            className="rounded-full w-16 h-16 object-cover"
                            src={thread.profile_pic}
                            alt={`${thread.name} ${thread.last_name}`}
                        />
                    </div>

                    <div className="flex flex-col w-3/4 px-4" > 
                        {/* Header Section */}
                        <div className="flex items-center justify-between">
                            <div className="text-3xl text-custom-c4">
                                {thread.name} {thread.last_name}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.fromCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${message.fromCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
        <input
          type="text"
          value="ok"
          onChange={(e) => {}}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={()=> {console.log('x')}}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    
                <BottomBar2 active="chats" />
            </div>
        </>
    )
}