export const Radio = ({ isChecked, onChangeRadio, value }: { value: string, isChecked: boolean, onChangeRadio: (e: any) => void }) => {
    return (
        <label className="flex items-center">
            <input
                type="radio"
                value={value}
                checked={isChecked}
                className="sr-only"
                onChange={onChangeRadio}
            />
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-slate-500">
                <span
                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${isChecked && '!bg-slate-500'
                        }`}
                >
                    {' '}
                </span>
            </div>
            <div className="text-black font-semibold dark:text-white">{value}</div>
        </label>
    )
}