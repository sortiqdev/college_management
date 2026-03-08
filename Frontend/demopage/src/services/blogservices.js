import API from "./api";

export const getAllBlogs = async () => {
  const response = await API.get("blog");
  return response.data;
};