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
    currentEvaluation: Evaluation | null;
    evaluations: Array<{
        question_index: number;
        question: string;
        response: string;
        evaluation: Evaluation;
        timestamp: string;
    }>;
    onTranscriptionUpdate: (text: string) => void;
    onStartSession: () => Promise<void>;
    onNextQuestion: () => Promise<void>;
    onEndSession: () => Promise<void>;
    sessionStarted: boolean;
    isLastQuestion: boolean;
    sessionCompleted: boolean;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({
    currentEvaluation,
    evaluations,
    onTranscriptionUpdate,
    onStartSession,
    onNextQuestion,
    onEndSession,
    sessionStarted,
    isLastQuestion,
    sessionCompleted
}) => {
    const [responseText, setResponseText] = React.useState("");
    const [isStarting, setIsStarting] = React.useState(false);
    const [isMovingNext, setIsMovingNext] = React.useState(false);
    const [isEnding, setIsEnding] = React.useState(false);

    const handleStartSession = async () => {
        setIsStarting(true);
        try {
            await onStartSession();
        } finally {
            setIsStarting(false);
        }
    };

    const handleNextQuestion = async () => {
        setIsMovingNext(true);
        try {
            await onNextQuestion();
            setResponseText("");
        } finally {
            setIsMovingNext(false);
        }
    };

    const handleEndSession = async () => {
        setIsEnding(true);
        try {
            await onEndSession();
        } finally {
            setIsEnding(false);
        }
    };

    const handleResponseChange = (text: string) => {
        setResponseText(text);
        onTranscriptionUpdate(text);
    };

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
                <h3 className="text-lg font-semibold text-gray-900">Response & Evaluation</h3>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Session Controls */}
                {!sessionStarted && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Start Interview</h4>
                        <p className="text-sm text-blue-800 mb-3">
                            Click the button below to begin your mock interview session.
                        </p>
                        <button
                            onClick={handleStartSession}
                            disabled={isStarting}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isStarting ? 'Starting...' : 'Start Interview'}
                        </button>
                    </div>
                )}

                {/* Current Evaluation */}
                {currentEvaluation && (
                    <div className="bg-white border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium text-gray-900">Current Evaluation</h4>
                        
                        {/* Score */}
                        <div className={`p-4 rounded-lg ${getScoreBackground(currentEvaluation.score)}`}>
                            <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-900">Overall Score</h5>
                                <span className={`text-2xl font-bold ${getScoreColor(currentEvaluation.score)}`}>
                                    {currentEvaluation.score}/10
                                </span>
                            </div>
                            <div className="mt-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${currentEvaluation.score >= 8 ? 'bg-green-500' : currentEvaluation.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                        style={{ width: `${(currentEvaluation.score / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-medium text-blue-900 mb-2">AI Feedback</h5>
                            <p className="text-sm text-blue-800 leading-relaxed">{currentEvaluation.feedback}</p>
                        </div>

                        {/* Suggestions */}
                        {currentEvaluation.suggestions && currentEvaluation.suggestions.length > 0 && (
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h5 className="font-medium text-green-900 mb-2">Suggestions for Improvement</h5>
                                <ul className="text-sm text-green-800 space-y-1">
                                    {currentEvaluation.suggestions.map((suggestion, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex space-x-3">
                            {!isLastQuestion ? (
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={isMovingNext}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isMovingNext ? 'Loading...' : 'Next Question'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleEndSession}
                                    disabled={isEnding}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isEnding ? 'Ending...' : 'Complete Interview'}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Previous Evaluations */}
                {evaluations.length > 0 && (
                    <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Previous Evaluations</h4>
                        <div className="space-y-3">
                            {evaluations.slice(-3).reverse().map((evalItem, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-900">
                                            Question {evalItem.question_index + 1}
                                        </span>
                                        <span className={`text-sm font-bold ${getScoreColor(evalItem.evaluation.score)}`}>
                                            {evalItem.evaluation.score}/10
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{evalItem.question}</p>
                                    <p className="text-xs text-gray-700 line-clamp-2">{evalItem.evaluation.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EvaluationPanel;