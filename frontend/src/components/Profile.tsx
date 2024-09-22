import { useEffect, useState } from "react";
import { User } from "../types/User";
import Nav from "./Nav";
import UploadFace from "./UploadFace";
import UploadPhotos from "./UploadPhotos";
import FaceRecognition from "./FaceRecognition";

type ProfileProps = {
    user: User
}

const Profile = ({ user }: ProfileProps) => {

    const [selectedFace, setSelectedFace] = useState<File | null>(null);
    const [faceUploaded, setFaceUploaded] = useState<boolean>(false);
    const [selectedPhotos, setSelectedPhotos] = useState<FileList | null>(null);
    const [photosUploaded, setPhotosUploaded] = useState<boolean>(false);

    useEffect(() => {

    }, [faceUploaded, photosUploaded])
    
    const handleFaceUpload = () => {
        if (selectedFace) {
            // Implement your file upload logic here
            console.log('Uploading file:', selectedFace);
            setFaceUploaded(true)

        } else {
            alert('Please select a file first.');
        }
    };

    const handleFaceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFace(event.target.files[0])
        }
    };

    const handlePhotosUpload = () => {
        if (selectedPhotos) {
            // Implement your file upload logic here
            console.log('Uploading file:', selectedFace);
            setPhotosUploaded(true);
        } else {
            alert('Please select a file first.');
        }
    };

    const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedPhotos(event.target.files)
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 px-6 py-12 lg:px-8">
            <Nav user={user} />
            {faceUploaded ? (
                photosUploaded ? (
                <FaceRecognition selectedFace={selectedFace} selectedPhotos={selectedPhotos}/>
                ) : (
                        <UploadPhotos handlePhotosChange={handlePhotosChange} handlePhotosUpload={handlePhotosUpload} setFaceUploaded={setFaceUploaded} />
                )
            ) : (
                <UploadFace handleFaceChange={handleFaceChange} handleFaceUpload={handleFaceUpload} />
            )}

        </div>
    )
}

export default Profile;
