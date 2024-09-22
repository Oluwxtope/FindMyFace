import apiClient from "../apiClient";

const currentUser = async () => {
    const res = await apiClient.get("/@me");
    console.log(res);
    return res;
}

export default currentUser;
