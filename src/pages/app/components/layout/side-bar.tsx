import { Link } from "react-router-dom"
import Icon from "../../../../components/icon"

const SideBar = () => {
    return (
        <div className="w-[220px]">
            <nav className="flex h-full w-full flex-col overflow-x-hidden py-5 transition-[width] duration-300">
                <Link to={"/"} className="flex gap-2 px-0 sm:px-5 cursor-pointer">
                    <div className="text-lg md:text-xl text-primary">Final Round</div>
                    <div>
                        <img src="/image/icons/logo.png" alt="logo" />
                    </div>
                </Link>
                <div className="">
                    <div className="border-t border-slate-100 px-2 py-3">
                        <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">
                            Interview
                        </div>
                        <Link
                            to="/app/v2/interview"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="LiveInterview" />
                            <span>Live Interview</span>
                        </Link>
                        <Link
                            to="/app/v2/mock-interview"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="MockInterview" />
                            <span>Mock Interview</span>
                        </Link>
                        <Link
                            to="/app/v2/role"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="PreparationHub" />
                            <span>Preparation Hub</span>
                        </Link>
                        <Link
                            to="/app/v2/resume"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="DocumentCenter" />
                            <span>Document Center</span>
                        </Link>
                        <Link
                            to="/app/v2/store"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="Upgrade" />
                            <span>Upgrade Your Copilot</span>
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 px-2 py-3">
                        <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">
                            Tools
                        </div>
                        <Link
                            to="/app/v2/ai-generator"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="AiGenerator" />
                            <span>AI Material Generator</span>
                        </Link>
                        <Link
                            to="/app/v2/interview-coach"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="AiMagic" />
                            <span>AI Career Coach</span>
                        </Link>
                        <Link
                            to="/app/v2/chat-with-recruiters"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="Chat" />
                            <span>Speak with Recruiters</span>
                        </Link>
                        <Link
                            to="/app/v2/question"
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                        >
                            <Icon icon="Question" />
                            <span>Interview Question Bank</span>
                        </Link>
                    </div>
                    <div className="border-t border-slate-100 px-2 py-3">
                        <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">
                            Education
                        </div>
                        <a
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium bg-slate-900 text-white hover:bg-primary/90"
                            data-state="closed"
                            href="/app/v2/started"
                        >
                            <Icon icon="Rocket" />
                            <span>Get Started</span>
                        </a>
                    </div>
                    <div className="border-t border-slate-100 px-2 py-3">
                        <div className="text-nowrap pb-3 pl-3 font-medium text-slate-400">
                            Other
                        </div>
                        <a
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                            data-state="closed"
                            href="/app/v2/download"
                        >
                            <Icon icon="Download" />
                            <span>Download Center</span>
                        </a>
                        <a
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                            data-state="closed"
                            href="/app/v2/permission-setting"
                        >
                            <Icon icon="Setting" />
                            <span>Settings</span>
                        </a>
                        <a
                            className="flex min-h-10 items-center gap-3 text-nowrap rounded-md px-3 font-medium hover:bg-sky-100"
                            data-state="closed"
                            href="/app/v2/help"
                        >
                            <Icon icon="HelpCenter" />
                            <span>Help Center</span>
                        </a>
                    </div>
                </div>
                <div className="sticky bottom-0 m-2 rounded-lg border bg-white p-3 shadow-sm mt-auto px-2">
                    <div className="flex h-12 items-center gap-3 border-b border-slate-200 pb-3 text-slate-700">
                        <div className="cl-rootBox cl-userButton-root 🔒️ cl-internal-nfscg9">
                            <button
                                className="cl-userButtonTrigger cl-button 🔒️ cl-internal-c4jh7f"
                                aria-label="Open user button"
                                aria-expanded="false"
                                aria-haspopup="dialog"
                                data-variant="roundWrapper"
                                data-color="primary"
                            >
                                <span className="cl-userButtonBox 🔒️ cl-internal-2z8hkq">
                                    <span className="cl-avatarBox cl-userButtonAvatarBox 🔒️ cl-internal-1j7ahlv">
                                        <img
                                            crossOrigin="anonymous"
                                            srcSet="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWJueGZTckVuZFJnYXhUU0ZJU2FhbFNHaEIifQ?width=80 1x,https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWJueGZTckVuZFJnYXhUU0ZJU2FhbFNHaEIifQ?width=160 2x"
                                            src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWJueGZTckVuZFJnYXhUU0ZJU2FhbFNHaEIifQ?width=160"
                                            className="cl-avatarImage cl-userButtonAvatarImage 🔒️ cl-internal-fhootk"
                                            title="lua"
                                            alt="lua"
                                        />
                                        <span className="cl-internal-gpirto" />
                                    </span>
                                </span>
                            </button>
                        </div>
                        <div className="items-center rounded-md border py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground inline-block max-h-[22px] overflow-hidden break-all bg-white px-0 hover:bg-white">
                            lua
                        </div>
                    </div>
                    <div className="my-2.5 rounded-md bg-slate-50 p-1">
                        <div className="flex w-full justify-between font-medium">
                            <div>
                                <div className="whitespace-nowrap">Live Interview</div>
                                <div className="text-xxs text-slate-400">Free Trial</div>
                            </div>
                            <div className="my-auto flex items-center rounded-md text-brand">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="my-2.5 rounded-md bg-slate-50 p-1">
                        <div className="flex w-full justify-between font-medium">
                            <div>
                                <div className="whitespace-nowrap">Mock Interview</div>
                                <div className="text-xxs text-slate-400">Free Trial</div>
                            </div>
                            <div className="my-auto flex items-center rounded-md text-brand">
                                Free Trial
                            </div>
                        </div>
                    </div>
                    <a href="/app/v2/subscription">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-3"
                            >
                                <path
                                    d="M9.70712 7.29286C9.31659 6.90234 8.68343 6.90234 8.2929 7.29286C7.90238 7.68339 7.90238 8.31655 8.2929 8.70708L11.2929 11.7071C11.6834 12.0976 12.3166 12.0976 12.7071 11.7071L15.7071 8.70708C16.0976 8.31655 16.0976 7.68339 15.7071 7.29286C15.3166 6.90234 14.6834 6.90234 14.2929 7.29286L12 9.58576L9.70712 7.29286Z"
                                    fill="currentColor"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.947733 11.3619L10.5858 21C11.3669 21.781 12.6332 21.781 13.4143 21L23.0523 11.3619C23.7913 10.6229 23.8368 9.43959 23.1566 8.64611L18.0586 2.69842C17.6786 2.25513 17.124 2 16.5401 2H7.45997C6.87612 2 6.32142 2.25513 5.94146 2.69842L0.843433 8.64611C0.163307 9.43959 0.208755 10.6229 0.947733 11.3619ZM21.6381 9.9477L12 19.5858L2.36195 9.9477L7.45997 4H16.5401L21.6381 9.9477Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Upgrade Now
                        </button>
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default SideBar