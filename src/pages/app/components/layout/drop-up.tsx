import Icon from "../../../../components/icon"

const DropUp = () => {
    return (
        <div className="absolute -top-50 left-3 bg-white w-[330px] bg-opacity-100 shadow-4 border rounded-xl py-4 px-5">
            <div className="flex gap-4 items-center border-b pb-3">
                <div className="">
                    <img
                        crossOrigin="anonymous"
                        src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWJueGZTckVuZFJnYXhUU0ZJU2FhbFNHaEIifQ?width=160"
                        className="rounded-full w-12 h-12"
                        title="Show Alive"
                        alt="Show Alive"
                    />
                </div>
                <div className="text-md flex flex-col">
                    <div className="text-md font-semibold text-slate-900">Show Alive</div>
                    <div className="text-md text-slate-600">alivestonyplayer@gmail</div>
                </div>
            </div>
            <div className="text-md text-slate-600 flex items-center gap-3">
                <Icon className="flex items-center px-3 w-12 h-12" icon="Setting" />
                <div>Setting</div>
            </div>
            <div className="text-md text-slate-600 border-t flex items-center gap-3">
                <Icon className="flex items-center px-3 w-12 h-12" icon="Logout" />
                Logout
            </div>
        </div>
    )
}

export default DropUp