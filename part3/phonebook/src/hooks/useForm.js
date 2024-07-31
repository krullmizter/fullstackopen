import { useState, useCallback } from "react";

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  return [formState, handleChange, resetForm];
};

export default useForm;
