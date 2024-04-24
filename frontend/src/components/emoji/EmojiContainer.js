import useConversation from "../../zustand/useConversation";

const EmojiContainer = () => {
    const {text, setText} = useConversation();

    const addEmoji = (e) => {
        const sym = e.unified.split("_");
        const codeArray = [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setText(text + emoji);
      };

    return {addEmoji}
}

export default EmojiContainer;