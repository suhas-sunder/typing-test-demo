import axios from "axios";
import CurrentAPIVersion from "../utils/routing/CurrentAPIVersion";

const version = CurrentAPIVersion();
const timeout = 30000;

// Determine base url based on development or production mode
const baseURL =
  process.env.NODE_ENV === "production"
    ? `/${version}/api/score/`
    : `http://localhost:3500/${version}/api/score/`;

const instance = axios.create({
  baseURL,
  timeout,
});

export default instance;
