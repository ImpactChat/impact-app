console.log("Running", process.env.NODE_ENV, "version");

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://impact.tommcn.mcnamer.ca"
    : "http://localhost:8000";

const CODES_ENDPOINT = BASE_URL + "/api/codes/codes/";

export default {
  BASE_URL,
  CODES_ENDPOINT
};
