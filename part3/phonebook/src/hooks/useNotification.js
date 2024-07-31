import { useState, useCallback } from "react";

const TIMEOUT = 8000;

const useNotification = () => {
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const handleNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: null }), TIMEOUT);
  }, []);

  return [notification, handleNotification];
};

export default useNotification;
