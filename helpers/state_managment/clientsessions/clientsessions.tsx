import { create } from "zustand";

interface ClientPastSessionStory {
    clientPastSession: any[];
    setClientSession: (session: any[]) => void;  // This should be a type representing the shape of the session object.
}

export const clientSessionStorage = create<ClientPastSessionStory>((set) => ({
    clientPastSession: [],
    setClientSession: (session) => set({ clientPastSession: session }),
}));    