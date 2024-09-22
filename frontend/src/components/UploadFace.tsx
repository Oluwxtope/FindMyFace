type UploadFaceProps = {
    handleFaceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFaceUpload: () => void;
}

const UploadFace = ({ handleFaceChange, handleFaceUpload }: UploadFaceProps) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center mt-16 p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload your Face</h2>
            <p className="text-gray-600 mb-6 text-center">
                Please upload a clear image where your face is visible and the only face in the photo.
                Supported formats: JPEG, PNG, BMP, TIFF, WebP.
            </p>
            <input
                type="file"
                accept=".jpg,.jpeg,.png,.bmp,.tiff,.webp"
                onChange={handleFaceChange}
                className="mb-4"
            />
            <button
                onClick={handleFaceUpload}
                className="bg-tertiary text-white px-6 py-3 rounded-md hover:bg-teri focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
                Upload
            </button>
        </div>
    )
}

export default UploadFace;
