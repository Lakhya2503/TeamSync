import ky, { isHTTPError } from "ky";
export const baseUrl: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api/v1/teamsync";

export const apiClient = ky.create({
  prefix: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  fetch: async (input, init) => {
    console.log({
      input,
      init,
    });
    const response = await fetch(input, init);
    console.log("REQUEST  : ", input);
    console.log("RESPONSE : ", await response.clone().json());
    return response;
  },
});
