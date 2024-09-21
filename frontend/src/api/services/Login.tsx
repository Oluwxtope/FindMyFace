import apiClient from "../apiClient";

const postLogin = async (data: { email: string; password: string }) => {
    const res = await apiClient.post("http://127.0.0.1:5000/login", data);
    return res;
}

export default postLogin;
