import {io} from "socket.io-client";

const URL = "http://localhost:3001/chats";
const socket = io(URL, {
  autoConnect: false, extraHeaders: {
    'email': 'saranshinamallecath@gmail.com', 'user-unique-id': '5c585d9b-4dd1-4e74-a787-c0b681abd74c'
  }
});
socket.connect()
export default socket;
