export const fetchChat = async (url, message) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch chat response");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching chat:", error);
      return { error: "Failed to fetch chat" };
    }
  };
  