import apiClient from "../apiClient";

const postLogin = async (data: { email: string; password: string }) => {
    const res = await apiClient.post("/login", data);
    return res;
}

export default postLogin;
