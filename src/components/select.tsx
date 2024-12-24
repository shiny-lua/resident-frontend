import { getCaseSensitive } from "../context/helper"
import Icon from "./icon"

export const Select = ({ value, onChange, data }: { value: string, onChange: (chainLabel: string) => void, data: string[] }) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:gap-2">
            <div className="relative w-full z-20 bg-transparent dark:bg-form-input">
                <select
                    value={value}
                    className={`relative  z-20 w-full appearance-none rounded border bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary}`}
                    onChange={e => onChange(e.target.value)}
                >
                    {data.map((i: string, k: number) => (
                        <option value={i} key={k} className="text-xs sm:text-[15px]">{getCaseSensitive(i)}</option>
                    ))}
                </select>

                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <Icon icon="ArrowDrop" />
                </span>
            </div>
        </div>
    )
}