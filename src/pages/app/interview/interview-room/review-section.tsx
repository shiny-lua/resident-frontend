import { useState } from "react";
import Icon from "../../../../components/icon";
import { Rating } from 'react-simple-star-rating'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
const ReviewSection = () => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();
    const [rating, setRating] = useState(0)
    const [isReview, setIsReview] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [feedback, setFeedback] = useState("")

    const handleRating = (rate: number) => {
        setRating(rate)
        setIsReview(true)
    }

    const handleReRate = () => {
        setIsReview(false)
        setRating(0)
    }

    const handleSubmit = () => {
        console.log({ rating, feedback })
        setIsSubmit(true)
    }

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
                    <div className="flex gap-4">
                        <button 
                            onClick={handleReturnHome}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg-sky-500 text-white hover:bg-sky-600 h-10 px-4 py-2"
                        >
                            Return Home
                        </button>
                    </div>
                    <div className="w-4/5 rounded-lg border shadow-md md:w-96 p-6 mt-4 lg:mt-12">
                        {(isReview && !isSubmit) && (
                            <div className="flex flex-col space-y-4 w-full max-w-lg">
                                <div className="text-lg font-semibold text-slate-900">
                                    Give us feedback on our product!
                                </div>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="min-h-[120px] w-full rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                    placeholder="Type anything you wish to share (e.g. bug report, feature request...)"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={handleReRate}
                                        className="inline-flex items-center justify-center rounded-lg border border-sky-500 px-5 py-2.5 text-sm font-medium text-sky-500 hover:bg-sky-50 hover:border-sky-600 hover:text-sky-600 transition-colors"
                                    >
                                        Re-rate
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                        {(!isReview && !isSubmit) && (
                            <div className="flex flex-col items-center">
                                <div className="text-sm font-medium text-slate-900">
                                    How do you feel about this experience?
                                </div>
                                <div className="mt-4 flex">
                                    <Rating
                                        onClick={handleRating}
                                        allowFraction
                                        fillColorArray={fillColorArray}
                                    />
                                </div>
                            </div>
                        )}
                        {isSubmit && (
                            <div className="relative flex flex-col items-center">
                                <div className="text-md font-medium text-slate-900">
                                    Thank you for your feedback!
                                </div>
                            </div>
                        )}
                    </div>
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
