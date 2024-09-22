import { useState } from "react";
import { User } from "../types/User";
import Nav from "./Nav";

type ProfileProps = {
    user: User
}

const Profile = ({ user }: ProfileProps) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0])
        }
        // const files = event.target?.files;
        // if (files && files.length > 0) {
        //     const file = files[0];
        //     console.log(file);
        //     setSelectedFile(file)
        //   } else {
        //     console.log("No file selected or input element missing.");
        //   }

    };

    const handleUpload = () => {
        if (selectedFile) {
            // Implement your file upload logic here
            console.log('Uploading file:', selectedFile);
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Nav user={user} />

            <div className="flex-grow flex flex-col items-center justify-center mt-16 p-6 relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload your Face</h2>
                <p className="text-gray-600 mb-6 text-center">
                    Please upload a clear image where your face is visible and the only face in the photo.
                    Supported formats: JPEG, PNG, BMP, TIFF, WebP.
                </p>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.bmp,.tiff,.webp"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    onClick={handleUpload}
                    className="bg-tertiary text-white px-6 py-3 rounded-md hover:bg-teri focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                    Upload
                </button>

                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-secondary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                </div>

            </div>
        </div>
    )
}

export default Profile;
