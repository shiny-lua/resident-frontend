import React from "react";
import InterviewerSection from "./interviewer-section";
import { useGlobalContext } from "../../../../context";
import ConversationItem from "../../../../components/conversation-item";

const ModelResponseSection = () => {
    const [state, { dispatch }] = useGlobalContext();
    const [isAutoScroll, setIsAutoScroll] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when new content is added
    React.useEffect(() => {
        if (isAutoScroll && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [state.currentQuestion, state.currentResponse, state.conversationHistory, isAutoScroll]);

    // Auto scroll down when a new response is added (always, for better UX)
    React.useEffect(() => {
        if (scrollRef.current && (state.currentResponse || state.streamingResponse) && !state.isLoadingResponse) {
            // Delay scroll slightly to allow content to render
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        top: scrollRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [state.currentResponse, state.streamingResponse, state.isLoadingResponse]);

    // Auto scroll during streaming (more frequent updates)
    React.useEffect(() => {
        if (scrollRef.current && state.isStreamingResponse && state.streamingResponse) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'auto' // Faster scroll during streaming
            });
        }
    }, [state.streamingResponse, state.isStreamingResponse]);

    // Scroll when new question appears
    React.useEffect(() => {
        if (scrollRef.current && state.currentQuestion) {
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        top: scrollRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [state.currentQuestion]);

    const renderContent = () => {
        if (state.conversationHistory.length === 0 && !state.currentQuestion) {
            return (
                <div className="flex h-full flex-1 flex-col items-center justify-center text-slate-500 px-6">
                    <div className="max-w-sm text-center">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-2">Ready to Start</h3>
                        <p className="text-sm text-slate-500">
                            Interview Copilot™ is waiting for questions from your interview session.
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div
                className="flex flex-1 flex-col h-full overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    style={{ scrollBehavior: 'smooth' }}
                >
                                        {/* Display conversation history */}
                    {state.conversationHistory.map((conversation, index) => (
                        <ConversationItem
                            key={index}
                            question={conversation.question}
                            answer={conversation.answer}
                            questionNumber={index + 1}
                            timestamp={conversation.timestamp}
                            isComplete={true}
                        />
                    ))}

                    {/* Display current question being processed - only if not already in history */}
                    {state.currentQuestion && !state.conversationHistory.some(conv => conv.question === state.currentQuestion) && (
                        <ConversationItem
                            question={state.currentQuestion}
                            answer={state.currentResponse}
                            questionNumber={state.conversationHistory.length + 1}
                            isLoading={state.isLoadingResponse}
                            isStreaming={state.isStreamingResponse}
                            streamingText={state.streamingResponse}
                        />
                    )}
                </div>

                {/* Conversation summary at bottom */}
                {(state.conversationHistory.length > 0 || state.currentQuestion) && (
                    <div className="border-t border-slate-200 px-4 py-2 bg-slate-50">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>
                                {state.conversationHistory.length} completed •
                                {(state.currentQuestion && !state.conversationHistory.some(conv => conv.question === state.currentQuestion)) || state.isStreamingResponse ? ' 1 in progress' : ' Ready for next question'}
                            </span>
                            {isAutoScroll && (
                                <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Auto-scroll active</span>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };
    return (
        <div className="flex gap-5 w-4/5 justify-center">
            <div
                className="min-w-[400px] rounded-t-lg"
                style={{ flex: "40 1 0px", overflow: "hidden" }}
            >
                <div className="relative flex flex-1 flex-col border border-slate-100 bg-white h-full">
                    <div className="items-center justify-between border-b border-slate-100 px-4 md:flex md:px-6">
                        <div className="flex items-center h-16 gap-3">
                            <div className="flex h-auto flex-1 flex-col">
                                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900">
                                    Interview Copilot w/ GPT4o
                                    <div className="inline-flex items-center gap-1 align-top">
                                        <input
                                            id="auto-gpt4o-pip"
                                            type="checkbox"
                                            className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="auto-gpt4o-pip">Auto PIP</label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1 bg-[#D9F1CD]">
                                        <span className="relative me-2 flex h-2 w-2">
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#129F42]" />
                                        </span>
                                        <span className="text-xs font-medium text-[#129F42]">
                                            Ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 gap-2 text-slate-700">
                            <button
                                onClick={() => {
                                    dispatch({ type: 'conversationHistory', payload: [] });
                                    dispatch({ type: 'currentQuestion', payload: '' });
                                    dispatch({ type: 'currentResponse', payload: '' });
                                    dispatch({ type: 'streamingResponse', payload: '' });
                                    dispatch({ type: 'isLoadingResponse', payload: false });
                                    dispatch({ type: 'isStreamingResponse', payload: false });
                                }}
                                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            >
                                Clear History
                            </button>
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isAutoScroll}
                                    onChange={() => setIsAutoScroll(!isAutoScroll)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-teal-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Auto Scroll
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center overflow-y-hidden">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <div
                className="min-w-[0px] rounded-t-lg"
                style={{ flex: "40 1 0px", overflow: "hidden" }}
            >
                <div className="relative flex flex-1 flex-col border border-slate-100 bg-white h-full">
                    <div className="items-center justify-between border-b border-slate-100 px-4 md:flex md:px-6">
                        <div className="flex items-center h-16 gap-3">
                            <div className="flex h-auto flex-1 flex-col">
                                <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900">
                                    Interview Copilot w/ Gemini 2.0 Flash
                                    <div className="inline-flex items-center gap-1 align-top">
                                        <input
                                            id="auto-pip"
                                            type="checkbox"
                                            className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="auto-pip">Auto PIP</label>
                                    </div>
                                </div>
                                <div className="flex items-center mt-1">
                                    <div className="flex items-center rounded-full border border-slate-100 px-2.5 py-1 bg-[#D9F1CD]">
                                        <span className="relative me-2 flex h-2 w-2">
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#129F42]" />
                                        </span>
                                        <span className="text-xs font-medium text-[#129F42]">
                                            Ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center overflow-y-hidden">
                        <div className="flex w-full flex-col items-center justify-center overflowscroll text-slate-500">
                            <h4 className="text-center text-sm font-medium">
                                The Interview Copilot™ is ready and waiting for the
                            </h4>
                            <h4 className="text-center text-sm font-medium">interviewer's questions.</h4>
                        </div>
                        <div
                            className="flex flex-1 flex-col gap-1 pl-4 lg:pl-0 lg:pr-1 overflow-y-scroll md:gap-0 md:px-0"
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelResponseSection;
