import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import QuestionPanel from "./question-panel";
import EvaluationPanel from "./evaluation-panel";
import AIAvatarSection from "./ai-avatar-section";
import ReviewSection from "./review-section";
import FinalFeedbackSection from "./final-feedback-section";

interface MockInterviewSession {
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
    final_feedback?: {
        overall_assessment: string;
        detailed_feedback: string;
        recommendations: string[];
        next_steps: string;
        encouragement: string;
        performance_summary: {
            overall_score: number;
            communication_score: number;
            completeness_score: number;
            relevance_score: number;
            professionalism_score: number;
        };
    };
    email: string;
    created_at: string;
    updated_at: string;
    session_started: boolean;
    session_completed: boolean;
}

const MockInterviewRoomIndex = () => {
    const { sessionCode } = useParams<{ sessionCode: string }>();
    const navigate = useNavigate();
    const [state, {dispatch}] = useGlobalContext();
    const [session, setSession] = React.useState<MockInterviewSession | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [isEndInterview, setEndInterview] = React.useState(false);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [isEvaluating, setIsEvaluating] = React.useState(false);
    const [currentEvaluation, setCurrentEvaluation] = React.useState<any>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [questionAudioUrl, setQuestionAudioUrl] = React.useState<string | null>(null);
    const [isStartingInterview, setIsStartingInterview] = React.useState(false);

    const fetchSessionDetails = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await restApi.getMockInterviewSession(sessionCode!);

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

                    navigate('/app/mock-interview');
                    return;
                }
                setSession(sessionData);
            } else {
                showToast('Failed to load session details', 'error');
                navigate('/app/mock-interview');
            }
        } catch (error) {
            console.error('Error fetching session details:', error);
            showToast('An error occurred while loading the session', 'error');
            navigate('/app/mock-interview');
        } finally {
            setLoading(false);
        }
    }, [sessionCode, navigate, dispatch]);

    React.useEffect(() => {
        if (sessionCode) {
            fetchSessionDetails();
        }
    }, [sessionCode, fetchSessionDetails]);

    // Debug session changes
    React.useEffect(() => {
        if (session) {
            console.log('Session state updated:', {
                status: session.status,
                session_started: session.session_started,
                questions_count: session.questions?.length || 0,
                current_question_index: session.current_question_index,
                first_question: session.questions?.[0]?.question || 'No first question'
            });
        }
    }, [session]);

    // Auto-start real-time interview when session is loaded
    React.useEffect(() => {
        if (session && !session.session_started && session.status !== 'completed') {
            // Automatically start the real-time interview
            handleStartSession();
        }
    }, [session]);

    const handleStartSession = async () => {
        try {
            setIsStartingInterview(true);
            const response = await restApi.startRealtimeMockInterview(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                const { all_questions, first_question, total_questions } = response.data.data;
                
                // Ensure we have questions, with fallback if needed
                const questions = all_questions || [first_question] || [
                    {
                        question: "Tell me about yourself and why you chose medicine as a career.",
                        category: "personal",
                        expected_keywords: ["motivation", "passion", "career"],
                        question_number: 1
                    }
                ];
                
                // Update session with new status and all questions
                if (session) {
                    const updatedSession = {
                        ...session,
                        status: 'active',
                        session_started: true,
                        questions: questions,
                        current_question_index: 0
                    };
                    setSession(updatedSession);
                    
                    // Debug log to verify the update
                    console.log('Session updated with questions:', updatedSession.questions);
                    console.log('First question:', updatedSession.questions[0]);
                }
                showToast('Real-time interview started with all 10 questions!', 'success');
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to start session');
            }
        } catch (error) {
            console.error('Error starting session:', error);
            showToast('Failed to start session', 'error');
            throw error;
        } finally {
            setIsStartingInterview(false);
        }
    };

    const handleNextQuestion = async () => {
        try {
            const response = await restApi.nextMockInterviewQuestion(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                // Update session with new question index
                if (session) {
                    const newData = response.data.data;
                    setSession({
                        ...session,
                        current_question_index: newData.current_question_index,
                        status: newData.status,
                        session_completed: newData.status === 'completed'
                    });
                }
                setTranscribedText("");
                setCurrentEvaluation(null);
                setQuestionAudioUrl(null);
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
            const response = await restApi.endMockInterviewSession(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                // Update session with completed status
                if (session) {
                    setSession({
                        ...session,
                        status: 'completed',
                        session_completed: true
                    });
                }
                showToast('Interview session completed!', 'success');
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
            const response = await restApi.evaluateMockInterviewResponse(
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

                showToast('Response evaluated successfully', 'success');
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

    const handleVoiceResponseReceived = async (transcribedText: string, responseData?: any) => {
        console.log('Voice response received:', transcribedText);
        console.log('Response data:', responseData);
        setTranscribedText(transcribedText);
        setIsEvaluating(true);
        
        // If we have response data, use it directly
        if (responseData) {
            if (responseData.status === 'completed') {
                console.log('Interview completed, showing final feedback');
                setSession({
                    ...session!,
                    status: 'completed',
                    session_completed: true,
                    final_feedback: responseData.final_feedback
                });
                setEndInterview(true);
            } else if (responseData.status === 'success' && responseData.next_question) {
                console.log('Moving to next question:', responseData.next_question);
                setSession({
                    ...session!,
                    current_question_index: responseData.question_index,
                    questions: [...session!.questions, responseData.next_question]
                });
                setTranscribedText("");
                setCurrentEvaluation(null);
                setQuestionAudioUrl(null);
            }
        } else {
            // Fallback: Check session status after voice response
            try {
                console.log('Checking session status after voice response...');
                const statusResponse = await restApi.getRealtimeStatus(sessionCode!);
                console.log('Status response:', statusResponse);
                
                if (statusResponse?.status === 200 && statusResponse.data?.data) {
                    const statusData = statusResponse.data.data;
                    console.log('Status data:', statusData);
                    
                    if (statusData.is_completed && statusData.final_feedback) {
                        // Interview completed - show final feedback
                        console.log('Interview completed, showing final feedback');
                        setSession({
                            ...session!,
                            status: 'completed',
                            session_completed: true,
                            final_feedback: statusData.final_feedback
                        });
                        setEndInterview(true);
                    } else if (statusData.current_question) {
                        // Update with new question
                        console.log('Moving to next question:', statusData.current_question);
                        setSession({
                            ...session!,
                            current_question_index: statusData.current_question_index,
                            questions: [...session!.questions, statusData.current_question]
                        });
                        setTranscribedText("");
                        setCurrentEvaluation(null);
                        setQuestionAudioUrl(null);
                    } else {
                        // Just update the current question index if no new question
                        console.log('Updating question index to:', statusData.current_question_index);
                        setSession({
                            ...session!,
                            current_question_index: statusData.current_question_index
                        });
                        setTranscribedText("");
                        setCurrentEvaluation(null);
                        setQuestionAudioUrl(null);
                    }
                } else {
                    console.error('Invalid status response:', statusResponse);
                    showToast('Failed to get session status', 'error');
                }
            } catch (error) {
                console.error('Error checking session status:', error);
                showToast('Error checking session status', 'error');
            }
        }
        
        setIsEvaluating(false);
    };

    const handlePlayStateChange = (isPlaying: boolean) => {
        setIsPlaying(isPlaying);
    };

    if (loading || isStartingInterview) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        {isStartingInterview ? 'Starting real-time interview...' : 'Loading session...'}
                    </p>
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
        if (session.final_feedback) {
            return <FinalFeedbackSection finalFeedback={session.final_feedback} />;
        }
        return <ReviewSection />;
    }

    const currentQuestion = session.questions?.[session.current_question_index] || null;
    const isLastQuestion = session.current_question_index === (session.questions?.length || 0) - 1;

    // Debug logs
    console.log('MockRoom render - Session status:', session.status);
    console.log('Current question index:', session.current_question_index);
    console.log('Total questions:', session.questions?.length || 0);
    console.log('Current question object:', currentQuestion);
    console.log('Current question text:', currentQuestion?.question || 'No question text');

    return (
        <div className="h-dvh bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        Real-time Mock Interview
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            session.status === 'active' ? 'bg-green-100 text-green-800' :
                            session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {session.status}
                        </span>
                        <button
                            onClick={() => setEndInterview(true)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            End Interview
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
                {/* AI Avatar Section - Always shown for voice interviews */}
                {currentQuestion ? (
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
                ) : (
                    <div className="w-full md:w-1/4 border-r bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600">Preparing AI Interviewer...</p>
                        </div>
                    </div>
                )}

                {/* Question Panel */}
                <div className="w-full md:w-1/2 border-r bg-white">
                    <QuestionPanel
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={session.current_question_index}
                        totalQuestions={session.questions?.length || 0}
                        transcribedText={transcribedText}
                        userRole="student"
                        isEvaluating={isEvaluating}
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
                        onStartSession={handleStartSession}
                        onNextQuestion={handleNextQuestion}
                        onEndSession={handleEndSession}
                        sessionStarted={session.session_started}
                        isLastQuestion={isLastQuestion}
                        sessionCompleted={session.session_completed}
                    />
                </div>
            </div>
        </div>
    );
};

export default MockInterviewRoomIndex;
