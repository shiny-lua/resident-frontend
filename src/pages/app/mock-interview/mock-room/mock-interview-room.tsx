import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { showToast } from "../../../../context/helper";
import ZegoCloudCall from "./zego-cloud-call";
import QuestionPanel from "./question-panel";
import EvaluationPanel from "./evaluation-panel";

interface MockInterviewSession {
    session_code: string;
    session_id: string;
    specialty: string;
    status: string;
    questions: Array<{
        question: string;
        category: string;
        expected_keywords: string[];
    }>;
    current_question_index: number;
    evaluations: Array<{
        question_index: number;
        question: string;
        response: string;
        evaluation: {
            score: number;
            feedback: string;
            suggestions: string[];
        };
        timestamp: string;
    }>;
    examiner_email: string | null;
    student_email: string | null;
    created_at: string;
    updated_at: string;
}

interface MockInterviewRoomProps {
    session: MockInterviewSession;
    userRole: 'examiner' | 'student';
    onEvaluateResponse: (questionIndex: number, responseText: string) => Promise<any>;
    onSessionUpdate: () => void;
}

const MockInterviewRoom: React.FC<MockInterviewRoomProps> = ({
    session,
    userRole,
    onEvaluateResponse,
    onSessionUpdate
}) => {
    const navigate = useNavigate();
    const [state] = useGlobalContext();
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(session.current_question_index);
    const [isCallActive, setIsCallActive] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [isEvaluating, setIsEvaluating] = React.useState(false);
    const [showEvaluation, setShowEvaluation] = React.useState(false);
    const [currentEvaluation, setCurrentEvaluation] = React.useState<any>(null);

    const currentQuestion = session.questions[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < session.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTranscribedText("");
            setShowEvaluation(false);
            setCurrentEvaluation(null);
        } else {
            // Interview completed
            showToast('Interview completed!', 'success');
            setShowEvaluation(true);
        }
    };

    const handleEvaluateCurrentResponse = async () => {
        if (!transcribedText.trim()) {
            showToast('No response to evaluate', 'warning');
            return;
        }

        setIsEvaluating(true);
        try {
            const evaluation = await onEvaluateResponse(currentQuestionIndex, transcribedText);
            if (evaluation) {
                setCurrentEvaluation(evaluation);
                setShowEvaluation(true);
                showToast('Response evaluated successfully', 'success');
            }
        } catch (error) {
            console.error('Error evaluating response:', error);
            showToast('Failed to evaluate response', 'error');
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleEndInterview = () => {
        setIsCallActive(false);
        navigate('/app/mock-interview');
    };

    const getOverallScore = () => {
        if (session.evaluations.length === 0) return 0;
        const totalScore = session.evaluations.reduce((sum, evaluation) => sum + evaluation.evaluation.score, 0);
        return Math.round(totalScore / session.evaluations.length);
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            Mock Interview - {session.specialty}
                        </h1>
                        <p className="text-sm text-gray-600">
                            Session Code: {session.session_code} | Role: {userRole}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                                {isCallActive ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        <button
                            onClick={handleEndInterview}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            End Interview
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Call Interface */}
                <div className="flex-1 bg-black flex items-center justify-center">
                    <ZegoCloudCall
                        sessionCode={session.session_code}
                        userRole={userRole}
                        onCallStateChange={setIsCallActive}
                        onTranscriptionUpdate={setTranscribedText}
                    />
                </div>

                {/* Right Panel - Questions & Evaluation */}
                <div className="w-96 bg-white border-l flex flex-col">
                    {showEvaluation && currentEvaluation ? (
                        <EvaluationPanel
                            evaluation={currentEvaluation}
                            question={currentQuestion}
                            response={transcribedText}
                            onNext={handleNextQuestion}
                            onClose={() => setShowEvaluation(false)}
                        />
                    ) : (
                        <QuestionPanel
                            currentQuestion={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={session.questions.length}
                            transcribedText={transcribedText}
                            userRole={userRole}
                            isEvaluating={isEvaluating}
                            onEvaluate={handleEvaluateCurrentResponse}
                            onNextQuestion={handleNextQuestion}
                        />
                    )}
                </div>
            </div>

            {/* Footer - Progress */}
            <div className="bg-white border-t px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1} of {session.questions.length}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    {session.evaluations.length > 0 && (
                        <div className="text-sm text-gray-600">
                            Average Score: {getOverallScore()}/10
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MockInterviewRoom; 