import React from "react";

interface Question {
    question: string;
    category: string;
    expected_keywords: string[];
}

interface Evaluation {
    score: number;
    feedback: string;
    suggestions: string[];
}

interface EvaluationPanelProps {
    evaluation: Evaluation;
    question: Question;
    response: string;
    onNext: () => void;
    onClose: () => void;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({
    evaluation,
    question,
    response,
    onNext,
    onClose
}) => {
    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBackground = (score: number) => {
        if (score >= 8) return 'bg-green-100';
        if (score >= 6) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">AI Evaluation</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Score */}
                <div className={`p-4 rounded-lg ${getScoreBackground(evaluation.score)}`}>
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Overall Score</h4>
                        <span className={`text-2xl font-bold ${getScoreColor(evaluation.score)}`}>
                            {evaluation.score}/10
                        </span>
                    </div>
                    <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full ${evaluation.score >= 8 ? 'bg-green-500' : evaluation.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${(evaluation.score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Question & Response */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Question</h4>
                    <p className="text-sm text-gray-700 mb-3">{question.question}</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Your Response</h4>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border">{response}</p>
                </div>

                {/* Feedback */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">AI Feedback</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{evaluation.feedback}</p>
                </div>

                {/* Suggestions */}
                {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Suggestions for Improvement</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            {evaluation.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-600 mr-2">•</span>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Category-specific tips */}
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Tips for {question.category} Questions</h4>
                    <div className="text-sm text-purple-800">
                        {question.category.toLowerCase() === 'behavioral' && (
                            <ul className="space-y-1">
                                <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                                <li>• Provide specific examples from your experience</li>
                                <li>• Focus on your role and contributions</li>
                                <li>• Show what you learned from the experience</li>
                            </ul>
                        )}
                        {question.category.toLowerCase() === 'clinical' && (
                            <ul className="space-y-1">
                                <li>• Demonstrate systematic thinking</li>
                                <li>• Show your clinical reasoning process</li>
                                <li>• Consider patient safety and outcomes</li>
                                <li>• Acknowledge limitations and uncertainties</li>
                            </ul>
                        )}
                        {question.category.toLowerCase() === 'personal' && (
                            <ul className="space-y-1">
                                <li>• Be authentic and genuine</li>
                                <li>• Connect your experiences to your goals</li>
                                <li>• Show passion and commitment</li>
                                <li>• Demonstrate self-awareness</li>
                            </ul>
                        )}
                        {question.category.toLowerCase() === 'ethical' && (
                            <ul className="space-y-1">
                                <li>• Consider multiple perspectives</li>
                                <li>• Balance competing values</li>
                                <li>• Show ethical reasoning</li>
                                <li>• Acknowledge complexity</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t bg-gray-50">
                <div className="flex space-x-2">
                    <button
                        onClick={onNext}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EvaluationPanel;