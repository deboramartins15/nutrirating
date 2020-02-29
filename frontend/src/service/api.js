import { create } from "apisauce";

const Api = create({
  baseURL: "http://localhost:3001"
});

Api.addAsyncRequestTransform(request => async () => {
  const token = await localStorage.getItem("@nutrirating:token");

  if (token) request.headers["Authorization"] = `Bearer ${token}`;
});

Api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default Api;
