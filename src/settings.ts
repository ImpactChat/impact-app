const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://impact.tommcn.mcnamer.ca"
    : "http://localhost:8000";

console.log("PROCESS ENV", process.env.NODE_ENV);

const CODES_ENDPOINT = BASE_URL + "/api/codes/codes";

export default {
  BASE_URL,
  CODES_ENDPOINT
};
