import { useNotification } from "../context/NotificationContext";

const Notification = () => {
  const { state } = useNotification();
  const { message, type } = state;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    color: type === "error" ? "red" : "green",
  };

  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
