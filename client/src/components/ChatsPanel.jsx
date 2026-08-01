import { useAuth } from "../context/AuthContext.jsx";
import { useChats } from "../context/ChatsContext.jsx";

export const ChatsPanel = ({ topPadding = "pt-10" }) => {
  const { user } = useAuth();
  const { chats, currentChatId, createChat, deleteChat, selectChat, loading } =
    useChats();

  if (!user) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-10 ${topPadding}`}
      >
        <h3 className="text-2xl font-medium text-babylon-blue-dark">
          Your chats
        </h3>
        <p className="text-center text-lg font-medium text-babylon-blue-dark">
          Log in to manage chats.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full flex-col items-stretch gap-6 ${topPadding}`}
    >
      <h3 className="flex justify-center text-2xl font-medium text-babylon-blue-dark">
        Your chats
      </h3>
      <button
        type="button"
        onClick={() => createChat()}
        className="self-center rounded-3xl border-2 border-babylon-blue-dark bg-white px-4 py-1 text-sm font-semibold text-black hover:border-transparent hover:bg-babylon-blue-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-babylon-blue-dark focus:ring-offset-2"
      >
        + New chat
      </button>
      {loading && (
        <p className="text-center text-sm font-medium text-babylon-blue-dark">
          Loading…
        </p>
      )}
      {!loading && chats.length === 0 && (
        <p className="text-center text-sm font-medium text-babylon-blue-dark">
          No chats yet.
        </p>
      )}
      <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2">
        {chats.map((chat) => {
          const active = chat._id === currentChatId;
          return (
            <li
              key={chat._id}
              className={`flex items-center gap-2 rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl p-3 drop-shadow-lg ${
                active
                  ? "bg-babylon-blue-dark text-white dark:bg-babylon-blue-light"
                  : "bg-white text-black"
              }`}
            >
              <button
                type="button"
                onClick={() => selectChat(chat._id)}
                className="flex-1 truncate text-left text-sm font-medium"
              >
                {chat.title}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${chat.title}"?`)) deleteChat(chat._id);
                }}
                className={`text-sm font-bold ${
                  active ? "text-white" : "text-babylon-blue-dark"
                }`}
                aria-label="Delete chat"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
