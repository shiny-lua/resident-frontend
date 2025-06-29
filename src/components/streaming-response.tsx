import React from "react";

interface StreamingResponseProps {
    isLoading: boolean;
    isStreaming: boolean;
    streamingText: string;
    finalResponse: string;
    questionNumber: number;
}

const StreamingResponse: React.FC<StreamingResponseProps> = ({
    isLoading,
    isStreaming,
    streamingText,
    finalResponse,
    questionNumber
}) => {
    return (
        <div className="flex items-start space-x-3 ml-2">
            {/* Avatar with different states */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                ) : isStreaming ? (
                    <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-green-600 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-green-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                ) : (
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </div>

            {/* Content based on state */}
            <div className="flex-1 min-w-0">
                {isLoading ? (
                    // Loading State
                    <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                        <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-slate-500">Generating response...</span>
                        </div>
                    </div>
                ) : isStreaming ? (
                    // Streaming State
                    <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {streamingText}
                            <span className="inline-block w-2 h-5 bg-green-600 animate-pulse ml-1"></span>
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-green-600 font-medium flex items-center">
                                <div className="flex space-x-1 mr-2">
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                Streaming...
                            </span>
                        </div>
                    </div>
                ) : finalResponse ? (
                    // Completed State
                    <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{finalResponse}</p>
                        <div className="mt-2 flex items-center justify-end">
                            <span className="text-xs text-green-600 font-medium">AI Response</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default StreamingResponse; 