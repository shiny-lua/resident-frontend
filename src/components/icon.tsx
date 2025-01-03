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
                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM6.66581 19.2496C8.15857 20.3498 10.0034 21 12 21C13.9967 21 15.8415 20.3498 17.3342 19.2496C16.3363 17.3183 14.3211 15.9999 12 15.9999C9.67892 15.9999 7.66369 17.3183 6.66581 19.2496Z"
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
    ),
    LiveInterview: (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M9.16658 6.66667C9.16658 6.20643 8.79349 5.83333 8.33325 5.83333C7.87301 5.83333 7.49992 6.20643 7.49992 6.66667V10.8333C7.49992 11.2936 7.87301 11.6667 8.33325 11.6667H11.6666C12.1268 11.6667 12.4999 11.2936 12.4999 10.8333C12.4999 10.3731 12.1268 10 11.6666 10H9.16658V6.66667Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33325 2.5C2.41278 2.5 1.66659 3.24619 1.66659 4.16667V13.3333C1.66659 14.2538 2.41278 15 3.33325 15H16.6666C17.5871 15 18.3333 14.2538 18.3333 13.3333V4.16667C18.3333 3.24619 17.5871 2.5 16.6666 2.5H3.33325ZM3.33325 4.16667H16.6666V13.3333H3.33325V4.16667Z"
                fill="currentColor"
            />
            <path
                d="M1.66659 15.8333C1.20635 15.8333 0.833252 16.2064 0.833252 16.6667C0.833252 17.1269 1.20635 17.5 1.66659 17.5H18.3333C18.7935 17.5 19.1666 17.1269 19.1666 16.6667C19.1666 16.2064 18.7935 15.8333 18.3333 15.8333H1.66659Z"
                fill="currentColor"
            />
        </svg>
    ),
    MockInterview: (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M7.16683 6C6.91431 5.81062 6.57647 5.78016 6.29415 5.92132C6.01183 6.06248 5.8335 6.35103 5.8335 6.66667V10.8333C5.8335 11.2936 6.20659 11.6667 6.66683 11.6667C7.12707 11.6667 7.50016 11.2936 7.50016 10.8333V8.33334L9.50016 9.83334C9.79646 10.0556 10.2039 10.0556 10.5002 9.83334L12.5002 8.33334V10.8333C12.5002 11.2936 12.8733 11.6667 13.3335 11.6667C13.7937 11.6667 14.1668 11.2936 14.1668 10.8333V6.66667C14.1668 6.35103 13.9885 6.06248 13.7062 5.92132C13.4239 5.78016 13.086 5.81062 12.8335 6L10.0002 8.125L7.16683 6Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.3335 2.5C2.41302 2.5 1.66683 3.24619 1.66683 4.16667V13.3333C1.66683 14.2538 2.41302 15 3.3335 15H16.6668C17.5873 15 18.3335 14.2538 18.3335 13.3333V4.16667C18.3335 3.24619 17.5873 2.5 16.6668 2.5H3.3335ZM3.3335 4.16667H16.6668V13.3333H3.3335V4.16667Z"
                fill="currentColor"
            />
            <path
                d="M1.66683 15.8333C1.20659 15.8333 0.833496 16.2064 0.833496 16.6667C0.833496 17.1269 1.20659 17.5 1.66683 17.5H18.3335C18.7937 17.5 19.1668 17.1269 19.1668 16.6667C19.1668 16.2064 18.7937 15.8333 18.3335 15.8333H1.66683Z"
                fill="currentColor"
            />
        </svg>
    ),
    PreparationHub: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9ZM12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.2331 20.1867 16.2762 18.8402 17.8494C17.4374 15.5424 14.8997 13.9999 12 13.9999C9.67892 13.9999 7.66369 15.5424 6.66581 17.8494C3.8133 16.2763 3 14.2331 3 12ZM6.66581 19.2496C8.15857 20.3498 10.0034 21 12 21C13.9967 21 15.8415 20.3498 17.3342 19.2496C16.3363 17.3183 14.3211 15.9999 12 15.9999C9.67892 15.9999 7.66369 17.3183 6.66581 19.2496Z"
                fill="currentColor"
            />
        </svg>
    ),
    DocumentCenter: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M14.2857 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8.625"
                stroke="currentColor"
                strokeWidth={2}
            />
            <path
                d="M17.821 2.3597C17.8945 2.21186 18.1055 2.21186 18.179 2.3597L18.9671 3.94294C18.9865 3.9819 19.0181 4.01347 19.0571 4.03286L20.6403 4.82096C20.7881 4.89454 20.7881 5.10546 20.6403 5.17904L19.0571 5.96714C19.0181 5.98653 18.9865 6.0181 18.9671 6.05706L18.179 7.64031C18.1055 7.78814 17.8945 7.78814 17.821 7.64031L17.0329 6.05706C17.0135 6.0181 16.9819 5.98653 16.9429 5.96714L15.3597 5.17904C15.2119 5.10546 15.2119 4.89454 15.3597 4.82096L16.9429 4.03286C16.9819 4.01347 17.0135 3.9819 17.0329 3.94294L17.821 2.3597C17.8945 2.21186 18.1055 2.21186 18.179 2.3597Z"
                fill="currentColor"
            />
            <path
                d="M8 17H16"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
            />
            <path
                d="M8 13H14"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
            />
        </svg>
    ),
    Upgrade: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M2 4H4.07987C4.59996 4 5.03322 4.39866 5.07641 4.91695L5.92359 15.083C5.96678 15.6013 6.40004 16 6.92013 16H18.1978C18.6665 16 19.0723 15.6745 19.174 15.2169L20.7296 8.21693C20.8684 7.59242 20.3931 7 19.7534 7H8"
                stroke="currentColor"
                strokeWidth={2}
            />
            <circle cx="6.5" cy="19.5" r="1.5" fill="currentColor" />
            <circle cx="18.5" cy="19.5" r="1.5" fill="currentColor" />
        </svg>
    ),
    AiGenerator: (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.02369 1.66666H15C16.3807 1.66666 17.5 2.78595 17.5 4.16666V10.8333H15.8333V4.16666C15.8333 3.70643 15.4602 3.33333 15 3.33333H9.16667V5.83333C9.16667 7.21404 8.04738 8.33333 6.66667 8.33333H4.16667V15.8333C4.16667 16.2936 4.53976 16.6667 5 16.6667H10.8333V18.3333H5C3.61929 18.3333 2.5 17.214 2.5 15.8333V8.19035C2.5 7.52731 2.76339 6.89143 3.23223 6.42259L7.25592 2.3989C7.72476 1.93006 8.36065 1.66666 9.02369 1.66666ZM5.34518 6.66666H6.66667C7.1269 6.66666 7.5 6.29357 7.5 5.83333V4.51184L5.34518 6.66666Z"
                fill="currentColor"
            />
            <path
                d="M15.6498 12.6137C15.7252 12.4621 15.9415 12.4621 16.0169 12.6137L16.9953 14.5792C17.0152 14.6191 17.0475 14.6515 17.0875 14.6714L19.053 15.6498C19.2046 15.7252 19.2046 15.9415 19.053 16.0169L17.0875 16.9953C17.0475 17.0152 17.0152 17.0475 16.9953 17.0875L16.0169 19.053C15.9415 19.2046 15.7252 19.2046 15.6498 19.053L14.6714 17.0875C14.6515 17.0475 14.6191 17.0152 14.5792 16.9953L12.6137 16.0169C12.4621 15.9415 12.4621 15.7252 12.6137 15.6498L14.5792 14.6714C14.6191 14.6515 14.6515 14.6191 14.6714 14.5792L15.6498 12.6137Z"
                fill="currentColor"
            />
        </svg>
    ),
    AiMagic: (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <g id="icon/coach">
                <path
                    id="Union"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6667 4.16667C10.7462 4.16667 9.99999 4.91286 9.99999 5.83333C9.99999 6.75381 10.7462 7.5 11.6667 7.5C12.5871 7.5 13.3333 6.75381 13.3333 5.83333C13.3333 4.91286 12.5871 4.16667 11.6667 4.16667ZM8.33332 5.83333C8.33332 3.99238 9.82571 2.5 11.6667 2.5C13.5076 2.5 15 3.99238 15 5.83333C15 7.67428 13.5076 9.16667 11.6667 9.16667C9.82571 9.16667 8.33332 7.67428 8.33332 5.83333ZM3.8101 3.42573C3.87143 3.30253 4.04719 3.30253 4.10851 3.42573L4.76525 4.7451C4.78142 4.77757 4.80772 4.80388 4.84019 4.82004L6.15956 5.47678C6.28276 5.5381 6.28276 5.71387 6.15956 5.77519L4.84019 6.43193C4.80772 6.44809 4.78142 6.4744 4.76525 6.50687L4.10851 7.82624C4.04719 7.94944 3.87143 7.94944 3.8101 7.82624L3.15336 6.50687C3.1372 6.4744 3.11089 6.44809 3.07843 6.43193L1.75905 5.77519C1.63586 5.71387 1.63586 5.5381 1.75905 5.47678L3.07843 4.82004C3.11089 4.80388 3.1372 4.77757 3.15336 4.7451L3.8101 3.42573ZM7.49999 12.5C7.49999 12.0398 7.87309 11.6667 8.33332 11.6667H15C15.4602 11.6667 15.8333 12.0398 15.8333 12.5V15.8333H7.49999V12.5ZM8.33332 10C6.95261 10 5.83332 11.1193 5.83332 12.5V17.5H17.5V12.5C17.5 11.1193 16.3807 10 15 10H8.33332Z"
                    fill="currentColor"
                />
            </g>
        </svg>
    ),
    Chat: (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.16675 3.33333C3.94573 3.33333 3.73377 3.42113 3.57749 3.57741C3.42121 3.73369 3.33341 3.94565 3.33341 4.16667V15.4882L5.24416 13.5774C5.40044 13.4211 5.6124 13.3333 5.83342 13.3333H15.8334C16.0544 13.3333 16.2664 13.2455 16.4227 13.0893C16.579 12.933 16.6667 12.721 16.6667 12.5V4.16667C16.6667 3.94565 16.579 3.73369 16.4227 3.57741C16.2664 3.42113 16.0544 3.33333 15.8334 3.33333H4.16675ZM2.39898 2.3989C2.86782 1.93006 3.50371 1.66667 4.16675 1.66667H15.8334C16.4965 1.66667 17.1323 1.93006 17.6012 2.3989C18.07 2.86774 18.3334 3.50362 18.3334 4.16667V12.5C18.3334 13.163 18.07 13.7989 17.6012 14.2678C17.1323 14.7366 16.4965 15 15.8334 15H6.17859L3.08934 18.0893C2.85101 18.3276 2.49257 18.3989 2.18118 18.2699C1.86978 18.1409 1.66675 17.8371 1.66675 17.5V4.16667C1.66675 3.50363 1.93014 2.86774 2.39898 2.3989Z"
                fill="currentColor"
            />
        </svg>
    ),
    Question: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M19.0007 17.6564L18.2233 17.0275L17.9918 17.3136L18.001 17.6815L19.0007 17.6564ZM16.1972 19.9634L16.6859 19.091L16.2113 18.8251L15.7302 19.0792L16.1972 19.9634ZM19.4227 20.3943L19.6652 21.3645L19.4227 20.3943ZM20.1895 20.2026L19.947 19.2325L20.1895 20.2026ZM20.2528 19.6264L20.7 18.732L20.7 18.732L20.2528 19.6264ZM20 12C20 13.9057 19.3349 15.6534 18.2233 17.0275L19.7782 18.2854C21.1673 16.5683 22 14.38 22 12H20ZM12 4C16.4183 4 20 7.58172 20 12H22C22 6.47715 17.5228 2 12 2V4ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM15.7302 19.0792C14.6175 19.6668 13.3491 20 12 20V22C13.6825 22 15.2706 21.5837 16.6643 20.8477L15.7302 19.0792ZM19.1801 19.4242C18.3257 19.6378 17.4347 19.5104 16.6859 19.091L15.7085 20.8359C16.8959 21.5009 18.3093 21.7035 19.6652 21.3645L19.1801 19.4242ZM19.947 19.2325L19.1801 19.4242L19.6652 21.3645L20.4321 21.1728L19.947 19.2325ZM19.8056 20.5208C19.2318 20.2339 19.3247 19.3881 19.947 19.2325L20.4321 21.1728C21.6111 20.878 21.787 19.2755 20.7 18.732L19.8056 20.5208ZM18.001 17.6815C18.0313 18.8865 18.7235 19.9798 19.8056 20.5208L20.7 18.732C20.2806 18.5222 20.0121 18.0984 20.0004 17.6314L18.001 17.6815Z"
                fill="currentColor"
            />
            <path
                d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9565 14.5523 11.8085 13.8551 12.3578C12.9875 13.0414 12 13.8954 12 15V15"
                stroke="currentColor"
                strokeWidth={2}
            />
            <circle cx={12} cy={17} r={1} fill="currentColor" />
        </svg>
    ),
    Rocket: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1352 6.16809C21.779 4.09251 19.9118 2.22534 17.8363 2.86912C15.8165 3.49558 13.4405 4.50609 11.335 5.97323C11.1471 6.10413 10.9609 6.23901 10.7769 6.37793L6.75213 5.80296C5.98967 5.69404 5.23241 6.03262 4.80518 6.67346L1.6001 11.4811L6.86092 13.2347L10.7698 17.1435L12.5233 22.4042L17.331 19.1992C17.9718 18.7719 18.3104 18.0147 18.2015 17.2522L17.6265 13.2273C17.7654 13.0434 17.9002 12.8572 18.0311 12.6694C19.4983 10.5638 20.5088 8.18784 21.1352 6.16809ZM18.4287 4.77935C18.7254 4.68732 18.9529 4.77472 19.0913 4.91306C19.2296 5.05139 19.317 5.2789 19.225 5.5756C18.6419 7.45571 17.7101 9.63179 16.3902 11.526C15.1962 13.2396 13.7199 14.6731 11.9428 15.4881L8.51625 12.0616C9.33126 10.2844 10.7647 8.8082 12.4784 7.61416C14.3726 6.29429 16.5486 5.36249 18.4287 4.77935ZM13.5927 19.2877L12.9112 17.2432C14.0213 16.715 15.0098 16.0034 15.8852 15.1807L16.2216 17.5351L13.5927 19.2877ZM6.7611 11.0932C7.28932 9.98316 8.00094 8.99462 8.82363 8.11919L6.46928 7.78286L4.71668 10.4118L6.7611 11.0932Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.4459 13.6812C5.01362 14.5457 4.81688 15.573 4.76753 16.412C4.74255 16.8366 4.75311 17.2484 4.80348 17.6009C4.82854 17.7764 4.86652 17.9593 4.92557 18.1314C4.97805 18.2843 5.07816 18.5231 5.27967 18.7246C5.48117 18.9261 5.71991 19.0262 5.87289 19.0787C6.045 19.1377 6.22788 19.1757 6.4033 19.2008C6.75585 19.2511 7.16763 19.2617 7.59229 19.2367C8.43129 19.1874 9.45851 18.9906 10.3231 18.5584L9.42865 16.7695C8.879 17.0443 8.13845 17.2011 7.47485 17.2402C7.19518 17.2566 6.95465 17.2505 6.77274 17.2315C6.75372 17.0496 6.74763 16.8091 6.76408 16.5294C6.80311 15.8658 6.95993 15.1253 7.23476 14.5756L5.4459 13.6812Z"
                fill="currentColor"
            />
        </svg>
    ),
    Download: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <path
                d="M11.9253 15.9973C11.975 16.001 12.025 16.001 12.0747 15.9973C12.2832 15.9819 12.4739 15.9025 12.6273 15.7788L17.6247 11.7809C18.056 11.4359 18.1259 10.8066 17.7809 10.3753C17.4359 9.94408 16.8066 9.87416 16.3753 10.2192L13 12.9194L13 4C13 3.44771 12.5523 3 12 3C11.4477 3 11 3.44771 11 4L11 12.9194L7.6247 10.2192C7.19343 9.87416 6.56414 9.94408 6.21913 10.3753C5.87412 10.8066 5.94404 11.4359 6.37531 11.7809L11.3724 15.7786C11.5258 15.9024 11.7167 15.9818 11.9253 15.9973Z"
                fill="currentColor"
            />
            <path
                d="M4 16C4 15.4477 3.55228 15 3 15C2.44772 15 2 15.4477 2 16V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V16C22 15.4477 21.5523 15 21 15C20.4477 15 20 15.4477 20 16V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V16Z"
                fill="currentColor"
            />
        </svg>
    ),
    Setting: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <g clipPath="url(#clip0_106_1229)">
                <path
                    d="M10.2443 4.12432C10.8173 2.45186 13.1827 2.45186 13.7557 4.12432V4.12432C14.1177 5.18098 15.3243 5.68077 16.3275 5.18959V5.18959C17.9153 4.41217 19.5878 6.08472 18.8104 7.67251V7.67251C18.3192 8.67568 18.819 9.88228 19.8757 10.2443V10.2443C21.5481 10.8173 21.5481 13.1827 19.8757 13.7557V13.7557C18.819 14.1177 18.3192 15.3243 18.8104 16.3275V16.3275C19.5878 17.9153 17.9153 19.5878 16.3275 18.8104V18.8104C15.3243 18.3192 14.1177 18.819 13.7557 19.8757V19.8757C13.1827 21.5481 10.8173 21.5481 10.2443 19.8757V19.8757C9.88228 18.819 8.67568 18.3192 7.67251 18.8104V18.8104C6.08472 19.5878 4.41217 17.9153 5.18959 16.3275V16.3275C5.68077 15.3243 5.18098 14.1177 4.12432 13.7557V13.7557C2.45186 13.1827 2.45186 10.8173 4.12432 10.2443V10.2443C5.18098 9.88228 5.68077 8.67568 5.18959 7.67251V7.67251C4.41217 6.08472 6.08472 4.41217 7.67251 5.18959V5.18959C8.67568 5.68077 9.88228 5.18098 10.2443 4.12432V4.12432Z"
                    stroke="currentColor"
                    strokeWidth={2}
                />
                <circle
                    cx={12}
                    cy={12}
                    r={3}
                    stroke="currentColor"
                    strokeWidth={2}
                />
            </g>
            <defs>
                <clipPath id="clip0_106_1229">
                    <rect width={24} height={24} fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    HelpCenter: (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none"
        >
            <g clipPath="url(#clip0_106_1240)">
                <circle
                    cx={12}
                    cy={12}
                    r={9}
                    transform="rotate(45 12 12)"
                    stroke="currentColor"
                    strokeWidth={2}
                />
                <circle
                    cx={12}
                    cy={12}
                    r={4}
                    transform="rotate(45 12 12)"
                    stroke="currentColor"
                    strokeWidth={2}
                />
                <path
                    d="M18.364 5.63605L14.8284 9.17158"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                />
                <path
                    d="M9.17157 14.8284L5.63604 18.364"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                />
                <path
                    d="M18.364 18.364L14.8284 14.8284"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                />
                <path
                    d="M9.17157 9.17157L5.63604 5.63604"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_106_1240">
                    <rect width={24} height={24} fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    Save: (
        <svg
            className="h-6 w-6 text-current"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />{" "}
            <polyline points="17 21 17 13 7 13 7 21" /> <polyline points="7 3 7 8 15 8" />
        </svg>

    ),
    Work: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-600"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
        </svg>
    ),
    MoveDown: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75"
            />
        </svg>
    ),
    Hide: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    ),
    BulletHidden: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-4 w-4 text-gray-700"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
        </svg>
    ),
    New: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="-ml-0.5 mr-1.5 h-5 w-5 text-link"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
            />
        </svg>
    ),
    Education: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-600"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
        </svg>
    ),
    MoveUp: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75"
            />
        </svg>
    ),
    Project: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-600"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
        </svg>
    ),
    Skill: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-600"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
            />
        </svg>
    ),
    Show: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
        </svg>
    ),
    ResumeSetting: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-6 w-6 text-gray-600"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    )
} as { [key: string]: React.SVGProps<SVGSVGElement> }

export default Icon
