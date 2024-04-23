import { BsImage, BsSend } from "react-icons/bs";
import useSendText from "../../hooks/useSendText";
import { useState } from "react";
import useSendImage from "../../hooks/useSendImage";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { loadingText, sendText } = useSendText();
  const { loadingImage, sendImage} = useSendImage();

  const handleText = async () => {
	if(!text){
		return;
	}
	await sendText(text);
	setText("");
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;

    const base64 = await convertBase64(files[0]);
    sendImage(base64);
  };

  return (
    <div className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute inset-y-0 end-0 flex items-center pr-12 pe-10 cursor-pointer">
          <input
            className="opacity-0 overflow-hidden absolute font-bold text-white bg-black inline-blockcursor-pointer"
            type="file"
            onChange={uploadImage}
          />
		  
		  {loadingImage ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsImage color="white" />
          )}
          
        </div>
        <div
          onClick={handleText}
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loadingText ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend color="white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
