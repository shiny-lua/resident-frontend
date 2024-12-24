import React from "react";

const Hamburger = () => {

  const [isOpenedMenu, setOpenedMenu] = React.useState(false)

  const onMenu = (e: any) => {
    e.stopPropagation();
    setOpenedMenu(!isOpenedMenu)
  }

  return (
    <div
      onClick={(e) => onMenu(e)}
      className="w-9 h-9 rounded-lg 2xl:hidden flex items-center justify-center z-10 cursor-pointer "
    >
      <span className="relative block h-5.5 w-5.5 cursor-pointer">
        <span className="du-block absolute px-[2.5px] right-0 h-full w-full">
          <span
            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-smdelay-[0] duration-200 ease-in-out bg-black ${!isOpenedMenu && "!w-full delay-300"
              }`}
          ></span>
          <span
            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-smdelay-150 duration-200 ease-in-out bg-black ${!isOpenedMenu && "delay-400 !w-full"
              }`}
          ></span>
          <span
            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-smdelay-200 duration-200 ease-in-out bg-black ${!isOpenedMenu && "!w-full delay-500"
              }`}
          ></span>
        </span>
        <span className="absolute right-0 h-full w-full rotate-45">
          <span
            className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-smdelay-300 duration-200 ease-in-out bg-black ${!isOpenedMenu && "!h-0 !delay-[0]"
              }`}
          ></span>
          <span
            className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm duration-200 ease-in-out bg-black ${!isOpenedMenu && "!h-0 !delay-200"
              }`}
          ></span>
        </span>
      </span>
    </div>
  )
}

export default Hamburger