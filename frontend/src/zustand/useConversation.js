import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
    showEmoji: false,
    setShowEmoji: (showEmoji) => set({showEmoji}),
    text: "",
    setText: (text) => set({text})
}))

export default useConversation;