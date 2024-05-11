export const createParameters = (source: string, description?: string) => {
  return {
    docs: {
      description: {
        component: description,
      },
      source: {
        language: "tsx",
        code: source,
      },
    },
    storySource: {
      source,
    },
  };
};
