import API from "./api";

export const getAllBlogs = (page = 1, sort, category) => {
  return API.get("/api/auth/blog", {
    params: {
      page: page,
      sort: sort,
      category: category
    }
  });
};