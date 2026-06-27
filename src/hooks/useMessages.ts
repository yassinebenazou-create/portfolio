import { useEffect, useState } from "react";
import { messages as localMessages, type MessageData } from "@/data/messages";

export interface ContactMessage extends MessageData {}

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
        const storedMessages = typeof window !== 'undefined' ? window.localStorage.getItem('portfolio-messages') : null;
        const sourceMessages = storedMessages ? JSON.parse(storedMessages) : localMessages;
        const data = [...sourceMessages].sort((a: ContactMessage, b: ContactMessage) => (b.created_at || "").localeCompare(a.created_at || "")) as ContactMessage[];
        setMessages(data);
        setError(null);
      } catch (err) {
        const data = [...localMessages].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")) as ContactMessage[];
        setMessages(data);
        setError(err instanceof Error ? err.message : "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    }

    void fetchMessages();
  }, [refreshKey]);

  return { messages, loading, error, refresh };
}
