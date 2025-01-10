import { sliceText, textEllipsis } from "../context/helper"
import Icon from "./icon"

export const Select = ({ value, data, onHandle, optionPrefix, showDropdown, onDropdown, dropdownRef, obk }: { value: string, data: string[], optionPrefix?: string, onHandle: (i: string, p:any ) => void, showDropdown: boolean, onDropdown: VoidFunction, dropdownRef: any, obk:string}) => {

    return (
        <div className="relative  min-w-[150px]">
            <button
                onClick={onDropdown}
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-md ring-offset-background placeholder:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            >
                <span className="text-[13px]" style={{ pointerEvents: "none" }}>{value !== "" ? textEllipsis(value, 30) : textEllipsis(optionPrefix || "", 30)}</span>
                <Icon className="w-4 h-4 text-slate-500" icon="ChevronDown" />
            </button>
            {showDropdown && <div ref={dropdownRef} className="fade-in w-full absolute top-10 z-1 left-0 p-1 border bg-white shadow-1 rounded-md">
                {optionPrefix && (<div className="px-7 pt-2 text-sm font-semibold text-slate-500">{optionPrefix}</div>)}
                {data.map((i, k) => (
                    <div onClick={() => onHandle(i, obk)} key={k} className={`flex items-center cursor-pointer gap-2 my-1 hover:bg-sky-100 p-1 text-[13px] text-slate-800 rounded-sm ${value === i ? "bg-sky-100" : "bg-white"}`}>
                        <div className="w-4">{value === i && <Icon className="text-sky-500" icon="Check" />}</div>
                        {i}
                    </div>
                ))}
            </div>}
        </div>
    )
}