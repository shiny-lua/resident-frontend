import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";
import MockInterviewRoom from "./mock-interview-room";

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

const MockInterviewRoomIndex = () => {
    const { sessionCode } = useParams<{ sessionCode: string }>();
    const navigate = useNavigate();
    const [state] = useGlobalContext();
    const [session, setSession] = React.useState<MockInterviewSession | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [userRole, setUserRole] = React.useState<'examiner' | 'student' | null>(null);

    React.useEffect(() => {
        if (sessionCode) {
            fetchSessionDetails();
        }
    }, [sessionCode]);

    // Poll for session updates every 5 seconds
    React.useEffect(() => {
        if (session && session.status !== 'completed') {
            const interval = setInterval(() => {
                fetchSessionDetails();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [session]);

    const fetchSessionDetails = async () => {
        try {
            setLoading(true);
            const response = await restApi.postRequest(`mock-interview-get-session`, { session_code: sessionCode });

            if (response.status === 200 && response.data?.data) {
                const sessionData = response.data.data;

                if (!sessionData) {
                    showToast('You are not authorized to join this session', 'error');
                    navigate('/app/mock-interview');
                    return;
                }
                
                // Determine user role
                const resp = await restApi.postRequest("get-user")
                
                if (resp.status === 200) {
                    const data = resp.data.data
                    const userEmail = data.email;
                    if (sessionData.examiner_email === userEmail) {
                        setUserRole('examiner');
                        setSession(sessionData);
                    } else if (sessionData.student_email === userEmail) {
                        setUserRole('student');
                        setSession(sessionData);
                    } else {
                        // User is not part of this session
                        showToast('You are not authorized to join this session', 'error');
                        navigate('/app/mock-interview');
                    }
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
    };

    const handleStartSession = async () => {
        try {
            const response = await restApi.postRequest('mock-interview-start-session', {
                session_code: sessionCode
            });

            if (response.status === 200 && response.data?.data) {
                // Update session with new status
                if (session) {
                    setSession({
                        ...session,
                        status: 'active',
                        session_started: true
                    });
                }
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to start session');
            }
        } catch (error) {
            console.error('Error starting session:', error);
            throw error;
        }
    };

    const handleNextQuestion = async () => {
        try {
            const response = await restApi.postRequest('mock-interview-next-question', {
                session_code: sessionCode
            });

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
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to move to next question');
            }
        } catch (error) {
            console.error('Error moving to next question:', error);
            throw error;
        }
    };

    const handleEndSession = async () => {
        try {
            const response = await restApi.postRequest('mock-interview-end-session', {
                session_code: sessionCode
            });

            if (response.status === 200 && response.data?.data) {
                // Update session with completed status
                if (session) {
                    setSession({
                        ...session,
                        status: 'completed',
                        session_completed: true
                    });
                }
                return response.data.data;
            } else {
                throw new Error(response.data?.msg || 'Failed to end session');
            }
        } catch (error) {
            console.error('Error ending session:', error);
            throw error;
        }
    };

    const handleEvaluateResponse = async (questionIndex: number, responseText: string) => {
        try {
            const response = await restApi.postRequest('mock-interview-evaluate-response', {
                session_code: sessionCode,
                question_index: questionIndex,
                response_text: responseText
            });

            if (response.status === 200 && response.data?.data) {
                // Update session with new evaluation
                if (session) {
                    const newEvaluation = {
                        question_index: questionIndex,
                        question: session.questions[questionIndex].question,
                        response: responseText,
                        evaluation: response.data.data.evaluation,
                        timestamp: new Date().toISOString()
                    };

                    setSession({
                        ...session,
                        evaluations: [...session.evaluations, newEvaluation]
                    });
                }

                showToast('Response evaluated successfully', 'success');
                return response.data.data.evaluation;
            } else {
                showToast('Failed to evaluate response', 'error');
                return null;
            }
        } catch (error) {
            console.error('Error evaluating response:', error);
            showToast('An error occurred while evaluating the response', 'error');
            return null;
        }
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

    if (session && userRole) {
        return (
            <MockInterviewRoom
                session={session}
                userRole={userRole}
                onEvaluateResponse={handleEvaluateResponse}
                onSessionUpdate={fetchSessionDetails}
                onStartSession={handleStartSession}
                onNextQuestion={handleNextQuestion}
                onEndSession={handleEndSession}
            />
        );
    }

    return null;
};

export default MockInterviewRoomIndex;
