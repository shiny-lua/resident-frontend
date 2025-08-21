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
                {/* Real-time Interview Progress */}
                {sessionStarted && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Real-time Interview Progress</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-blue-800">Question {evaluations.length + 1} of 10</span>
                            <span className="text-sm text-blue-800 font-medium">
                                {Math.round(((evaluations.length) / 10) * 100)}% Complete
                            </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(((evaluations.length) / 10) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                            AI automatically processes responses when you say "That is all"
                        </p>
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

                        {/* Auto-Progress Notice */}
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                                <span className="text-sm text-green-800 font-medium">
                                    Automatically progressing to next question...
                                </span>
                            </div>
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