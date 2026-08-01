import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "./AuthContext.jsx";

const ChatsContext = createContext(null);

export const ChatsProvider = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setChats([]);
      setCurrentChatId(null);
      return;
    }
    setLoading(true);
    api
      .get("/api/chats")
      .then((list) => {
        setChats(list);
        if (list.length) setCurrentChatId(list[0]._id);
      })
      .catch(() => setChats([]))
      .finally(() => setLoading(false));
  }, [user]);

  const createChat = async (title) => {
    const chat = await api.post("/api/chats", { title });
    setChats((prev) => [chat, ...prev]);
    setCurrentChatId(chat._id);
    return chat;
  };

  const deleteChat = async (id) => {
    await api.delete(`/api/chats/${id}`);
    setChats((prev) => {
      const next = prev.filter((c) => c._id !== id);
      if (currentChatId === id) setCurrentChatId(next[0]?._id ?? null);
      return next;
    });
  };

  const updateChat = async (id, patch) => {
    const updated = await api.patch(`/api/chats/${id}`, patch);
    setChats((prev) => prev.map((c) => (c._id === id ? updated : c)));
    return updated;
  };

  const selectChat = (id) => setCurrentChatId(id);

  const currentChat = chats.find((c) => c._id === currentChatId) ?? null;

  return (
    <ChatsContext.Provider
      value={{
        chats,
        currentChat,
        currentChatId,
        loading,
        createChat,
        deleteChat,
        updateChat,
        selectChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChats = () => {
  const ctx = useContext(ChatsContext);
  if (!ctx) throw new Error("useChats must be used inside ChatsProvider");
  return ctx;
};
