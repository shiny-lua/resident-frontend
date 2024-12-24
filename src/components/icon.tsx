import React from 'react'

const Icon = ({ icon, className }: { icon: string, className?: any }) => {
    return <div className={className}>{icons[icon] as any}</div>
}

const icons = {
    Edit: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    ),
    ArrowLeft: (
        <svg className="h-4 w-4 text-current" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="15 6 9 12 15 18" /></svg>
    ),
    ArrowDown: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            className="text-slate-400"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.8212 7.23987L9.15454 3.23987L10.1788 4.09345L7.20116 7.66666L10.1788 11.2399L9.15454 12.0934L5.8212 8.09345C5.61518 7.84622 5.61518 7.4871 5.8212 7.23987Z"
                fill="currentColor"
            />
        </svg>
    ),
    Upload: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-5 w-5 cursor-pointer"
        >
            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
    ),
    Audio: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
        >
            <rect
                x={8}
                y={3}
                width={8}
                height={11}
                rx={4}
                stroke="currentColor"
                strokeWidth={2}
            />
            <path
                d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10"
                stroke="currentColor"
                strokeWidth={2}
            />
            <path d="M12 21V18" stroke="currentColor" strokeWidth={2} />
        </svg>
    ),
    Camera: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 fill-slate-700"
        >
            <path
                d="M18 7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                fill="currentColor"
            />
        </svg>
    ),
    Notification: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
        >
            <path
                d="M3 6V16C3 17.1046 3.89543 18 5 18H8.17157C8.70201 18 9.21071 18.2107 9.58579 18.5858L11.2929 20.2929C11.6834 20.6834 12.3166 20.6834 12.7071 20.2929L14.4142 18.5858C14.7893 18.2107 15.298 18 15.8284 18H19C20.1046 18 21 17.1046 21 16V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6Z"
                stroke="currentColor"
                strokeWidth={2}
            />
        </svg>
    ),
    Compatibility: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
        >
            <circle
                cx={12}
                cy={12}
                r={9}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <circle
                cx={4}
                cy={4}
                r={4}
                transform="matrix(1 0 0 -1 8 16)"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M12 8H20"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M5 7L8 12.5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M15 15L11 21"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    ),
    Check: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-dark-green"
        >
            <path d="M4 12L9 17L20 7" stroke="currentColor" strokeWidth={2} />
        </svg>
    ),
    ArrowUpRight: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path d="M15.8333 5C15.8333 4.53976 15.4602 4.16667 15 4.16667H6.66663V5.83333H12.9882L4.41077 14.4108L5.58928 15.5893L14.1666 7.01192V13.3333H15.8333V5Z" />
        </svg>
    ),
    Close: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x h-4 w-4"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    ),
    Cancel: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
        >
            <path
                d="M6.99999 7L17 17"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
            />
            <path
                d="M17 7L7.00005 17"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </svg>
    ),
    Info: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
        >
            <circle
                cx={12}
                cy={12}
                r={9}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M12 8V12"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <circle cx={12} cy={16} r={1} fill="currentColor" />
        </svg>
    ),
    ArrowRight: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-8 w-8 text-slate-700"
        >
            <path
                d="M9.5 17.5L14.5 11.5L9.5 5.5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </svg>
    ),
    Star: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={36}
            height={36}
            viewBox="0 0 36 36"
            fill="currentColor"
            className="inline h-5 w-5 text-slate-300"
        >
            <path d="M16.3015 2.73169C17.0841 1.47306 18.9159 1.47306 19.6985 2.73169L23.6012 9.00876C23.8766 9.4516 24.314 9.76939 24.8202 9.8944L31.9961 11.6664C33.4349 12.0218 34.001 13.7639 33.0458 14.8971L28.282 20.5486C27.9459 20.9473 27.7788 21.4615 27.8164 21.9816L28.3485 29.3539C28.4552 30.8321 26.9733 31.9088 25.6003 31.3506L18.7534 28.5663C18.2703 28.3699 17.7297 28.3699 17.2466 28.5663L10.3996 31.3505C9.02673 31.9088 7.54474 30.8321 7.65144 29.3539L8.1836 21.9816C8.22114 21.4615 8.05407 20.9473 7.71798 20.5486L2.95416 14.8971C1.99896 13.7639 2.56502 12.0218 4.00388 11.6665L11.1797 9.89441C11.686 9.76939 12.1234 9.4516 12.3987 9.00876L16.3015 2.73169Z" />
        </svg>
    ),
    Trash: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M7.5 2.5C7.03976 2.5 6.66667 2.8731 6.66667 3.33333C6.66667 3.79357 7.03976 4.16667 7.5 4.16667H12.5C12.9602 4.16667 13.3333 3.79357 13.3333 3.33333C13.3333 2.8731 12.9602 2.5 12.5 2.5H7.5Z"
                fill="#94A3B8"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 5.83333C2.5 5.3731 2.8731 5 3.33333 5H16.6667C17.1269 5 17.5 5.3731 17.5 5.83333C17.5 6.29357 17.1269 6.66667 16.6667 6.66667H15.7717L15.116 15.1917C15.0158 16.4942 13.9297 17.5 12.6233 17.5H7.37675C6.07041 17.5 4.98431 16.4942 4.88412 15.1917L4.22834 6.66667H3.33333C2.8731 6.66667 2.5 6.29357 2.5 5.83333ZM5.89993 6.66667H14.1001L13.4542 15.0639C13.4208 15.4981 13.0588 15.8333 12.6233 15.8333H7.37675C6.94131 15.8333 6.57927 15.4981 6.54588 15.0639L5.89993 6.66667Z"
                fill="#94A3B8"
            />
        </svg>
    ),
    Chain: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
            className="w-6 h-6"
        >
            <path
                fill="currentColor"
                d="M10.068 3.668a1.6 1.6 0 0 1 2.263 2.263l-2.4 2.4a1.6 1.6 0 0 1-2.263 0 .8.8 0 1 0-1.131 1.131 3.2 3.2 0 0 0 4.525 0l2.4-2.4a3.2 3.2 0 1 0-4.525-4.525l-1.2 1.2a.8.8 0 1 0 1.131 1.131l1.2-1.2Z"
            />
            <path
                fill="currentColor"
                d="M6.068 7.668a1.6 1.6 0 0 1 2.263 0 .8.8 0 1 0 1.131-1.131 3.2 3.2 0 0 0-4.525 0l-2.4 2.4a3.2 3.2 0 0 0 4.525 4.525l1.2-1.2a.8.8 0 0 0-1.131-1.131l-1.2 1.2a1.6 1.6 0 0 1-2.263-2.263l2.4-2.4Z"
            />
        </svg>

    ),
    Email: (
        <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-6 h-6"
        >
            <path
                d="M2.75 2.75A1.75 1.75 0 0 0 1 4.5v1.016l6.51 3.693a1.094 1.094 0 0 0 .98 0L15 5.517V4.5a1.75 1.75 0 0 0-1.75-1.75H2.75Z"
                fill="#42434D"
            />
            <path
                d="m15 6.984-5.924 3.4a2.406 2.406 0 0 1-2.152 0L1 6.983V11.5a1.75 1.75 0 0 0 1.75 1.75h10.5A1.75 1.75 0 0 0 15 11.5V6.984Z"
                fill="#42434D"
            />
        </svg>

    )
} as { [key: string]: React.SVGProps<SVGSVGElement> }

export default Icon
