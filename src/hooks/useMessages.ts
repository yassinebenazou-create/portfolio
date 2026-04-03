import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at?: string;
}

export function useMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    setLoading(true);

    async function fetchMessages() {
      try {
        const q = query(collection(db, "messages"), orderBy("created_at", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactMessage[];
        setMessages(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    }

    void fetchMessages();
  }, [refreshKey]);

  return { messages, loading, error, refresh };
}
