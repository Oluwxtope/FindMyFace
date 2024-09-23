import apiClient from "../apiClient";

const postRegisterUser = async (email: string, password: string) => {
    const data = {"email": email, "password": password}
    const res = await apiClient.post("/register", data)
    return res;
}

export default postRegisterUser;
