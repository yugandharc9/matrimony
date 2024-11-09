
import { Store } from 'react-notifications-component';


const showNotification = (type,title,msg,duration) => {
        Store.addNotification({
            title: title,
            message: msg,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: duration,
              onScreen: true
            }
          });
}

export default showNotification;
          