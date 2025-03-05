
import React from "react";

import { useGlobalContext } from "../../context";
import Icon from "../icon"

const EmailAddress = () => {
    const [isAddEmail, setIsAddEmail] = React.useState(false)
    const [isRemoveEmailDropdown, setIsRemoveEmailDropdown] = React.useState(false)
    const [isRemoveEmail, setIsRemoveEmail] = React.useState(false)

    const [state]: GlobalContextType = useGlobalContext();

    const removeEmailDropdownRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (removeEmailDropdownRef.current && !removeEmailDropdownRef.current.contains(event.target as Node)) {
                setIsRemoveEmailDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="flex flex-col lg:flex-row gap-2 w-full">
            <div className="text-md text-slate-800 font-semibold w-full lg:w-1/3">Email Address</div>
            <div className={`flex justify-between items-start w-full lg:w-2/3 ${!isAddEmail ? "ml-0 lg:ml-6" : ""}`}>
                <div className="w-full">
                    <div className="flex justify-between gap-4 items-center">
                        <div className="flex gap-1 text-slate-600 text-[13px]">
                            <div>{state.user?.email}</div>
                            <div className="p-1 text-xs rounded-md bg-slate-200">primary</div>
                        </div>
                        {/* <div ref={removeEmailDropdownRef} className="relative w-full flex justify-end">
                            <button onClick={() => setIsRemoveEmailDropdown(!isRemoveEmailDropdown)} className="hover:border-slate-200 mr-2 rounded-md p-1 hover:border"><Icon icon="MoreHorizontal" /></button>
                            <button onClick={() => { setIsRemoveEmail(true); setIsRemoveEmailDropdown(false); setIsAddEmail(false) }} className={`text-sm text-red-600 absolute top-6 right-0 bg-white shadow-4 p-2 rounded-md ${isRemoveEmailDropdown ? "block" : "hidden"}`}>Remove email</button>
                        </div> */}
                    </div>
                    {!isAddEmail ? (
                        <div>
                            {/* {!isRemoveEmail && (
                                <button onClick={() => { setIsAddEmail(true); setIsRemoveEmail(false) }} className="flex w-full rounded-lg items-center gap-1  hover:bg-slate-100 p-2 mt-1">
                                    <Icon icon="New" />
                                    <div className="text-sm">Add email address</div>
                                </button>
                            )} */}
                        </div>) : (
                        <div className="border w-full rounded-lg shadow-4 p-6 mt-2">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-bold text-black">Add email address</div>
                                    <div className="text-sm text-slate-600">An email containing a verification link will be sent to this email address.</div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                                    <input type="email" placeholder="Enter email address" className="border outline-none focus:border-sky-500 rounded-lg p-2 w-full" />
                                </div>
                                <div className="flex justify-end gap-2 items-center mt-1">
                                    <button onClick={() => setIsAddEmail(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-md">Cancel</button>
                                    <button className="text-white bg-sky-500 text-sm px-5 py-2 rounded-md">Save</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {isRemoveEmail && (
                        <div className="border w-full rounded-lg shadow-4 p-6 pb-4 mt-2">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-bold text-black mb-2">Remove email address</div>
                                    <div className="text-sm text-slate-600 mb-1">{state.user?.email} will be removed from this account.</div>
                                    <div className="text-sm text-slate-600">You will no longer be able to sign in using this email address.</div>
                                </div>
                                <div className="flex justify-end gap-2 items-center mt-1">
                                    <button onClick={() => setIsRemoveEmail(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                                    <button className="text-white bg-sky-500 text-sm px-5 py-2.5 rounded-lg">Remove</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmailAddress;