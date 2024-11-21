import {io} from "socket.io-client";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}chats`;

let socket; // Menyimpan instance socket

export const initializeSocket = (email, userUniqueId) => {
  socket = io(URL, {
    autoConnect: false, extraHeaders: {
      email, "user-unique-id": userUniqueId,
    },
  });
  socket.connect(); // Hubungkan socket
  return socket;
};

export const getSocket = () => socket; // Untuk mengakses instance socket yang sudah dibuat
