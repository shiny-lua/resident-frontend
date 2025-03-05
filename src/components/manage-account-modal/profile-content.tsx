import React from "react";

import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";
import Loader from "../loader";

const ProfileContent = () => {

    const [isUpdateProfile, setIsUpdateProfile] = React.useState(false)
    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(false)

    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const fetchUser = async () => {
        const resp = await restApi.postRequest("get-user")
        if (resp.status === 200) {
            const data = resp.data.data
            dispatch({ type: "user", payload: {
                id: data._id,
                email: data.email,
                fullName: data.full_name,
                pfp: data.pfp,
                isPasswordSet: data.is_password_set
            } })
        }
    }

    const onSaveProfile = async () => {
        if (isLoading) return
        const formData = new FormData();
        formData.append("file", uploadedFile as File);

        if (uploadedFile?.size && uploadedFile.size > 10 * 1024 * 1024) {
            showToast("File size must be less than 10MB.", "warning")
            return
        }

        setIsLoading(true)
        const res = await restApi.postRequest("upload-profile-picture", formData);
        if (res === undefined) {
            showToast("An error has occurred during communication with backend.", "warning")
        } else if (res.status === 200) {
            showToast("Profile picture updated successfully.", "success")
            setIsUpdateProfile(false)
            await fetchUser()
        } else {
            console.log(res)
            showToast(res.msg, "error")
        }
        setIsLoading(false)
    }

    const onRemoveProfile = async () => {
        const res = await restApi.postRequest("remove-profile-picture")
        if (res.status === 200) {
            showToast("Profile picture removed successfully.", "success")
            setIsUpdateProfile(false)
            await fetchUser()
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="text-md text-slate-800 font-semibold w-full lg:w-1/3">Profile</div>
            {!isUpdateProfile ? (<div className="flex justify-between items-center w-full lg:w-2/3 ml-0 lg:ml-6">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                className="rounded-full w-14 h-14"
                                alt="Profile preview"
                            />
                        ) : state.user?.pfp ? (
                            <img
                                crossOrigin="anonymous"
                                src={state.user.pfp}
                                className="rounded-full w-14 h-14"
                                title={state.user?.fullName}
                                alt={state.user?.fullName}
                            />
                        ) : (
                            <div className="relative rounded-full w-14 h-14 flex items-center justify-center">
                                <img src="/image/icons/user-bg.png" className="rounded-full w-full h-full" />
                                <div className="absolute text-white text-xl">
                                    {state.user?.fullName?.charAt(0)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={() => setIsUpdateProfile(true)} className="mr-0 sm:mr-3 lg:mr-0 text-slate-800 text-sm px-4 py-2 order-slate-200 border rounded-lg hover:bg-slate-200">
                    Update profile
                </button>
            </div>
            ) : (
                <div className="border rounded-lg shadow-4 p-6 w-full lg:w-2/3">
                    <div className="flex flex-col gap-4">
                        <div className="text-xl font-bold text-black">Update Profile</div>
                        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                            <div className="flex items-center">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        className="rounded-full w-14 h-14"
                                        alt="Profile preview"
                                    />
                                ) : state.user?.pfp ? (
                                    <img
                                        crossOrigin="anonymous"
                                        src={state.user.pfp}
                                        className="rounded-full w-14 h-14"
                                        title={state.user?.fullName}
                                        alt={state.user?.fullName}
                                    />
                                ) : (
                                    <div className="relative rounded-full w-14 h-14 flex items-center justify-center">
                                        <img src="/image/icons/user-bg.png" className="rounded-full w-full h-full" />
                                        <div className="absolute text-white text-xl">
                                            {state.user?.fullName?.charAt(0)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1">
                                    <button className="relative text-slate-800 text-sm px-3 py-2 border-slate-200 border rounded-lg hover:bg-slate-200">
                                        <input
                                            onChange={onFileUpload}
                                            accept=".png,.pjp,.jpg,.pjpeg,.jpeg,.jfif,.gif,.webp"
                                            type="file"
                                            title="upload file"
                                            className="zIndex-10 absolute bottom-0 left-0 right-0 top-0 cursor-pointer overflow-hidden opacity-0"
                                        />
                                        Upload
                                    </button>
                                    <button className="text-red-500 text-sm hover:bg-slate-200 px-3 py-2 rounded-md" onClick={onRemoveProfile}>Remove</button>
                                </div>
                                <div className="text-xs text-slate-600">Recommended size 1:1, up tp 10MB</div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center mt-1">
                            <button onClick={() => setIsUpdateProfile(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-md">Cancel</button>
                            <button onClick={onSaveProfile} className="w-20 inline-flex justify-center items-center gap-2 bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-sm px-5 py-2 rounded-md" disabled={isLoading}> {isLoading ? <Loader /> : "Save"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileContent;