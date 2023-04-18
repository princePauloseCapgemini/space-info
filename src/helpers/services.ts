import api from "./axios";

export const getSpacexData = async (query: string) => {
  const response = await api.post("/", {
    query,
    operationName: "ExampleQuery",
  });

  return response;
};
