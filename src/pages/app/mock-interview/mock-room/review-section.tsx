import { useState } from "react";
import Icon from "../../../../components/icon";
import { Rating } from 'react-simple-star-rating'
import { useNavigate } from "react-router-dom";
import { mockInterviewData } from "../../components/data.d";
import { Radio } from "../../../../components/radio";
import { useGlobalContext } from "../../../../context";
const ReviewSection = () => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();

    const [status, setStatus] = useState({
        rate: 0,
        problem: "",
        feeling: "",
        satisfaction: "",
        suggestion: "",
        tabIdx: 0
    })

    const [isClose, setIsClose] = useState(false);

    const handleReturnHome = () => {
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        })
        navigate('/app/live-interview')
    }
    const fillColorArray = [
        "#f17a45",
        "#f17a45",
        "#f19745",
        "#f19745",
        "#f1a545",
        "#f1a545",
        "#f1b345",
        "#f1b345",
        "#f1d045",
        "#f1d045"
    ];


    return (
        <div className="h-dvh bg-design-light">
            <main className="relative flex h-screen items-center justify-center bg-white">
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="text-4xl md:text-[88px] md:leading-[132px]">🚀</div>
                    <div className="px-4 text-center text-lg font-semibold text-slate-900 md:px-0">
                        Well done! You finished your interview with our AI Copilot!
                    </div>
                    <div className="text-gray-600 mt-4 px-6 text-center text-sm">
                        View the interview report approximately 5 minutes later.
                    </div>
                    <div className="mt-4 px-4 sm:px-6 lg:px-8" />
                    <div className="flex gap-4 mb-5">
                        <button
                            onClick={handleReturnHome}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-semibold bg-sky-500 text-white hover:bg-sky-600 px-4 py-3"
                        >
                            Return Home
                        </button>
                    </div>
                    {!isClose && (
                        <div className="w-4/5 rounded-lg border shadow-md md:w-110 p-6 mt-4 lg:mt-12">
                            {status.tabIdx === 0 && (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1">
                                        <div className="text-md font-semibold text-slate-900">
                                            1.
                                        </div>
                                        <div className="text-md font-semibold text-slate-900">
                                            How likely are you to recommend our Mock Interview to a friend?
                                        </div>
                                    </div>
                                    <div className="mt-4 flex">
                                        <Rating
                                            onClick={(rate) => setStatus({ ...status, rate })}
                                            allowFraction
                                            fillColorArray={fillColorArray}
                                            initialValue={0}
                                            size={30}
                                            iconsCount={10}
                                        />
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setStatus({ ...status, tabIdx: 1 })}>Next</button>
                                    </div>
                                </div>
                            )}
                            {status.tabIdx === 1 && (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1">
                                        <div className="text-md font-semibold text-slate-900">
                                            2.
                                        </div>
                                        <div className="text-md font-semibold text-slate-900">What problem do you want the Mock Interview to help with?</div>
                                    </div>
                                    <div className="mt-4 flex flex-col gap-2 w-full ml-10">
                                        {mockInterviewData.problems.map((problem, index) => (
                                            <Radio key={index} value={problem} isChecked={status.problem === problem} onChangeRadio={() => setStatus({ ...status, problem })} />
                                        ))}
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setStatus({ ...status, tabIdx: 2 })}>Next</button>
                                    </div>
                                </div>
                            )}
                            {status.tabIdx === 2 && (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1">
                                        <div className="text-md font-semibold text-slate-900">
                                            3.
                                        </div>
                                        <div className="text-md font-semibold text-slate-900">How do you feel about the pacing of the interaction with the copilot avatar?</div>
                                    </div>
                                    <div className="mt-4 flex flex-col gap-2 w-full ml-10">
                                        {mockInterviewData.feelings.map((feeling, index) => (
                                            <Radio key={index} value={feeling} isChecked={status.feeling === feeling} onChangeRadio={() => setStatus({ ...status, feeling })} />
                                        ))}
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setStatus({ ...status, tabIdx: 3 })}>Next</button>
                                    </div>
                                </div>
                            )}
                            {status.tabIdx === 3 && (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1">
                                        <div className="text-md font-semibold text-slate-900">
                                            4.
                                        </div>
                                        <div className="text-md font-semibold text-slate-900">How satisfied are you with the responses the copilot provides?</div>
                                    </div>
                                    <div className="mt-4 flex flex-col gap-2 w-full ml-10">
                                        {mockInterviewData.satisfaction.map((feeling, index) => (
                                            <Radio key={index} value={feeling} isChecked={status.feeling === feeling} onChangeRadio={() => setStatus({ ...status, feeling })} />
                                        ))}
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setStatus({ ...status, tabIdx: 4 })}>Next</button>
                                    </div>
                                </div>
                            )}
                            {status.tabIdx === 4 && (
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-1">
                                        <div className="text-md font-semibold text-slate-900">
                                            5.
                                        </div>
                                        <div className="text-md font-semibold text-slate-900">Do you have any additional comments or suggestions?</div>
                                    </div>
                                    <div className="mt-4 w-full">
                                        <textarea
                                            value={status.suggestion}
                                            onChange={(e) => setStatus({ ...status, suggestion: e.target.value })}
                                            className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                            placeholder="Type anything you wish to share (e.g. bug report, feature request...)"
                                        />
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setStatus({ ...status, tabIdx: 5 })}>Next</button>
                                    </div>
                                </div>
                            )}
                            {status.tabIdx === 5 && (
                                <div className="relative flex flex-col">
                                    <div className="text-md font-semibold text-slate-900">
                                        Thank you for your feedback!
                                    </div>
                                    <div className="flex justify-end w-full mt-4">
                                        <button className="bg-sky-500 text-md text-white px-4 py-2 rounded-md hover:bg-sky-600" onClick={() => setIsClose(true)}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-x-1 rounded-md bg-green-200 px-2 py-2 leading-[14px] absolute bottom-4">
                    <Icon icon="Lock" className="text-green-900" />
                    <span className="text-sm text-green-900">
                        Secured by 256-bit AES and 256-bit SSL/TLS encryption
                    </span>
                </div>
            </main>
        </div>

    )
}

export default ReviewSection;
