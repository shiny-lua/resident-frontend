import Password from "./password";
import Icon from "../icon";
import DeleteAccount from "./delete-account";


const Security = () => {
    return (
        <div className="w-full lg:w-2/3 border rounded-lg pt-8 px-4 lg:px-6 overflow-y-auto max-h-[calc(100dvh-100px)]">
            <div className="flex gap-2">
                <div className="text-2xl font-semibold pb-4">Security</div>
            </div>
            <div className="py-4 border-t">
                <Password />
                <hr className="my-4" />
                {/* <div className="flex flex-col sm:flex-row gap-2">
                    <div className="text-md text-slate-800 font-semibold w-full sm:w-1/3 min-w-[200px] max-w-[200px]">Active device</div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <Icon icon="Device" className="w-10 h-10" />
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-slate-600">Windows</div>
                                <div className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">This device</div>
                            </div>
                        </div>
                        <div className="text-[12.5px] mb-1 text-slate-500">Chrome 133.0.0.0</div>
                        <div className="text-[12.5px] mb-1 text-slate-500">185.135.76.89 (Tokyo, JP)</div>
                        <div className="text-[12.5px] mb-1 text-slate-500">Today at 12:54 PM</div>
                    </div>
                </div>
                <hr className="my-4" /> */}
                <DeleteAccount />
            </div>
        </div>
    )
}

export default Security;