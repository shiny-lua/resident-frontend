import React from "react";

import { useGlobalContext } from "../../context";
import { showToast, strongPasswordValidator } from "../../context/helper";
import Icon from "../icon";
import Loader from "../loader";
import { restApi } from "../../context/restApi";
const Password = () => {
    const [isUpdatePassword, setIsUpdatePassword] = React.useState(false)

    const [state, { dispatch }]: GlobalContextType = useGlobalContext();
    const [isLoading, setIsLoading] = React.useState(false)
    const [status, setStatus] = React.useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        isPasswordMatch: {
            status: false,
            msg: ""
        },
        isStrongPassword: {
            status: false,
            msg: ""
        }
    })

    const [isShowPassword, setIsShowPassword] = React.useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const newValue = e.target.value;
        const fieldName = e.target.name;

        setStatus(prevStatus => {
            const newStatus = { ...prevStatus, [fieldName]: newValue };

            if (fieldName === "newPassword") {
                return {
                    ...newStatus,
                    isStrongPassword: strongPasswordValidator(newValue),
                    isPasswordMatch: {
                        status: newValue === prevStatus.confirmPassword,
                        msg: newValue === prevStatus.confirmPassword ? "" : "Password does not match"
                    }
                };
            }

            if (fieldName === "confirmPassword") {
                return {
                    ...newStatus,
                    isPasswordMatch: {
                        status: prevStatus.newPassword === newValue,
                        msg: prevStatus.newPassword === newValue ? "" : "Password does not match"
                    }
                };
            }

            return newStatus;
        });
    }

    const onSavePassword = async () => {
        if (isLoading) return
        if (state.user.isPasswordSet && status.currentPassword === "") {
            showToast("Current password is required", "warning")
            return
        } else if (status.newPassword === "") {
            showToast("New password is required", "warning")
            return
        } else if (status.confirmPassword === "") {
            showToast("Confirm password is required", "warning")
            return
        } else if (status.newPassword !== status.confirmPassword) {
            showToast("Password does not match", "warning")
            return
        } else if (!status.isStrongPassword.status) {
            showToast("Password is not strong", "warning")
        } else {
            setIsLoading(true)
            const res = await restApi.postRequest("update-password", {
                current_password: status.currentPassword,
                new_password: status.newPassword,
                confirm_password: status.confirmPassword
            })
            if (res.status === 200) {
                showToast("Password updated successfully", "success")
                setIsUpdatePassword(false)
                setStatus({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                    isPasswordMatch: { status: false, msg: "" },
                    isStrongPassword: { status: false, msg: "" }
                })
                await fetchUser()
            }
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    const fetchUser = async () => {
        const res = await restApi.postRequest("get-user")
        if (res.status === 200) {
            const data = res.data.data
            dispatch({
                type: "user", payload: {
                    id: data._id,
                    email: data.email,
                    fullName: data.full_name,
                    pfp: data.pfp,
                    isPasswordSet: data.is_password_set,
                    isPremium: data.is_premium
                }
            })
        }
    }

    return (
        <div className="">
            <div className="flex flex-col lg:flex-row gap-2 w-full">
                <div className="text-md text-slate-800 font-semibold w-full sm:w-1/3 sm:min-w-[200px]">Password</div>
                <div className={`flex justify-between items-start w-full sm:w-2/3 `}>
                    {!isUpdatePassword && (
                        <div className="w-full">
                            {state.user.isPasswordSet ? (
                                <div className="flex justify-between items-center w-full">
                                    <div className="text-black text-lg font-semibold ">••••••••••</div>
                                    <button onClick={() => setIsUpdatePassword(true)} className="text-slate-800 text-sm px-4 py-2 order-slate-200 border rounded-lg hover:bg-slate-200">
                                        Update password
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setIsUpdatePassword(true)} className="text-slate-800 text-sm px-4 py-2 order-slate-200 border rounded-lg hover:bg-slate-200">
                                    Add password
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isUpdatePassword && (
                <div className="border w-full rounded-lg shadow-4 p-6 pb-4 mt-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-xl font-bold text-black mb-2">{state.user.isPasswordSet ? "Update password" : "Add password"}</div>
                            {state.user.isPasswordSet && (
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm text-black">Current password</div>
                                    <div className="relative">
                                        <input type={isShowPassword.currentPassword ? "text" : "password"} className="border-sky-200 w-full text-sm outline-none focus:border-sky-500 border rounded-lg p-2" placeholder="Current password" name="currentPassword" value={status.currentPassword} onChange={e => onStatusChange(e)} />
                                        <div onClick={() => setIsShowPassword({ ...isShowPassword, currentPassword: !isShowPassword.currentPassword })} className="absolute right-2 top-1/2 -translate-y-1/2">
                                            <img width={14} height={24} src={`/image/icons/${isShowPassword.currentPassword ? "visible" : "invisible"}.svg`} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-black">New password</div>
                                <div className="relative">
                                    <input type={isShowPassword.newPassword ? "text" : "password"} className="border-sky-200 w-full text-sm outline-none focus:border-sky-500 border rounded-lg p-2" placeholder="New password" name="newPassword" value={status.newPassword} onChange={e => onStatusChange(e)} />
                                    <div onClick={() => setIsShowPassword({ ...isShowPassword, newPassword: !isShowPassword.newPassword })} className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <img width={14} height={24} src={`/image/icons/${isShowPassword.newPassword ? "visible" : "invisible"}.svg`} alt="" />
                                    </div>
                                </div>
                                {!status.isStrongPassword.status && (
                                    <div className="flex items-center gap-1">
                                        {status.isStrongPassword.msg && <Icon icon="Info" className="text-red-500" />}
                                        <div className="text-orange-500 text-[13px]">{status.isStrongPassword.msg}</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-sm text-black">Confirm password</div>
                                <div className="relative">
                                    <input type={isShowPassword.confirmPassword ? "text" : "password"} className="border-sky-200 w-full text-sm outline-none focus:border-sky-500 border rounded-lg p-2" placeholder="Confirm password" name="confirmPassword" value={status.confirmPassword} onChange={e => onStatusChange(e)} />
                                    <div onClick={() => setIsShowPassword({ ...isShowPassword, confirmPassword: !isShowPassword.confirmPassword })} className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <img width={14} height={14} src={`/image/icons/${isShowPassword.confirmPassword ? "visible" : "invisible"}.svg`} alt="" />
                                    </div>
                                </div>
                                {!status.isPasswordMatch.status && (
                                    <div className="flex items-center gap-1">
                                        {status.isPasswordMatch.msg && <Icon icon="Info" className="text-red-500" />}
                                        <div className="text-orange-500 text-[13px]">{status.isPasswordMatch.msg}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                />
                                <div className="text-left">
                                    <div className="text-sm leading-4 text-black font-semibold">Sign out of all other devices</div>
                                    <div className="mt-1 text-sm text-slate-600">It is recommended to sign out of all other devices which may have used your old password.</div>
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-end gap-2 items-center mt-1">
                            <button onClick={() => setIsUpdatePassword(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                            <button onClick={onSavePassword} className="w-20 inline-flex justify-center items-center gap-2 bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] text-center text-white text-sm px-5 py-2 rounded-md">
                                {isLoading ? <Loader /> : state.user.isPasswordSet ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Password;