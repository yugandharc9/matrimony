import React, { useEffect, useState, useRef } from 'react';
import ApplicationBar from '../application-bar/ApplicationBar';
import BottomBar2 from '../application-bar/BottomBar';
import { useAuth } from '../auth/authctx';
import { getChatThreadForUser, listPendingChatRequest,getInvites } from '../../services/apiService';
import ChatThread from './ChatThread';
import ProfileCard from '../profile-card/profileCard';


const ChatPage = () => {
  const [threads, setThreads] = useState([]);
  const [invites, setInvites] = useState([]);
  const [sent, setSent] = useState([]);
  const [current, setCurrent] = useState("chats")
  const { token } = useAuth();
  const [hasMore, setHasMore] = useState(null);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null); // Ref for the observer
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const handleCurrent = (current) => {
    setCurrent(current);
  };


  const loadChatThreads = async () => {
    console.log('loadignChatTHrada');
    if (loading || (hasMore != null && !hasMore)) {
      console.log('returning due to loading');
      return
    }
    try {
      setLoading(true);
      const response = await getChatThreadForUser(token, limit, offset);
      console.log('response ', response);
      setThreads([...threads, ...response.data.data]);
      setHasMore(offset < response.data.total);
      if (hasMore) {
        incrementOffset(offset);
      }
    } catch (e) {
      console.log('e is e', e);
    } finally {
      setLoading(false);
    }
  }

  const loadInvites = async () => {
    if (loading) {
      console.log('returning due to loading');
      return
    }
    try {
      setLoading(true);
      const response = await getInvites(token);
      console.log('response ', response);
      setInvites([...invites, ...response.data.data]);
    } catch (e) {
      console.log('e is e', e);
    } finally {
      setLoading(false);
    }
  }

  const loadSent = async () => {
    if (loading) {
      console.log('returning due to loading');
      return
    }
    try {
      setLoading(true);
      const response = await listPendingChatRequest(token);
      console.log('response ', response);
      setSent([...sent, ...response.data.data]);
    } catch (e) {
      console.log('e is e', e);
    } finally {
      setLoading(false);
    }
  }


  const incrementOffset = (prev) => { console.log('prev limit', prev, limit);; setOffset(prev + limit); };

  useEffect(() => {
    if (current == "chats") {
      loadChatThreads();
      incrementOffset(offset);
    } else if (current == "requests") {
      loadInvites();
    } else if (current == "sent") {
      loadSent();
    }
  }, [current])

  useEffect(() => {
    //checkCompletion();
    console.log('offset is', offset);
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('entries', entries);
        if (entries[0].isIntersecting) {
          console.log("loading more");
          loadChatThreads();
        }
      },
      { threshold: 1.0 } // Fully visible element triggers
    );
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // Cleanup
    };

  }, [offset, hasMore, loading]);

  return (
    <div className="h-screen overflow-auto">
      <ApplicationBar />
      <div className="flex space-x-0">
        {current == "chats" ? (<>
          <div className="flex-1 bg-custom-c2 text-custom-c1 p-4 border-custom-c2 shadow-custom-c2 shadow-lg" >Chats</div>
        </>) : (<>
          <div className="flex-1 bg-custom-c1 text-custom-c2 border-2 p-4 border-custom-c2 shadow-custom-c2 shadow-lg" onClick={() => { handleCurrent("chats") }}>Chats</div>
        </>)}
        {current == "requests" ? (<>
          <div className="flex-1 bg-custom-c2 text-custom-c1 p-4 border-custom-c2 shadow-custom-c2 shadow-lg"  >Requests</div>
        </>) : (<>
          <div className="flex-1 bg-custom-c1 text-custom-c2 border-2 p-4 border-custom-c2 shadow-custom-c2 shadow-lg " onClick={() => { handleCurrent("requests") }}>Requests</div>
        </>)}
        {current == "sent" ? (<>
          <div className="flex-1 bg-custom-c2 text-custom-c1 p-4 border-custom-c2 shadow-custom-c2 shadow-lg"  >Sent</div>
        </>) : (<>
          <div className="flex-1 bg-custom-c1 text-custom-c2 border-2 border-custom-c2 shadow-custom-c2 shadow-lg p-4" onClick={() => { handleCurrent("sent") }}>Sent</div>
        </>)}
      </div>
      <div className="min-h-screen pb-20 bg-custom-c1 flex flex-wrap justify-center gap-limit">

     { current == "chats" &&
      <div className="fix flex-col justify-center items-center gap-x-8">
       { current=="chats" && <> {threads.map((thread, index) => (
          <>
            <ChatThread thread={thread} />
            {index == threads.length - 1 && (<div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />)}
          </>
        ))} </>
      }
    </div>
     }

       { current=="requests" && <> {invites.map((profile, index) => (
          <> 
            <ProfileCard
              key={index}
              name={profile.name}
              age={profile.age}
              lastName={profile.lastName}
              current_city={profile.current_city}
              occupation={profile.occupation}
              education={profile.education}
              height_ft={profile.height_ft}
              work={profile.work}
              pic={profile.pics}
              aboutme={profile.aboutme}
              pics={profile.pics}
              degree={profile.degree}
              totalpoints={null}
              points={profile.points}
              userID={profile.user_id}
              profileID={profile.id}
              context="chatRequests"
            />
          </>
        ))} </>
      }
     
       { current=="sent" && <> {sent.map((profile, index) => (
          <> 
            <ProfileCard
              key={index}
              name={profile.name}
              age={profile.age}
              lastName={profile.lastName}
              current_city={profile.current_city}
              occupation={profile.occupation}
              education={profile.education}
              height_ft={profile.height_ft}
              work={profile.work}
              pic={profile.pics}
              aboutme={profile.aboutme}
              pics={profile.pics}
              degree={profile.degree}
              totalpoints={null}
              points={profile.points}
              userID={profile.user_id}
              profileID={profile.id}
              context="interets"
            />
          </>
        ))} </>
      }
      </div>
      <BottomBar2 active="chats" />
    </div>
  );
};

export default ChatPage;
