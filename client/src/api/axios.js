import axios from "axios";

let baseURL = "";

if (window.location.origin.includes("localhost")) {
  baseURL = "http://localhost:4000";
} else {
  baseURL = "https://ea-trading-server.onrender.com";
}

export default axios.create({
  baseURL,
});

export const getImageUrl = (imagePath) => {
  // Construct full URL for retrieving images
  return `${baseURL}/api/auth/${imagePath}`;
};
