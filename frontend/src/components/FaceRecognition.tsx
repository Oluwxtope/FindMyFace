import { useEffect, useState } from "react";
import postFaceRecognition from "../api/services/FaceRecognition.ts";
import { Base64Image } from "../types/Base64Image.ts";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

type FaceRecognitionProps = {
    selectedFace: FileList | null,
    selectedPhotos: FileList | null
}

const FaceRecognition = ({ selectedFace, selectedPhotos }: FaceRecognitionProps) => {
    const [submitFaceRecognition, setSubmitFaceRecognition] = useState<boolean>(false)
    const [base64Images, setBase64Images] = useState<Base64Image[]>([]);

    useEffect(() => {
        handleFaceRecognition();
    }, []);

    const filesList = (fileList: FileList) => {
        const files: File[] = Array.from(fileList);
        return files;
    };

    const handleDownloadImages = () => {
        const zip = new JSZip();
        console.log(base64Images);
        base64Images.forEach((image, index) => {
            const fileName = `image_${index + 1}.${image.type}`; // Use the format from the server
            zip.file(fileName, image.data, { base64: true });
        });

        zip.generateAsync({ type: 'blob' }).then((content) => {
            saveAs(content, 'images.zip');
        });
    };

    const handleFaceRecognition = () => {
        const data = new FormData();

        if (selectedFace) {
            filesList(selectedFace).forEach((face: File) => {
                data.append('face', face);
            });
        }

        if (selectedPhotos) {
            filesList(selectedPhotos).forEach((photo: File) => {
                data.append('photos', photo);
            });
        }

        postFaceRecognition(data)
            .then((res) => {
                setSubmitFaceRecognition(true);
                console.log(res)
                setBase64Images(res.data.images);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {
                submitFaceRecognition ? (
                    base64Images ? (
                        <div className="flex-grow flex flex-col items-center justify-center mt-16 p-6 relative">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                You've been found in {base64Images.length} images!
                            </h2>
                            <p className="text-gray-600 mb-6 text-center">
                                The images are ready to be downloaded. Click the button below to download.
                            </p>
                            <button
                                onClick={handleDownloadImages}
                                className="bg-tertiary text-white px-6 py-3 rounded-md hover:bg-teri focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                            >
                                Download Images
                            </button>
                        </div>
                    ) : (<div className="flex-grow flex flex-col items-center justify-center mt-16 p-6 relative">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            You've been found in 0 images!
                        </h2>
                    </div>)

                ) : (

                    <div role="status" className="flex-grow flex flex-col items-center justify-center">
                        <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>

                )
            }
        </>

    )

};

export default FaceRecognition;
