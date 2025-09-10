import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import QuestionPanel from "./question-panel";
import EvaluationPanel from "./evaluation-panel";
import AIAvatarSection from "./ai-avatar-section";
import ReviewSection from "./review-section";

interface PracticeInterviewSession {
    session_code: string;
    session_id: string;
    session_name: string;
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
    email: string;
    created_at: string;
    updated_at: string;
}

const PracticeInterviewRoomIndex = () => {
    const { sessionCode } = useParams<{ sessionCode: string }>();
    const navigate = useNavigate();
    const [state, { dispatch }] = useGlobalContext();
    const [session, setSession] = React.useState<PracticeInterviewSession | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [isEndInterview, setEndInterview] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [isEvaluating, setIsEvaluating] = React.useState(false);
    const [currentEvaluation, setCurrentEvaluation] = React.useState<any>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [questionAudioUrl, setQuestionAudioUrl] = React.useState<string | null>(null);
    const [transcriptionError, setTranscriptionError] = React.useState<any>(null);

    const fetchSessionDetails = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await restApi.getPracticeInterviewSession(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                const sessionData = response.data.data;

                if (!sessionData) {
                    showToast('You are not authorized to join this session', 'error');
                    localStorage.removeItem('currentInterview');
                    dispatch({
                        type: "isLeaveInterview",
                        payload: {
                            status: false,
                            link: ""
                        }
                    });

                    navigate('/app/practice-interview');
                    return;
                }
                setSession(sessionData);
            } else {
                showToast('Failed to load session details', 'error');
                navigate('/app/practice-interview');
            }
        } catch (error) {
            console.error('Error fetching session details:', error);
            showToast('An error occurred while loading the session', 'error');
            navigate('/app/practice-interview');
        } finally {
            setLoading(false);
        }
    }, [sessionCode, navigate, dispatch]);

    React.useEffect(() => {
        if (sessionCode) {
            fetchSessionDetails();
        }
    }, [sessionCode, fetchSessionDetails]);



    const handleNextQuestion = async () => {
        try {
            const response = await restApi.nextPracticeInterviewQuestion(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                // Update session with new question index
                if (session) {
                    const newData = response.data.data;
                    setSession({
                        ...session,
                        current_question_index: newData.current_question_index,
                        status: newData.status
                    });
                }
                setTranscribedText("");
                setCurrentEvaluation(null);
                setQuestionAudioUrl(null);
                setTranscriptionError(null);
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to move to next question');
            }
        } catch (error) {
            console.error('Error moving to next question:', error);
            showToast('Failed to move to next question', 'error');
            throw error;
        }
    };

    const handleEndSession = async () => {
        try {
            const response = await restApi.endPracticeInterviewSession(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                // Update session with completed status
                if (session) {
                    setSession({
                        ...session,
                        status: 'completed'
                    });
                }
                navigate('/app/practice-interview');
                dispatch({
                    type: "isLeaveInterview",
                    payload: {
                        status: false,
                        link: ""
                    }
                });
                localStorage.removeItem('currentInterview');
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to end session');
            }
        } catch (error) {
            console.error('Error ending session:', error);
            showToast('Failed to end session', 'error');
            throw error;
        }
    };

    const handleEvaluateResponse = async () => {
        if (!session || !transcribedText.trim()) {
            showToast('Please provide a response before evaluating', 'warning');
            return;
        }

        try {
            setIsEvaluating(true);
            const response = await restApi.evaluatePracticeInterviewResponse(
                sessionCode!,
                session.current_question_index,
                transcribedText
            );

            if (response.status === 200 && response.data?.data) {
                const evaluation = response.data.data.evaluation;
                setCurrentEvaluation(evaluation);

                // Update session with new evaluation
                if (session) {
                    const newEvaluation = {
                        question_index: session.current_question_index,
                        question: session.questions[session.current_question_index].question,
                        response: transcribedText,
                        evaluation: evaluation,
                        timestamp: new Date().toISOString()
                    };

                    setSession({
                        ...session,
                        evaluations: [...session.evaluations, newEvaluation]
                    });
                }

                return evaluation;
            } else {
                showToast('Failed to evaluate response', 'error');
                return null;
            }
        } catch (error) {
            console.error('Error evaluating response:', error);
            showToast('An error occurred while evaluating the response', 'error');
            return null;
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleTranscriptionUpdate = (text: string) => {
        setTranscribedText(text);
    };

    const handleQuestionAudioReady = (audioUrl: string) => {
        setQuestionAudioUrl(audioUrl);
    };

    const handleVoiceResponseReceived = (transcribedText: string, error?: any) => {
        setTranscribedText(transcribedText);
        setTranscriptionError(error || null);
    };

    const handlePlayStateChange = (isPlaying: boolean) => {
        setIsPlaying(isPlaying);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading session...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600">Session not found</p>
                </div>
            </div>
        );
    }

    if (isEndInterview) {
        return <ReviewSection />;
    }

    const leaveInterview = async () => {
        const response = await restApi.leavePracticeInterview(sessionCode!, 'leave');
        if (response.status === 200) {
            dispatch({
                type: "isLeaveInterview",
                payload: {
                    status: false,
                    link: ""
                }
            });
            localStorage.removeItem('currentInterview');
            setEndInterview(true)
        };
    }
    const currentQuestion = session.questions[session.current_question_index];
    const isLastQuestion = session.current_question_index === session.questions.length - 1;

    return (
        <div className="h-dvh bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        Practice Interview
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === 'active' ? 'bg-green-100 text-green-800' :
                            session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-slate-100 text-slate-800'
                            }`}>
                            {session.status}
                        </span>
                        {session.status === 'completed' ? (
                            <button
                                onClick={() => navigate(`/app/practice-interview/results/${session.session_code}`)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                View Results
                            </button>
                        ) : (
                            <button
                                onClick={leaveInterview}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                End Interview
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
                {/* AI Avatar Section - Always shown for voice interviews */}
                <div className="w-full md:w-1/4 border-r">
                    <AIAvatarSection
                        currentQuestion={currentQuestion.question}
                        sessionCode={sessionCode!}
                        questionIndex={session.current_question_index}
                        onQuestionAudioReady={handleQuestionAudioReady}
                        onVoiceResponseReceived={handleVoiceResponseReceived}
                        isPlaying={isPlaying}
                        onPlayStateChange={handlePlayStateChange}
                    />
                </div>

                {/* Question Panel */}
                <div className="w-full md:w-1/2 border-r bg-white">
                    <QuestionPanel
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={session.current_question_index}
                        totalQuestions={session.questions.length}
                        transcribedText={transcribedText}
                        userRole="student"
                        isEvaluating={isEvaluating}
                        transcriptionError={transcriptionError}
                        onEvaluate={handleEvaluateResponse}
                        onNextQuestion={handleNextQuestion}
                    />
                </div>

                {/* Evaluation Panel */}
                <div className="w-full md:w-1/2 bg-white">
                    <EvaluationPanel
                        currentEvaluation={currentEvaluation}
                        evaluations={session.evaluations}
                        onTranscriptionUpdate={handleTranscriptionUpdate}
                        onNextQuestion={handleNextQuestion}
                        onEndSession={handleEndSession}
                        isLastQuestion={isLastQuestion}
                        sessionCompleted={session.status === 'completed'}
                        sessionCode={session.session_code}
                    />
                </div>
            </div>
        </div>
    );
};

export default PracticeInterviewRoomIndex;
