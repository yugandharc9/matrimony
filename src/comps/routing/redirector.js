import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Redirector = ({ completionStat }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!completionStat) return; // Guard against undefined completionStat

      console.log("final",completionStat);
    if(!completionStat?.profileCompletionStatus) {
      console.log("b2");
      navigate("/info");
    } else if (!completionStat?.profilePicStatus) {
      console.log("b3");
      navigate("/add-photos");
    } else if (!completionStat?.document_verification_pending && !completionStat?.document_verified) {
      console.log("b4");
      navigate("/doc-upload");
    } else if (completionStat?.daysToPayment <= 0) {
      console.log("b5");
      navigate("/subscriptions");
    }
  }, [completionStat, navigate]);

  return null; // No need to render anything
};

export default Redirector;
