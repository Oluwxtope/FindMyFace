import apiClient from "../apiClient";

const postLogout = async () => {
    const res = await apiClient.post("/logout");
    return res;
}

export default postLogout;
