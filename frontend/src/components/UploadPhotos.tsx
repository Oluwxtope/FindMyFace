type UploadPhotosProps = {
    handlePhotosChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhotosUpload: () => void;
    setFaceUploaded: (uploaded: boolean) => void;
}

const UploadPhotos = ({ handlePhotosChange, handlePhotosUpload, setFaceUploaded }: UploadPhotosProps) => {
    const handleArrowClick = () => {
        setFaceUploaded(false);
    }
    
    return (
        <div className="flex-grow flex flex-col items-center justify-center mt-16 p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload your Photos</h2>
            <p className="text-gray-600 mb-6 text-center">
                Please upload your event photos.
                Supported formats: JPEG, PNG, BMP, TIFF, WebP.
            </p>
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <button
                    type="button"
                    onClick={handleArrowClick} // Replace with your actual click handler
                    className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 p-2 rounded-full hover:bg-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>

                </button>

            </div>
            <input
                type="file"
                accept=".jpg,.jpeg,.png,.bmp,.tiff,.webp"
                onChange={handlePhotosChange}
                multiple
                className="mb-4"
            />
            <button
                onClick={handlePhotosUpload}
                className="bg-tertiary text-white px-6 py-3 rounded-md hover:bg-teri focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
                Upload
            </button>
        </div>
    )
};

export default UploadPhotos;
