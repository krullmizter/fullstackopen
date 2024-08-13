import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    display: notification ? "block" : "none",
    animation: notification ? "fadeInOut 5s" : "",
  };

  return (
    <div className="notification" style={style}>
      {notification}
    </div>
  );
};

export default Notification;
