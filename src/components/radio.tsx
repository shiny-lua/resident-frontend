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
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary dark:border-slate-300">
                <span
                    className={`h-2.5 w-2.5 rounded-full bg-transparent ${isChecked && '!bg-primary dark:!bg-slate-300'
                        }`}
                >
                    {' '}
                </span>
            </div>
            <div className="text-black dark:text-white">{value}</div>
        </label>
    )
}