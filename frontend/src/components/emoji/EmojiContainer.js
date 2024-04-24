import useSendText from "../../hooks/useSendText";
import { useState } from "react";

const EmojiContainer = () => {
    const [showEmoji, setShowEmoji] = useState(false);
    const {setText} = useSendText();

    const addEmoji = (e) => {
        const sym = e.unified.split("_");
        const codeArray = [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setText(text + emoji);
      };

    return {showEmoji, setShowEmoji, addEmoji}
}

export default EmojiContainer;