// Mock Base44 client for local development
export const base44 = {
  auth: {
    me: async () => ({ full_name: "User", email: "user@example.com" }),
  },
  entities: {
    Conversation: {
      list: async () => [],
      get: async (id) => ({ id, title: "Chat", mode: "general", pinned: false }),
      create: async (data) => ({ id: Date.now(), ...data }),
      update: async (id, data) => ({ id, ...data }),
      delete: async (id) => true,
    },
    Message: {
      filter: async (query, sort, limit) => [],
      create: async (data) => ({ id: Date.now(), ...data }),
      deleteMany: async (query) => true,
    },
    Prompt: {
      list: async () => [],
    },
    Memory: {
      list: async () => [],
    },
  },
  integrations: {
    Core: {
      InvokeLLM: async ({ prompt }) => ({ response: "This is a simulated AI response." }),
      GenerateImage: async ({ prompt }) => ({ url: "https://via.placeholder.com/512" }),
      GenerateSpeech: async ({ text, voice }) => ({ url: "https://example.com/audio.mp3" }),
    },
  },
};
