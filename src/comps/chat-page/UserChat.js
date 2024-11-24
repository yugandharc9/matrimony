import ApplicationBar from '../application-bar/ApplicationBar';
import BottomBar2 from '../application-bar/BottomBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authctx';
import { useChannel } from '../../hooks/PhoenixHook';
import { useEffect,useState,useRef } from 'react';
import { getChatForProfile,sendMessageToUser } from '../../services/apiService';


  const getChannelName = (userID1, userID2) => {
    if (userID1 < userID2) {
      return `chat${userID1}:${userID2}`
    }
    return `chat${userID2}:${userID1}`
  }

  
export const UserChat = () => {
  const location = useLocation();
  const thread = location.state;
  const { token, userId } = useAuth();
  const [messages, setMessages] = useState([]);
  const [msgVal, setMsgVal] = useState("");
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null); // Ref for the observer
  const [offset, setOffset] = useState(0);

  const messageHandler = (state, { event, payload }) => {
    console.log("state", state);
    console.log("event", event);
    console.log("payload", payload);
    if(event == "") {  
      setMessages([...messages, {
        from: userId,
        inserted_at: "2022-07-26T16:40:05",
        message: msgVal,
     
    }]);
    }
  }

  const [stateMsg,broadcast] =  useChannel(
    getChannelName(thread.from_user, userId),
    messageHandler,
    [],
    token,
    userId
  );

  const getChat = async () => {
    try{
      const response = await getChatForProfile(token,thread.from_profile,offset)
      console.log("fullresp",response);
      console.log("resp",response.data.data);
      setMessages([...messages,...response.data.data]);
    } catch (e) {
      console.log("error is ",e) 
    } finally{

    } 
  }

  useEffect(() => {
    getChat();
  }, []);

  const connetChannel = () => {
  }

  const handleMsgValChange = (e) => {
    console.log(e.target.value);
    setMsgVal(e.target.value);
  }

  const sendMsg = async () => {
    try{
      const response = await sendMessageToUser(token,thread.from_user,msgVal);
      setMessages([...messages,{
        from: userId,
        inserted_at: "2022-07-26T16:40:05",
        message: msgVal,
     
    }]);
    } catch (e) {
      console.log("error is ",e) 
    } finally{

    } 
  }

  return (
    <>
      <div className="h-screen bg-custom-c1">
        <ApplicationBar />
        <div className="flex flex-row h-16 bg-white">
          < ArrowBackIosIcon style={{ width: "full", height: "full" }} />
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
                className={`flex ${message.to == userId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${message.to == userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={msgVal}
            onChange={handleMsgValChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMsg}
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