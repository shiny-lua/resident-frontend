import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { restApi } from "../../../context/restApi";

interface DetailedRecommendation {
    area: string;
    recommendation: string;
    examples: string;
}

interface FinalFeedback {
    overall_assessment: string;
    communication_analysis: string;
    answer_quality_analysis: string;
    professionalism_analysis: string;
    key_strengths: string[];
    areas_for_improvement: string[];
    detailed_recommendations: DetailedRecommendation[];
    next_steps: string;
    encouragement: string;
    performance_rating: string;
}

interface MockInterviewResults {
    finalFeedback: FinalFeedback;
}

const MockInterviewResults: React.FC<MockInterviewResults> = () => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();
    const { interviewId } = useParams();
    const [finalFeedback, setFinalFeedback] = React.useState<FinalFeedback>({
        overall_assessment: "",
        communication_analysis: "",
        answer_quality_analysis: "",
        professionalism_analysis: "",
        key_strengths: [],
        areas_for_improvement: [],
        detailed_recommendations: [],
        next_steps: "",
        encouragement: "",
        performance_rating: "",
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const getFinalFeedback = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await restApi.postRequest('get-mock-interview-result', {
                session_code: interviewId
            });
            if (res.status === 200) {
                setFinalFeedback(res.data.data);
            } else {
                setError(res.data?.msg || 'Failed to fetch interview results');
            }
        } catch (err) {
            setError('An error occurred while fetching results');
            console.error('Error fetching results:', err);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getFinalFeedback();
    }, []);

    const handleReturnHome = () => {
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        });
        navigate('/app/mock-interview');
    };

    const getPerformanceRatingColor = (rating: string) => {
        switch (rating && rating.toLowerCase()) {
            case 'excellent':
                return 'text-emerald-700 bg-emerald-50 border-emerald-200';
            case 'good':
                return 'text-blue-700 bg-blue-50 border-blue-200';
            case 'fair':
                return 'text-amber-700 bg-amber-50 border-amber-200';
            case 'poor':
                return 'text-red-700 bg-red-50 border-red-200';
            default:
                return 'text-gray-700 bg-gray-50 border-gray-200';
        }
    };

    const getPerformanceRatingIcon = (rating: string) => {
        switch (rating && rating.toLowerCase()) {
            case 'excellent':
                return '🏆';
            case 'good':
                return '👍';
            case 'fair':
                return '📊';
            case 'poor':
                return '📈';
            default:
                return '📋';
        }
    };

    // Show skeleton loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header Skeleton */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="max-w-7xl mx-auto p-6">
                    {/* Performance Rating Badge Skeleton */}
                    <div className="text-center mb-8">
                        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-2 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-96 mx-auto mb-4 animate-pulse"></div>
                        <div className="w-32 h-8 bg-gray-300 rounded-full mx-auto animate-pulse"></div>
                    </div>

                    {/* Overall Assessment Skeleton */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Grid Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                                    <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Strengths and Areas Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                                    <div className="h-6 bg-gray-300 rounded w-40 animate-pulse"></div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="flex items-start space-x-3 p-3 bg-gray-100 rounded-lg border border-gray-200">
                                            <div className="w-5 h-5 bg-gray-300 rounded-full flex-shrink-0 mt-0.5 animate-pulse"></div>
                                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Recommendations Skeleton */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="h-8 bg-gray-300 rounded w-64 animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next Steps Skeleton */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Encouragement Skeleton */}
                    <div className="bg-gray-200 rounded-xl p-8 text-center animate-pulse mb-12">
                        <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-64 mx-auto mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Results</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={getFinalFeedback}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleReturnHome}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Back to Interviews
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xl font-semibold text-slate-900">
                                Interview Results
                            </div>
                            <div className="text-sm text-slate-500">Performance Analysis & Feedback</div>
                        </div>
                    </div>
                    <button
                        onClick={handleReturnHome}
                        className="px-6 py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium text-sm"
                    >
                        ← Back to Interviews
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Performance Rating Badge */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Interview Results
                    </h1>
                    <p className="text-gray-600 text-lg mb-4">
                        Here's your comprehensive feedback and performance analysis
                    </p>
                    
                    {/* Performance Rating Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full border-2 text-sm font-semibold">
                        <span className="mr-2">{getPerformanceRatingIcon(finalFeedback.performance_rating)}</span>
                        <span className={`px-3 py-1 rounded-full ${getPerformanceRatingColor(finalFeedback.performance_rating)}`}>
                            {finalFeedback.performance_rating && finalFeedback.performance_rating.charAt(0).toUpperCase() + finalFeedback.performance_rating.slice(1)} Performance
                        </span>
                    </div>
                </div>

                {/* Overall Assessment */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Overall Assessment
                        </h2>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <p className="text-slate-700 leading-relaxed text-lg">
                            {finalFeedback.overall_assessment}
                        </p>
                    </div>
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Communication Analysis */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {finalFeedback.communication_analysis}
                        </p>
                    </div>

                    {/* Answer Quality Analysis */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Answer Quality</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {finalFeedback.answer_quality_analysis}
                        </p>
                    </div>

                    {/* Professionalism Analysis */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Professionalism</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {finalFeedback.professionalism_analysis}
                        </p>
                    </div>
                </div>

                {/* Strengths and Areas for Improvement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Key Strengths */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Key Strengths</h3>
                        </div>
                        <ul className="space-y-2">
                            {finalFeedback.key_strengths.map((strength, index) => (
                                <li key={index} className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-emerald-800 font-medium">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Areas for Improvement</h3>
                        </div>
                        <ul className="space-y-2">
                            {finalFeedback.areas_for_improvement.map((area, index) => (
                                <li key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs font-bold">!</span>
                                    </div>
                                    <span className="text-amber-800 font-medium">{area}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Detailed Recommendations */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Detailed Recommendations
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {finalFeedback.detailed_recommendations.map((rec, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">{rec.area}</h4>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <h5 className="font-medium text-gray-700 mb-2">Recommendation:</h5>
                                        <p className="text-gray-600 text-sm">{rec.recommendation}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium text-gray-700 mb-2">Examples:</h5>
                                        <p className="text-gray-600 text-sm">{rec.examples}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Next Steps
                        </h2>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {finalFeedback.next_steps}
                        </p>
                    </div>
                </div>

                {/* Encouragement */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-center text-white shadow-lg mb-12">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Continue Your Professional Development</h3>
                    <p className="text-emerald-100 text-lg leading-relaxed max-w-3xl mx-auto">
                        {finalFeedback.encouragement}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                    <button
                        onClick={handleReturnHome}
                        className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium shadow-sm"
                    >
                        ← Back to Interviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterviewResults;
