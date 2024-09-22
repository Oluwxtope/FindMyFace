import apiClient from "../apiClient";

const postFaceRecognition = async (data: FormData) => {
    const res = await apiClient.post("/upload", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return res;
}

export default postFaceRecognition;
