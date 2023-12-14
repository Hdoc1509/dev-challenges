const searchResults = ["London", "Barcelona", "Long Beach"];

export const getLocations = async (search: string) => {
  console.log({ search });
  return Promise.resolve(
    searchResults.filter((r) => r.toLowerCase().includes(search.toLowerCase())),
  );
};
