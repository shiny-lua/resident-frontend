import React from "react";
import Modal from "../../../components/modal";
import Icon from "../../../components/icon";
import { Select } from "../../../components/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { timezones } from "./data.d";
import { meetingId } from "../../../context/helper";
import { useGlobalContext } from "../../../context";

type DropdownStatus = {
  resume: { value: string; data: string[]; prefix: string };
  role: { value: string; data: string[]; prefix: string };
  domain: { value: string; data: string[] };
  interviewType: { value: string; data: string[] };
};

const InterviewModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
  const [state] = useGlobalContext();
  const navigate = useNavigate();
  const today = new Date();
  today.setDate(today.getDate());
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const resumeDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const roleDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const domainDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const interviewTypeDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const timeDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const timeZoneDropdownRef = React.useRef<HTMLDivElement | null>(null);

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [status, setStatus] = React.useState<DropdownStatus>({
    resume: {
      value: "",
      data: ["resume1.doc", "resume2.doc"],
      prefix: "Select your resume",
    },
    role: {
      value: "",
      data: ["Doctor"],
      prefix: "Select your role",
    },
    domain: {
      value: "General",
      data: ["General"],
    },
    interviewType: {
      value: "General",
      data: ["General", "Phone Interview"],
    },
  });

  const [showResumeDropdown, setShowResumeDropdown] = React.useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);
  const [showDomainDropdown, setShowDomainDropdown] = React.useState(false);
  const [showInterviewTypeDropdown, setShowInterviewTypeDropdown] = React.useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = React.useState(false);
  const [showTimeZoneDropdown, setShowTimeZoneDropdown] = React.useState(false);

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [tabIdx, setTabIdx] = React.useState(0)
  const [dateTime, setDateTime] = React.useState({
    date: "",
    time: "",
    timezone: "UTC+00:00 Europe/London"
  })

  const onHandle = (v: string, obk: keyof DropdownStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [obk]: { ...prevStatus[obk], value: v },
    }));

    if (obk === "resume") {
      setShowResumeDropdown(false);
    }
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  React.useEffect(() => {
    const onModalClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const onDropdownClickOutside = (ref: React.RefObject<HTMLDivElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      return (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setter(false);
        }
      };
    };

    // Add event listeners to close dropdowns when clicking outside
    document.addEventListener("mousedown", onModalClickOutside);
    document.addEventListener("mousedown", onDropdownClickOutside(resumeDropdownRef, setShowResumeDropdown));
    document.addEventListener("mousedown", onDropdownClickOutside(roleDropdownRef, setShowRoleDropdown));
    document.addEventListener("mousedown", onDropdownClickOutside(domainDropdownRef, setShowDomainDropdown));
    document.addEventListener("mousedown", onDropdownClickOutside(interviewTypeDropdownRef, setShowInterviewTypeDropdown));
    document.addEventListener("mousedown", onDropdownClickOutside(timeDropdownRef, setShowTimeDropdown));
    document.addEventListener("mousedown", onDropdownClickOutside(timeZoneDropdownRef, setShowTimeZoneDropdown));

    return () => {
      document.removeEventListener("mousedown", onModalClickOutside);
      document.removeEventListener("mousedown", onDropdownClickOutside(resumeDropdownRef, setShowResumeDropdown));
      document.removeEventListener("mousedown", onDropdownClickOutside(roleDropdownRef, setShowRoleDropdown));
      document.removeEventListener("mousedown", onDropdownClickOutside(domainDropdownRef, setShowDomainDropdown));
      document.removeEventListener("mousedown", onDropdownClickOutside(interviewTypeDropdownRef, setShowInterviewTypeDropdown));
      document.removeEventListener("mousedown", onDropdownClickOutside(timeDropdownRef, setShowTimeDropdown));
      document.removeEventListener("mousedown", onDropdownClickOutside(timeZoneDropdownRef, setShowTimeZoneDropdown));
    };
  }, []);

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setStatus({ ...status, resume: { ...status.resume, value: file.name } })
      console.log("Uploaded file:", file);
    }
  };

  const onLaunch = () => {
    if (state.isLeaveInterview.status) {
      return;
    }

    onClose();
    navigate(`/app/mock-interview/mock/${meetingId(12)}`);
  }

  return (
    <Modal>
      <div
        className="grid place-items-center fixed w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm fade-in"
        style={{ opacity: 1 }}
      >
        <div
          ref={modalRef}
          className="fixed left-[50%] top-[50%] z-50 grid max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg rounded-lg max-h-[calc(100dvh-48px)] w-[95%] sm:w-5/6 grid-rows-[auto_1fr_auto] pt-8"
          style={{ pointerEvents: "auto" }}
        >
          <div className="space-y-2 text-center sm:text-left relative flex flex-row justify-between align-middle">
            <h2 className="text-lg font-semibold box-border flex-1 pr-7 text-left text-slate-900">
              Start Your Next Interview
              <div className="mt-4 border-b border-slate-100" />
            </h2>
            <div
              onClick={onClose}
              className="absolute -top-2 right-0 flex w-6 justify-center rounded-sm border align-middle hover:cursor-pointer"
              title="Close"
            >
              <Icon icon="Close" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="mb-2 flex flex-row justify-between">
                <h4 className="font-medium text-[15px]">
                  Resume{" "}
                  <div className="inline-flex items-center rounded-md border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-none bg-transparent px-1 font-normal text-slate-400">
                    Optional
                  </div>
                </h4>
                <div className="relative hidden w-5 lg:block">
                  <input
                    onChange={onFileUpload}
                    accept=".pdf,.docx,.doc,.DOC,.PDF,.DOCX"
                    type="file"
                    title="upload file"
                    className="zIndex-10 absolute left-0 top-0 h-5 w-5 cursor-pointer overflow-hidden opacity-0"
                  />
                  <Icon className="text-sky-500" icon="Upload" />
                </div>
              </div>
              <Select
                value={status.resume.value}
                data={status.resume.data}
                onHandle={onHandle}
                showDropdown={showResumeDropdown}
                onDropdown={() => setShowResumeDropdown(true)}
                dropdownRef={resumeDropdownRef}
                obk="resume"
                optionPrefix={status.resume.prefix}
              />
              <div className="block lg:hidden">
                <div className="relative mb-2 mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-400">
                  <input
                    onChange={onFileUpload}
                    accept=".pdf,.docx,.doc,.DOC,.PDF,.DOCX"
                    type="file"
                    title="upload file"
                    className="zIndex-10 absolute bottom-0 left-0 right-0 top-0 cursor-pointer overflow-hidden opacity-0"
                  />
                  <Icon icon="Upload" className="text-sky-500" />
                  <span className="text-[13px] font-medium text-slate-700">Click to Upload</span>
                </div>
                <div className="text-[13px] font-medium text-slate-400">
                  Only PDF, DOC, or DOCX files up to 10 MB are accepted.
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex flex-row justify-between">
                <h4 className="font-medium text-[15px]">
                  Role{" "}
                  <div className="inline-flex items-center rounded-md border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-none bg-transparent px-1 font-normal text-slate-400">
                    Optional
                  </div>
                </h4>
                <Link className="relative hidden w-5 lg:block" to="/app/role">
                  <Icon icon="ArrowUpRight" className="text-sky-500" />
                </Link>
              </div>
              <Select
                value={status.role.value}
                data={status.role.data}
                onHandle={onHandle}
                showDropdown={showRoleDropdown}
                onDropdown={() => setShowRoleDropdown(true)}
                dropdownRef={roleDropdownRef}
                obk="role"
                optionPrefix={status.role.prefix}
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex flex-row justify-between">
                <h4 className="font-medium text-[15px]">
                  Select Knowledge Domain(Specialization){" "}
                  <div className="inline-flex items-center rounded-md border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-none bg-transparent px-1 font-normal text-slate-400">
                    Optional
                  </div>
                </h4>
              </div>
              <Select
                value={status.domain.value}
                data={status.domain.data}
                onHandle={onHandle}
                showDropdown={showDomainDropdown}
                onDropdown={() => setShowDomainDropdown(true)}
                dropdownRef={domainDropdownRef}
                obk="domain"
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-2 flex flex-row justify-between">
                <h4 className="flex-1 font-medium">
                  Interview Type{" "}
                  <div className="inline-flex items-center rounded-md border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-none bg-transparent px-1 font-normal text-slate-400">Optional</div>
                </h4>
                <Link className="flex flex-row text-[13px] text-sky-500" to="/app/subscription">Upgrade Now<Icon icon="ArrowUpRight" className="text-sky-500" /></Link>
              </div>
              <Select
                value={status.interviewType.value}
                data={status.interviewType.data}
                onHandle={onHandle}
                showDropdown={showInterviewTypeDropdown}
                onDropdown={() => setShowInterviewTypeDropdown(true)}
                dropdownRef={interviewTypeDropdownRef}
                obk="interviewType"
              />
            </div>
            <div>
              <div className="mb-2 flex flex-row justify-between">
                <h4 className="font-medium text-[15px]">Schedule your interview</h4>
              </div>
              <div>
                <div className="h-10 items-center justify-center rounded-md bg-sky-100 p-1 flex">
                  <button onClick={() => setTabIdx(0)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdx === 0 ? "bg-white" : "bg-transparent"}`}>
                    Immediately
                  </button>
                  <button onClick={() => setTabIdx(1)} className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-[13px] font-medium flex-1 ${tabIdx !== 0 ? "bg-white" : "bg-transparent"}`}>
                    Set Date and Time
                  </button>
                </div>
                {tabIdx === 1 && (
                  <div className="space-y-5 rounded-md border border-slate-200 p-6 mt-3">
                    <div className=" ">
                      <div className="mb-1 text-base font-medium">When</div>
                      <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2">
                        <div className="space-y-2 col-span-2 flex flex-col w-full relative">
                          <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            minDate={today}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Pick a date"
                            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-md border border-input bg-white hover:bg-accent hover:text-accent-foreground px-4 py-2 h-9 pl-3 text-left font-normal text-muted-foreground outline-none"
                            calendarClassName="shadow-lg rounded-lg border bg-white"
                          />
                          <div className="absolute right-2 top-1"><Icon icon="Calandar" /></div>
                        </div>
                        <div className="space-y-2 col-span-2 flex flex-1 flex-col relative">
                          <button onClick={() => setShowTimeDropdown(true)} className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-md ring-offset-background placeholder:text-slate-700 ">
                            <span style={{ pointerEvents: "none" }}>{dateTime.time !== "" ? dateTime.time : "Select your time"}</span>
                            <Icon className="w-4 h-4 text-slate-500" icon="ChevronDown" />
                          </button>
                          {showTimeDropdown && (
                            <div ref={timeDropdownRef} className="absolute left-0 bottom-12 w-full bg-white z-1">
                              <div
                                className="h-[200px] overflow-y-scroll scrollbar-hide border border-gray-300 rounded-md"
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                              >
                                <ul className="space-y-2">
                                  {timeOptions.map((time, index) => (
                                    <li key={index} onClick={() => setDateTime({ ...dateTime, time })} className="flex gap-2 py-1 px-4 text-md items-center bg-white hover:bg-gray-100 cursor-pointer">
                                      <div className="w-4">{dateTime.time === time && <Icon className="text-sky-500" icon="Check" />}</div>
                                      {time}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <h4 className="flex-1 font-medium">Time Zone</h4>
                      <div className="relative">
                        <button onClick={() => setShowTimeZoneDropdown(true)} className=" flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-md ring-offset-background placeholder:text-slate-700 " >
                          <span style={{ pointerEvents: "none" }}>{dateTime.timezone}</span>
                          <Icon className="w-4 h-4 text-slate-500" icon="ChevronDown" />
                        </button>
                        {showTimeZoneDropdown && (
                          <div ref={timeZoneDropdownRef} className="absolute left-0 bottom-[40px] w-full bg-white z-1">
                            <div
                              className="h-[300px] overflow-y-scroll scrollbar-hide border border-gray-300 rounded-md"
                              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                              <ul className="space-y-2">
                                {timezones.map((i: { value: string, label: string }, k) => (
                                  <li key={k} onClick={() => setDateTime({ ...dateTime, timezone: i.label })} className="flex gap-2 py-1 px-4 text-md items-center bg-white hover:bg-gray-100 cursor-pointer">
                                    <div className="w-4">{dateTime.timezone === i.label && <Icon className="text-sky-500" icon="Check" />}</div>
                                    {i.label}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2">
            <button onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-[13px] font-medium ring-offset-background transition-colors border bg-white hover:bg-sky-100 px-4 py-2 mt-2 sm:mt-0 h-[42px] md:h-9">
              Cancel
            </button>
            <span>
              <button onClick={onLaunch} className={`inline-flex justify-center items-center text-center text-white px-4 py-2 mt-2 sm:mt-0 h-[42px] md:h-9 rounded-md ${state.isLeaveInterview.status ? "bg-slate-500" : "bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)] "}`}>
                Launch
              </button>
            </span>
          </div>
        </div>
      </div>
    </Modal >
  );
};

export default InterviewModal;
