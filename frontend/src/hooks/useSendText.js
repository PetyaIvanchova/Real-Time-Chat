import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendText = () => {
  const [loadingText, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendText = async (text) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (res.ok) {
        setMessages([...messages, data]);
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loadingText, sendText };
};

export default useSendText;
