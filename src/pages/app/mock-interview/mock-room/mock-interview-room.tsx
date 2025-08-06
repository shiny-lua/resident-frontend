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
    session_started: boolean;
    session_completed: boolean;
}

interface MockInterviewRoomProps {
    session: MockInterviewSession;
    userRole: 'examiner' | 'student';
    onEvaluateResponse: (questionIndex: number, responseText: string) => Promise<any>;
    onSessionUpdate: () => void;
    onStartSession?: () => Promise<void>;
    onNextQuestion?: () => Promise<void>;
    onEndSession?: () => Promise<void>;
}

const MockInterviewRoom: React.FC<MockInterviewRoomProps> = ({
    session,
    userRole,
    onEvaluateResponse,
    onSessionUpdate,
    onStartSession,
    onNextQuestion,
    onEndSession
}) => {
    const navigate = useNavigate();
    const [state] = useGlobalContext();
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(session.current_question_index);
    const [isCallActive, setIsCallActive] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [isEvaluating, setIsEvaluating] = React.useState(false);
    const [showEvaluation, setShowEvaluation] = React.useState(false);
    const [currentEvaluation, setCurrentEvaluation] = React.useState<any>(null);
    const [isStartingSession, setIsStartingSession] = React.useState(false);
    const [isMovingToNext, setIsMovingToNext] = React.useState(false);

    const currentQuestion = session.questions[currentQuestionIndex];

    // Update current question index when session updates
    React.useEffect(() => {
        setCurrentQuestionIndex(session.current_question_index);
    }, [session.current_question_index]);

    const handleStartSession = async () => {
        if (!onStartSession) return;
        
        setIsStartingSession(true);
        try {
            await onStartSession();
            showToast('Interview session started!', 'success');
        } catch (error) {
            console.error('Error starting session:', error);
            showToast('Failed to start session', 'error');
        } finally {
            setIsStartingSession(false);
        }
    };

    const handleNextQuestion = async () => {
        if (!onNextQuestion) return;
        
        setIsMovingToNext(true);
        try {
            await onNextQuestion();
            setTranscribedText("");
            setShowEvaluation(false);
            setCurrentEvaluation(null);
        } catch (error) {
            console.error('Error moving to next question:', error);
            showToast('Failed to move to next question', 'error');
        } finally {
            setIsMovingToNext(false);
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

    const handleEndInterview = async () => {
        if (!onEndSession) return;
        
        try {
            await onEndSession();
            setIsCallActive(false);
            showToast('Interview session ended', 'success');
            navigate('/app/mock-interview');
        } catch (error) {
            console.error('Error ending session:', error);
            showToast('Failed to end session', 'error');
        }
    };

    const handleCallStateChange = (isActive: boolean) => {
        setIsCallActive(isActive);
    };

    const handleTranscriptionUpdate = (text: string) => {
        setTranscribedText(text);
    };

    // Session status checks
    const isSessionReady = session.status === 'ready' && !session.session_started;
    const isSessionActive = session.status === 'active' && session.session_started;
    const isSessionCompleted = session.status === 'completed' || session.session_completed;
    const isLastQuestion = currentQuestionIndex >= session.questions.length - 1;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Panel - Video Call */}
            <div className="flex-1 relative">
                <ZegoCloudCall
                    sessionCode={session.session_code}
                    userRole={userRole}
                    onCallStateChange={handleCallStateChange}
                    onTranscriptionUpdate={handleTranscriptionUpdate}
                />
                
                {/* Session Status Overlay */}
                {!isSessionActive && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
                        <div className="text-sm font-medium">
                            {isSessionReady ? 'Ready to Start' : 
                             isSessionCompleted ? 'Interview Completed' : 
                             'Waiting for Participants'}
                        </div>
                    </div>
                )}

                {/* Session Controls for Examiner */}
                {userRole === 'examiner' && (
                    <div className="absolute top-4 left-4 space-y-2">
                        {isSessionReady && (
                            <button
                                onClick={handleStartSession}
                                disabled={isStartingSession}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isStartingSession ? 'Starting...' : 'Start Interview'}
                            </button>
                        )}
                        
                        {isSessionActive && (
                            <button
                                onClick={handleEndInterview}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                End Interview
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Right Panel - Questions & Evaluation */}
            <div className="w-96 bg-white border-l border-gray-200">
                {isSessionActive ? (
                    showEvaluation && currentEvaluation ? (
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
                    )
                ) : (
                    <div className="flex flex-col h-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Interview Session
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-900 mb-2">Session Info</h3>
                                    <p className="text-sm text-blue-800">
                                        <strong>Code:</strong> {session.session_code}
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        <strong>Specialty:</strong> {session.specialty}
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        <strong>Status:</strong> {session.status}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-gray-900 mb-2">Participants</h3>
                                    <p className="text-sm text-gray-700">
                                        <strong>Examiner:</strong> {session.examiner_email ? 'Joined' : 'Waiting'}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Student:</strong> {session.student_email ? 'Joined' : 'Waiting'}
                                    </p>
                                </div>

                                {userRole === 'examiner' && isSessionReady && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-green-900 mb-2">Ready to Start</h3>
                                        <p className="text-sm text-green-800 mb-3">
                                            Both participants have joined. You can now start the interview.
                                        </p>
                                        <button
                                            onClick={handleStartSession}
                                            disabled={isStartingSession}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isStartingSession ? 'Starting...' : 'Start Interview'}
                                        </button>
                                    </div>
                                )}

                                {userRole === 'student' && isSessionReady && (
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-yellow-900 mb-2">Waiting for Examiner</h3>
                                        <p className="text-sm text-yellow-800">
                                            The examiner will start the interview when ready.
                                        </p>
                                    </div>
                                )}

                                {isSessionCompleted && (
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-purple-900 mb-2">Interview Completed</h3>
                                        <p className="text-sm text-purple-800 mb-3">
                                            The interview has been completed. You can review the evaluations.
                                        </p>
                                        <button
                                            onClick={() => navigate('/app/mock-interview')}
                                            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                        >
                                            Return to Dashboard
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MockInterviewRoom; 