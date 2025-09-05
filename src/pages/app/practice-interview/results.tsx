import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { restApi } from "../../../context/restApi";
import { showToast } from "../../../context/helper";
import Icon from "../../../components/icon";

interface PracticeInterviewResult {
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
    current_question_index: number;
}

const PracticeInterviewResults = () => {
    const { sessionCode } = useParams<{ sessionCode: string }>();
    const navigate = useNavigate();
    const [state, { dispatch }] = useGlobalContext();
    const [results, setResults] = React.useState<PracticeInterviewResult | null>(null);
    const [loading, setLoading] = React.useState(true);

    const fetchResults = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await restApi.getPracticeInterviewSession(sessionCode!);

            if (response.status === 200 && response.data?.data) {
                const sessionData = response.data.data;
                setResults(sessionData);
            } else {
                showToast('Failed to load results', 'error');
                navigate('/app/practice-interview');
            }
        } catch (error) {
            console.error('Error fetching results:', error);
            showToast('An error occurred while loading the results', 'error');
            navigate('/app/practice-interview');
        } finally {
            setLoading(false);
        }
    }, [sessionCode, navigate]);

    React.useEffect(() => {
        if (sessionCode) {
            fetchResults();
        }
    }, [sessionCode, fetchResults]);

    const calculateOverallScore = () => {
        if (!results || !results.evaluations || results.evaluations.length === 0) return 0;

        const totalScore = results.evaluations.reduce((sum, evalItem) => sum + evalItem.evaluation.score, 0);
        return Math.round((totalScore / results.evaluations.length) * 10) / 10;
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

    const getScoreLabel = (score: number) => {
        if (score >= 8) return 'Excellent';
        if (score >= 6) return 'Good';
        if (score >= 4) return 'Fair';
        return 'Needs Improvement';
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'N/A';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading results...</p>
                </div>
            </div>
        );
    }

    if (!results) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-600">Results not found</p>
                    <button
                        onClick={() => navigate('/app/practice-interview')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to Practice Interviews
                    </button>
                </div>
            </div>
        );
    }

    if (!results.evaluations || results.evaluations.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/app/practice-interview')}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <Icon icon="ArrowLeft" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Practice Interview Results</h1>
                            <p className="text-gray-600">{results.session_name}</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                    <div className="bg-white rounded-lg shadow-sm border p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Available</h2>
                        <p className="text-gray-600 mb-6">
                            This practice interview session doesn't have any evaluations yet.
                            Complete the interview to see your results.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => navigate('/app/practice-interview')}
                                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Back to Practice Interviews
                            </button>
                            <button
                                onClick={() => navigate(`/app/practice-interview/practice/${results.session_code}`)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Continue Interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const overallScore = calculateOverallScore();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/app/practice-interview')}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <Icon icon="ArrowLeft" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Practice Interview Results</h1>
                            <p className="text-gray-600">{results.session_name}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {results.specialty} Specialty
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Overall Performance</h2>

                </div>

                {/* Question-by-Question Results */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b">
                        <h3 className="text-xl font-semibold text-gray-900">Detailed Results</h3>
                        <p className="text-gray-600">Review your performance on each question</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {results.evaluations.map((evaluation, index) => (
                            <div key={index} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                                                {evaluation.question_index + 1}
                                            </span>
                                            <span className="text-sm text-gray-500 capitalize">
                                                {results.questions[evaluation.question_index]?.category || 'General'}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">
                                            {evaluation.question}
                                        </h4>
                                        <div className="bg-gray-50 p-3 rounded-md mb-3">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Your Response:</span> {evaluation.response}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="ml-6 text-right">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getScoreBackground(evaluation.evaluation.score)}`}>
                                            <span className={`text-xl font-bold ${getScoreColor(evaluation.evaluation.score)}`}>
                                                {evaluation.evaluation.score}/10
                                            </span>
                                        </div>
                                        <p className={`text-sm font-medium mt-2 ${getScoreColor(evaluation.evaluation.score)}`}>
                                            {getScoreLabel(evaluation.evaluation.score)}
                                        </p>
                                    </div>
                                </div>

                                {/* Feedback */}
                                <div className="bg-blue-50 p-4 rounded-lg mb-3">
                                    <h5 className="font-medium text-blue-900 mb-2">AI Feedback</h5>
                                    <p className="text-blue-800 leading-relaxed">{evaluation.evaluation.feedback}</p>
                                </div>

                                {/* Suggestions */}
                                {evaluation.evaluation.suggestions && evaluation.evaluation.suggestions.length > 0 && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-green-900 mb-2">Suggestions for Improvement</h5>
                                        <ul className="text-green-800 space-y-1">
                                            {evaluation.evaluation.suggestions.map((suggestion, suggestionIndex) => (
                                                <li key={suggestionIndex} className="flex items-start">
                                                    <span className="mr-2 text-green-600">•</span>
                                                    <span>{suggestion}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={() => navigate('/app/practice-interview')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Back to Practice Interviews
                    </button>
                    <button
                        onClick={() => navigate('/app/practice-interview')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Start New Practice Interview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PracticeInterviewResults;
