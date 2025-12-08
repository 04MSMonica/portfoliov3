"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { generateRandomCursor } from "../lib/generate-random-cursor";

export type User = {
  socketId: string;
  name: string;
  color: string;
  pos: { x: number; y: number };
  location: string;
  flag: string;
};

export type Message = {
  socketId: string;
  content: string;
  time: Date;
  username: string;
};

export type UserMap = Map<string, User>;

type SocketContextType = {
  socket: Socket | null;
  users: UserMap;
  setUsers: Dispatch<SetStateAction<UserMap>>;
  msgs: Message[];
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  users: new Map(),
  setUsers: () => {},
  msgs: [],
});

type ProviderProps = {
  children: ReactNode;
};

const SocketContextProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<UserMap>(new Map());
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_WS_URL) {
      console.error("❌ Missing NEXT_PUBLIC_WS_URL");
      return;
    }

    const username =
      typeof window !== "undefined"
        ? localStorage.getItem("username") ||
          generateRandomCursor().name
        : generateRandomCursor().name;

    const s = io(process.env.NEXT_PUBLIC_WS_URL, {
      query: { username },
    });

    setSocket(s);

    s.on("msgs-receive-init", (msgs: Message[]) => {
      setMsgs(msgs);
    });

    s.on("msg-receive", (msg: Message) => {
      setMsgs((prev) => [...prev, msg]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, users, setUsers, msgs }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
