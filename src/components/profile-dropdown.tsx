import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import Icon from "./icon"
import { useGlobalContext } from "../context"

const ProfileDropdown = ({ onManageAccount }: { onManageAccount: VoidFunction }) => {
    const navigate = useNavigate()

    const [state, { dispatch, storeData }]: GlobalContextType = useGlobalContext()

    const onLogout = () => {
        dispatch({ type: "access_token", payload: "" })
        Cookies.remove("access_token")
        navigate("/")
    }

    return (
        <div className="bg-white w-[330px] bg-opacity-100 shadow-4 border rounded-xl py-4 px-5">
            <div className="flex gap-4 items-center border-b pb-3">
                <div className="">
                    {state.user?.pfp ? (
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
                <div className="text-md flex flex-col">
                    <div className="text-md font-semibold text-slate-900">{state.user.email}</div>
                    <div className="text-md text-slate-600">{state.user.fullName}</div>
                </div>
            </div>
            <button onClick={onManageAccount} className="text-md text-slate-600 flex items-center gap-3">
                <Icon className="flex items-center px-3 w-12 h-12" icon="Setting" />
                <div>Manage Account</div>
            </button>
            <button onClick={onLogout} className="text-md text-slate-600 border-t flex items-center gap-3 w-full">
                <Icon className="flex items-center px-3 w-12 h-12" icon="Logout" />
                Logout
            </button>
        </div>
    )
}

export default ProfileDropdown