import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendImage = () => {
  const [loadingImage, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendImage = async (base64) => {
    setLoading(true);

    try {
        const res = await fetch(
            `/api/messages/send/${selectedConversation._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ photo: base64 }),
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

  return { loadingImage, sendImage };
};

export default useSendImage;
