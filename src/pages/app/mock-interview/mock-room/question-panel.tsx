import React from "react";

interface Question {
    question: string;
    category: string;
    expected_keywords: string[];
}

interface QuestionPanelProps {
    currentQuestion: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    transcribedText: string;
    userRole: 'examiner' | 'student';
    isEvaluating: boolean;
    onEvaluate: () => void;
    onNextQuestion: () => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    transcribedText,
    userRole,
    isEvaluating,
    onEvaluate,
    onNextQuestion
}) => {
    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'behavioral':
                return 'bg-blue-100 text-blue-800';
            case 'clinical':
                return 'bg-green-100 text-green-800';
            case 'personal':
                return 'bg-purple-100 text-purple-800';
            case 'ethical':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentQuestion.category)}`}>
                        {currentQuestion.category}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                    {currentQuestion.question}
                </h3>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                {userRole === 'examiner' ? (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Examiner Instructions</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Ask the question clearly to the student</li>
                                <li>• Listen to their response</li>
                                <li>• Click "Evaluate Response" when they finish</li>
                                <li>• Review the AI evaluation with the student</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Expected Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {currentQuestion.expected_keywords.map((keyword, index) => (
                                    <span 
                                        key={index}
                                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-medium text-yellow-900 mb-2">Student Response</h4>
                            <div className="bg-white p-3 rounded border">
                                {transcribedText ? (
                                    <p className="text-sm text-gray-700">{transcribedText}</p>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Waiting for student response...</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">Student Instructions</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>• Listen to the examiner's question</li>
                                <li>• Provide a clear, structured response</li>
                                <li>• Use specific examples when possible</li>
                                <li>• Speak clearly and at a good pace</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Your Response</h4>
                            <div className="bg-white p-3 rounded border min-h-[100px]">
                                {transcribedText ? (
                                    <p className="text-sm text-gray-700">{transcribedText}</p>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Your response will appear here...</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Tips for This Question</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Structure your answer (STAR method for behavioral)</li>
                                <li>• Be specific and provide examples</li>
                                <li>• Show your reasoning and thought process</li>
                                <li>• Demonstrate professionalism and empathy</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t bg-gray-50">
                {userRole === 'examiner' && transcribedText && (
                    <div className="space-y-2">
                        <button
                            onClick={onEvaluate}
                            disabled={isEvaluating || !transcribedText.trim()}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isEvaluating ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Evaluating...
                                </div>
                            ) : (
                                'Evaluate Response'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionPanel; 