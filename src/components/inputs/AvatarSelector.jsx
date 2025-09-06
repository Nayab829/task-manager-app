import { useState } from "react";
import { LuDownload, LuTrash } from "react-icons/lu";

function AvatarSelector({ avatar, setAvatar }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file)
        if (file) {
            setPreview(URL.createObjectURL(file)); // preview dikhane ke liye


        }
    };
    const handleDeleteFile = () => {
        setAvatar(null)
        setPreview(null)
    }

    return (
        <div className="p-4 flex items-center justify-center flex-col">
            <div className="w-24 h-24 border border-gray-200 cursor-pointer rounded-full relative ">
                {preview && (
                    <img src={preview} alt="avatar preview" className="w-full h-full rounded-full  object-cover" />
                )}
                {/* Upload button (label ke andar) */}
                {!preview && (
                    <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
                    >
                        <LuDownload size={20} />
                    </label>
                )}

                {/* Delete button (label ke bahar) */}
                {preview && (
                    <button
                        type="button"
                        onClick={handleDeleteFile}
                        className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                    >
                        <LuTrash size={20} />
                    </button>
                )}

            </div>

            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}

export default AvatarSelector;
