
import React from "react";

import { useGlobalContext } from "../../context";
import Icon from "../icon"

const ConnectedAccount = () => {
    const [isAddAccount, setIsAddAccount] = React.useState(false)
    const [isRemoveAccountDropdown, setIsRemoveAccountDropdown] = React.useState(false)
    const [isRemoveAccount, setIsRemoveAccount] = React.useState(false)

    const [state]: GlobalContextType = useGlobalContext();

    const addAccountDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const removeAccountDropdownRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (addAccountDropdownRef.current && !addAccountDropdownRef.current.contains(event.target as Node)) {
                setIsAddAccount(false);
            }
            if (removeAccountDropdownRef.current && !removeAccountDropdownRef.current.contains(event.target as Node)) {
                setIsRemoveAccountDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-2 w-full">
            <div className="text-md text-slate-800 font-semibold w-full lg:w-1/3">Connected account</div>
            <div className="flex justify-between items-start w-full lg:w-2/3 ml-0 lg:ml-6">
                <div className="w-full">
                    <div className="flex items-center">
                        <div className="flex w-full gap-4 items-center">
                            <div className="flex w-full gap-1 text-slate-600 text-[13px]">
                                <div className="flex justify-center items-center">
                                    <img src="/image/icons/google.png" width={14} height={14} />
                                </div>
                                <div className="p-1 text-xs rounded-md">Google - {state.user?.email}</div>
                            </div>
                        </div>
                        <div ref={removeAccountDropdownRef} className="relative w-30 flex justify-end">
                            <button onClick={() => setIsRemoveAccountDropdown(!isRemoveAccountDropdown)} className="hover:border-slate-200 mr-2 rounded-md p-1 hover:border"><Icon icon="MoreHorizontal" /></button>
                            {isRemoveAccountDropdown && (
                                <div onClick={() => { setIsRemoveAccount(true); setIsRemoveAccountDropdown(false); setIsAddAccount(false) }} className={`text-sm text-red-600 cursor-pointer absolute top-6 right-0 bg-white shadow-4 p-2 rounded-md`}>Remove</div>
                            )}
                        </div>
                    </div>
                    {!isRemoveAccount && (
                        <div className="relative" ref={addAccountDropdownRef}>
                            <button onClick={() => setIsAddAccount(!isAddAccount)} className="flex w-full rounded-lg items-center gap-1 hover:bg-slate-100 p-2 mt-1 mr-0 lg:mr-2">
                                <Icon icon="New" />
                                <div className="text-sm">Connect account</div>
                            </button>
                            {isAddAccount && (
                                <div className="absolute top-9 left-0 w-full bg-white shadow-lg p-2 rounded-md">
                                    <button className="flex w-full rounded-lg items-center gap-1  hover:bg-slate-100 p-2 mt-1">
                                        <img src="/image/icons/facebook.png" className="w-4.5 h-4.5" alt="logo" />
                                        <div className="text-sm">Facebook</div>
                                    </button>
                                    <button className="flex w-full rounded-lg items-center gap-1  hover:bg-slate-100 p-2 mt-1">
                                        <img src="/image/icons/linkedin.png" className="w-4.5 h-4.5" alt="logo" />
                                        <div className="text-sm">Linkedin</div>
                                    </button>
                                    <button className="flex w-full rounded-lg items-center gap-1  hover:bg-slate-100 p-2 mt-1">
                                        <img src="/image/icons/microsoft.svg" className="w-4.5 h-4.5" alt="logo" />
                                        <div className="text-sm">Microsoft</div>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {isRemoveAccount && (
                        <div className="border w-full rounded-lg shadow-4 p-6 pb-4 mt-2">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-bold text-black mb-2">Remove connected account</div>
                                    <div className="text-sm text-slate-600 mb-1">Google will be removed from this account.</div>
                                    <div className="text-sm text-slate-600">You will no longer be able to use this connected account and any dependent features will no longer work.</div>
                                </div>
                                <div className="flex justify-end gap-2 items-center mt-1">
                                    <button onClick={() => setIsRemoveAccount(false)} className="text-slate-600 text-sm hover:bg-slate-200 px-4 py-2 rounded-md">Cancel</button>
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

export default ConnectedAccount;