import { Link } from "react-router-dom"
import Icon from "../../../../components/icon"

const DropRight = () => {
    return (
        <div className="absolute -top-10 -right-[270px] bg-white w-[250px] bg-opacity-100 shadow-4 border rounded-xl p-2">
            <div className="px-2 py-[7px]">
                <div className="flex w-full justify-between text-sm font-medium">
                    <div className="whitespace-nowrap">Live Interview</div>
                    <div className="my-auto flex items-center rounded-md text-[#007CEE]">Free Trial</div>
                </div>
            </div>
            <div className="px-2 py-[7px]">
                <div className="flex w-full justify-between text-sm font-medium">
                    <div className="whitespace-nowrap">Mock Interview</div>
                    <div className="my-auto flex items-center rounded-md text-[#007CEE]">Free Trial</div>
                </div>
            </div>
            <div className="mt-2 w-full bg-[#F8FAFC] py-1 text-sm">
                <div className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                    <Icon icon="Download" />
                    <span className="ml-3">Download Center</span>
                </div>
                <Link to="/app/permission-setting" className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                    <Icon icon="SettingOutLine" />
                    <span className="ml-3">Settings</span>
                </Link>
                <div className="flex w-full cursor-pointer flex-row items-center justify-start px-2 py-[6px] hover:bg-sky-100">
                    <Icon icon="HelpCenter" />
                    <span className="ml-3">Help Center</span>
                </div>
            </div>
        </div>
    )
}

export default DropRight