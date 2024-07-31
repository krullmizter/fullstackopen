import { useState } from "react";

const TIMEOUT = 8000;

const useNotification = () => {
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const handleNotification = (type, message) => {
    const sanitizedMessage = message.replace(/<[^>]*>?/gm, '');
    setNotification({ type, message: sanitizedMessage });
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, TIMEOUT);
  };

  return [notification, handleNotification];
};

export default useNotification;
