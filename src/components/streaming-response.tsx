import React from "react";
import ReactMarkdown from "react-markdown";

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
                        <div className="text-sm text-slate-700 leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:mb-2 [&>p]:last:mb-0 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:mb-2 [&>li]:mb-1 [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-gray-100 [&>pre]:p-2 [&>pre]:rounded [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600">
                            <ReactMarkdown>
                                {streamingText}
                            </ReactMarkdown>
                            <span className="inline-block w-2 h-5 bg-green-600 animate-pulse ml-1"></span>
                        </div>
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
                        <div className="text-sm text-slate-700 leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:mb-2 [&>p]:last:mb-0 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:mb-2 [&>li]:mb-1 [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-gray-100 [&>pre]:p-2 [&>pre]:rounded [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600">
                            <ReactMarkdown>
                                {finalResponse}
                            </ReactMarkdown>
                        </div>
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