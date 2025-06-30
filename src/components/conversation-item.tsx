import React from "react";
import QuestionDisplay from "./question-display";
import StreamingResponse from "./streaming-response";

interface ConversationItemProps {
    question: string;
    answer?: string;
    questionNumber: number;
    isLoading?: boolean;
    isStreaming?: boolean;
    streamingText?: string;
    timestamp?: Date;
    isComplete?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
    question,
    answer,
    questionNumber,
    isLoading = false,
    isStreaming = false,
    streamingText = "",
    timestamp,
    isComplete = false
}) => {
    return (
        <div className="space-y-3 border-b border-slate-100 pb-4 last:border-b-0 animate-fadeIn">
            {/* Question */}
            <QuestionDisplay 
                question={question} 
                questionNumber={questionNumber} 
            />
            
            {/* Response */}
            {(isLoading || isStreaming || answer) && (
                <StreamingResponse
                    isLoading={isLoading}
                    isStreaming={isStreaming}
                    streamingText={streamingText}
                    finalResponse={answer || ""}
                    questionNumber={questionNumber}
                />
            )}

            {/* Timestamp for completed conversations */}
            {isComplete && timestamp && answer && (
                <div className="ml-11 text-xs text-slate-400">
                    Completed at {new Date(timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            )}
        </div>
    );
};

export default ConversationItem; 