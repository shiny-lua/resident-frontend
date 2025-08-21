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
                        Question {currentQuestionIndex + 1} of 10
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
                {userRole === 'student' ? (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Instructions</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• AI question will be spoken automatically</li>
                                <li>• Recording will start automatically after the question</li>
                                <li>• Speak your answer clearly and naturally</li>
                                <li>• Say "That is all" when you finish your answer</li>
                                <li>• Your response will be automatically processed</li>
                                <li>• AI will move to the next question automatically</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Question Type: {currentQuestion.category}</h4>
                            <div className="text-sm text-gray-700">
                                {currentQuestion.category.toLowerCase() === 'behavioral' && (
                                    <p>This is a behavioral question. Use the STAR method (Situation, Task, Action, Result) to structure your response with specific examples from your experience.</p>
                                )}
                                {currentQuestion.category.toLowerCase() === 'clinical' && (
                                    <p>This is a clinical question. Demonstrate your clinical reasoning, systematic thinking, and consideration of patient safety and outcomes.</p>
                                )}
                                {currentQuestion.category.toLowerCase() === 'personal' && (
                                    <p>This is a personal question. Be authentic and genuine, connecting your experiences to your goals and showing passion for your chosen specialty.</p>
                                )}
                                {currentQuestion.category.toLowerCase() === 'ethical' && (
                                    <p>This is an ethical question. Consider multiple perspectives, balance competing values, and show your ethical reasoning process.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-medium text-yellow-900 mb-2">Tips for Success</h4>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Be specific and provide concrete examples</li>
                                <li>• Show your thought process and reasoning</li>
                                <li>• Demonstrate self-awareness and reflection</li>
                                <li>• Connect your experiences to your future goals</li>
                                <li>• Be honest about challenges and what you learned</li>
                                <li>• Speak clearly and at a good pace</li>
                                <li>• The AI will automatically process your response</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">Interview Status</h4>
                            <div className="bg-white p-3 rounded border min-h-[100px]">
                                {isEvaluating ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                            <p className="text-sm text-blue-600 font-medium">Processing your response...</p>
                                            <p className="text-xs text-gray-500 mt-1">AI is analyzing your answer and generating the next question</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <div className="animate-pulse w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                            <span className="text-sm font-medium text-red-600">Recording in progress</span>
                                        </div>
                                        <p className="text-sm text-gray-600">Speak your answer clearly and naturally</p>
                                        <p className="text-xs text-gray-500 mt-1">Say "That is all" when you finish your answer</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default QuestionPanel; 