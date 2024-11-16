export const Redirector = (completionStat, navigate) => {
  if (!completionStat) return; // Guard clause

  console.log('Navigation inputs ', completionStat);
  if(completionStat?.error == "invalid_token"){ 
    navigate("/login");
    return
  }
  if (!completionStat.profileCompletionStatus || completionStat.noprofile) {
    console.log("Navigating to /info");
    navigate("/info");
  } else if (!completionStat.document_verification_pending && !completionStat.document_verified) {
    console.log("Navigating to /upload/doc");
    navigate("/upload/doc");
  } else if (!completionStat.profilePicStatus) {
    console.log("Navigating to /upload/pics");
    navigate("/upload/pics");
  } else if (completionStat.daysToPayment <= -1) {
    console.log("Navigating to /subscription");
    navigate("/subscription");
  } else {
    console.log("Navigating to /profiles");
    navigate("/profiles");
  }
};
