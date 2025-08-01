import React from "react";
import ReactMarkdown from "react-markdown";

interface QuestionDisplayProps {
    question: string;
    questionNumber: number;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
    question,
    questionNumber
}) => {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-blue-600">Q{questionNumber}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-sm text-slate-800 leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>p]:mb-2 [&>p]:last:mb-0 [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mb-2 [&>h3]:text-sm [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:mb-2 [&>li]:mb-1 [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>pre]:bg-gray-100 [&>pre]:p-2 [&>pre]:rounded [&>pre]:overflow-x-auto [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600">
                        <ReactMarkdown>
                            {question}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDisplay; 