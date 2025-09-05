import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import QuestionPanel from "./question-panel";
import AIAvatarSection from "./ai-avatar-section";
import ReviewSection from "./review-section";
import FinalFeedbackSection from "./final-feedback-section";

interface MockInterviewSession {
    session_code: string;
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
        communication_analysis: string;
        answer_quality_analysis: string;
        professionalism_analysis: string;
        key_strengths: string[];
        areas_for_improvement: string[];
        detailed_recommendations: Array<{
            area: string;
            recommendation: string;
            examples: string;
        }>;
        next_steps: string;
        encouragement: string;
        performance_rating: string;
    };
    email: string;
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
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [questionAudioUrl, setQuestionAudioUrl] = React.useState<string | null>(null);
    const [isStartingInterview, setIsStartingInterview] = React.useState(false);
    const [hasStartedSession, setHasStartedSession] = React.useState(false); // Add flag to prevent duplicate starts

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
                
                // Check if session is already started to prevent duplicate calls
                if (sessionData.session_started) {
                    setHasStartedSession(true);
                }
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

    const handleStartSession = React.useCallback(async () => {
        try {
            setIsStartingInterview(true);
            console.log('🎯 Starting real-time mock interview session...');
            const response = await restApi.startRealtimeMockInterview(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                
                // Ensure we have questions, with fallback if needed
                const questions = response.data.data.questions || [
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
                }
                console.log('✅ Real-time interview session started successfully');
                console.log(`📝 Loaded ${questions.length} questions:`, questions.map((q, i) => `Q${i + 1}: ${q.question.substring(0, 30)}...`));
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to start session');
            }
        } catch (error) {
            console.error('Error starting session:', error);
            showToast('Failed to start session', 'error');
            setHasStartedSession(false); // Reset flag on error to allow retry
            throw error;
        } finally {
            setIsStartingInterview(false);
        }
    }, [sessionCode, session]);

    React.useEffect(() => {
        if (sessionCode) {
            fetchSessionDetails();
        }
    }, [sessionCode, fetchSessionDetails]);

    // Add beforeunload event listener to prevent accidental page refresh during interview
    React.useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (session && session.status !== 'completed') {
                e.preventDefault();
                e.returnValue = 'You are currently in an interview session. Are you sure you want to leave?';
                return e.returnValue;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [session]);

    // Auto-start real-time interview when session is loaded - FIXED to prevent duplicates
    React.useEffect(() => {
        if (session && session.status !== 'completed' && !hasStartedSession && !isStartingInterview) {
            console.log('🚀 Auto-starting real-time interview session...');
            setHasStartedSession(true); // Set flag immediately to prevent duplicate calls
            handleStartSession();
        }
    }, [session, hasStartedSession, isStartingInterview]); // Removed handleStartSession to prevent infinite loops

    const handleQuestionAudioReady = (audioUrl: string) => {
        setQuestionAudioUrl(audioUrl);
    };

    const handleVoiceResponseReceived = async (transcribedText: string, responseData?: any) => {
        console.log('🎯 handleVoiceResponseReceived called with:', { transcribedText, responseData });
        setTranscribedText(transcribedText);
        setIsEvaluating(true);
        
        // If we have response data, use it directly
        if (responseData) {
            if (responseData.status === 'completed') {
                console.log('Interview completed, showing final feedback');
                setSession({
                    ...session!,
                    status: 'completed',
                    final_feedback: responseData.final_feedback
                });
                setEndInterview(true);
            } else if (responseData.status === 'success') {
                console.log(`Moving to question ${responseData.question_index + 1}`);
                setSession(prevSession => ({
                    ...prevSession!,
                    current_question_index: responseData.question_index
                }));
                setTranscribedText("");
                setQuestionAudioUrl(null);
                setIsPlaying(false); // Reset playing state for new question
                console.log(`✅ Session updated to question ${responseData.question_index + 1}`);
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
                            final_feedback: statusData.final_feedback
                        });
                        setEndInterview(true);
                    } else if (statusData.current_question_index !== undefined) {
                        // Update question index only, don't modify questions array
                        console.log(`Moving to question ${statusData.current_question_index + 1} (fallback)`);
                        setSession(prevSession => ({
                            ...prevSession!,
                            current_question_index: statusData.current_question_index
                        }));
                        setTranscribedText("");
                        setQuestionAudioUrl(null);
                        setIsPlaying(false); // Reset playing state for new question
                        console.log(`✅ Session updated to question ${statusData.current_question_index + 1} (fallback)`);
                    } else {
                        // Just update the current question index if no new question
                        console.log('Updating question index to:', statusData.current_question_index);
                        setSession(prevSession => ({
                            ...prevSession!,
                            current_question_index: statusData.current_question_index
                        }));
                        setTranscribedText("");
                        setQuestionAudioUrl(null);
                        setIsPlaying(false); // Reset playing state for new question
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

    // Debug: Log current question details (must be before any early returns)
    React.useEffect(() => {
        if (session && session.questions && session.current_question_index !== undefined) {
            const currentQ = session.questions[session.current_question_index];
            console.log(`📋 Current Question Index: ${session.current_question_index}`);
            console.log(`📋 Total Questions: ${session.questions.length}`);
            console.log(`📋 Current Question: ${currentQ?.question?.substring(0, 50) || 'Not found'}...`);
        }
    }, [session?.current_question_index, session?.questions]);

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

    const leaveInterview = async () => {
        const response = await restApi.leaveMockInterview(sessionCode!, 'leave');
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
        } else {
            dispatch({
                type: "isLeaveInterview",
                payload: {
                    status: false,
                    link: ""
                }
            });
            localStorage.removeItem('currentInterview');
            navigate('/app/mock-interview');
        }
    }

    const currentQuestion = session.questions?.[session.current_question_index] || "";
    const isLastQuestion = session.current_question_index === (session.questions?.length || 0) - 1;
    
    // Debug logging for question progression
    console.log('🔍 Current Session State:', {
        current_question_index: session.current_question_index,
        total_questions: session.questions?.length,
        current_question: currentQuestion?.question?.substring(0, 50) + '...',
        status: session.status,
        isLastQuestion
    });

    console.log({
        session,
        currentQuestion,
        isLastQuestion,
        isEvaluating,
        isPlaying,
        questionAudioUrl,
        transcribedText,
    })

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
                            onClick={leaveInterview}
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
                            isInterviewCompleted={session.status === 'completed'}
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
                <div className="w-full md:w-3/4 bg-white">
                    <QuestionPanel
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={session.current_question_index}
                        totalQuestions={session.questions?.length || 0}
                        transcribedText={transcribedText}
                        userRole="student"
                        isEvaluating={isEvaluating}
                    />
                </div>
            </div>
        </div>
    );
};

export default MockInterviewRoomIndex;
