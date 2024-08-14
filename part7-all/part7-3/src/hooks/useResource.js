import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [baseUrl]);

  const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject);
      setResources(resources.concat(response.data));
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  return [resources, { create }];
};

export default useResource;
