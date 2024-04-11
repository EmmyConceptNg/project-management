import axios from "axios";

let baseURL = "";

if (window.location.origin.includes("localhost")) {
  baseURL = "http://localhost:9000";
} else {
  baseURL = "https://project-management-0s5a.onrender.com";
}

export default axios.create({
  baseURL,
});

export const getImageUrl = (imagePath) => {
  // Construct full URL for retrieving images
  return `${baseURL}/api/user/${imagePath}`;
};
