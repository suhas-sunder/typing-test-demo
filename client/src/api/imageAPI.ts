import axios from "axios";
import CurrentAPIVersion from "../utils/routing/CurrentAPIVersion";

const version = CurrentAPIVersion();
const timeout = 30000;

const baseURL =
  process.env.NODE_ENV === "production"
    ? `/${version}/api/images/`
    : `http://localhost:3500/${version}/api/images/`;

const instance = axios.create({
  baseURL,
  timeout,
});

export default instance;
