import React from "react";

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
                    <p className="text-sm text-slate-800 leading-relaxed">{question}</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionDisplay; 