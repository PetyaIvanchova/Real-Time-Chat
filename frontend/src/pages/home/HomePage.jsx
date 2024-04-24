import EmojiContainer from "../../components/emoji/EmojiContainer";
import MessageContainer from "../../components/messages/MessageContainer";
import SideBar from "../../components/sidebar/SideBar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useConversation from "../../zustand/useConversation";

const HomePage = () => {
  const { showEmoji } = useConversation();
  const {addEmoji} = EmojiContainer();

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
      <SideBar />
      <MessageContainer />
      {showEmoji && (
        <div className="pt-20">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={28}
            onEmojiSelect={addEmoji}
            maxFrequentRows={0}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
