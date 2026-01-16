import io from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL);

export const socketListeners = {
  setupPollsUpdatedListener: (callback) => {
    socket.off("pollsUpdated");
    socket.on("pollsUpdated", callback);
  },

  setupVotesUpdatedListener: (callback) => {
    socket.off("updateVotes");
    socket.on("updateVotes", callback);
  },

  cleanupPollsUpdatedListener: () => {
    socket.off("pollsUpdated");
  },

  cleanupVotesUpdatedListener: () => {
    socket.off("updateVotes");
  },
};
