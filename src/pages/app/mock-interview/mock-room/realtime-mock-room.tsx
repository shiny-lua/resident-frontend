import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";
import { showToast } from "../../../../context/helper";

interface RealtimeMockInterviewSession {
    session_code: string;
    session_id: string;
    session_name: string;
    specialty: string;
    status: string;
    questions: Array<{
        question: string;
        category: string;
        expected_keywords: string[];
        question_number: number;
    }>;
    current_question_index: number;
    evaluations: Array<{
        question_index: number;
        question: string;
        response: string;
        analysis: {
            overall_score: number;
            communication_score: number;
            completeness_score: number;
            relevance_score: number;
            professionalism_score: number;
            strengths: string[];
            improvements: string[];
            keywords_matched: string[];
            analysis_notes: string;
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

const RealtimeMockRoom: React.FC = () => {
    const { sessionCode } = useParams<{ sessionCode: string }>();
    const navigate = useNavigate();
    const [state, {dispatch}] = useGlobalContext();
    const [session, setSession] = useState<RealtimeMockInterviewSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [currentQuestionAudio, setCurrentQuestionAudio] = useState<string | null>(null);
    const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
    const [showFinalFeedback, setShowFinalFeedback] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fetch session details
    const fetchSessionDetails = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await restApi.getMockInterviewSession(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                const sessionData = response.data.data;
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
    }, [sessionCode, navigate]);

    useEffect(() => {
        if (sessionCode) {
            fetchSessionDetails();
        }
    }, [sessionCode, fetchSessionDetails]);

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

    return (
        <div className="h-dvh bg-gray-50">
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        Real-time Mock Interview
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {session.status}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Real-time Interview Coming Soon
                    </h2>
                    <p className="text-gray-600 mb-6">
                        This feature is being implemented to provide automatic question generation and response analysis.
                    </p>
                    <button
                        onClick={() => navigate('/app/mock-interview')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Interviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RealtimeMockRoom;
