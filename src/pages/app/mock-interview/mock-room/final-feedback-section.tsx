import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../../context";
import { restApi } from "../../../../context/restApi";

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

interface FinalFeedbackSectionProps {
    finalFeedback: FinalFeedback;
}

const FinalFeedbackSection: React.FC<FinalFeedbackSectionProps> = ({ finalFeedback }) => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();
    const { sessionCode } = useParams();
    const [endInterview, setEndInterview] = React.useState(false);      
    
    const handleReturnHome = async () => {
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
        switch (rating.toLowerCase()) {
            case 'excellent':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'good':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'fair':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'poor':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPerformanceRatingIcon = (rating: string) => {
        switch (rating.toLowerCase()) {
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

    return (
        <div className="h-dvh bg-gray-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        Interview Completed Successfully! 🎉
                    </div>
                    <button
                        onClick={handleReturnHome}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Back to Interviews
                    </button>
                </div>
            </div>

            {/* Final Feedback Content */}
            <div className="max-w-6xl mx-auto p-6">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Congratulations! Interview Complete
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Here's your comprehensive feedback and performance analysis
                    </p>
                    
                    {/* Performance Rating Badge */}
                    <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full border-2 text-sm font-semibold">
                        <span className="mr-2">{getPerformanceRatingIcon(finalFeedback.performance_rating)}</span>
                        <span className={`px-3 py-1 rounded-full ${getPerformanceRatingColor(finalFeedback.performance_rating)}`}>
                            {finalFeedback.performance_rating.charAt(0).toUpperCase() + finalFeedback.performance_rating.slice(1)} Performance
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
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Overall Assessment
                        </h2>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <p className="text-gray-700 text-lg leading-relaxed">
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
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {finalFeedback.next_steps}
                        </p>
                    </div>
                </div>

                {/* Encouragement */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-center text-white shadow-lg mb-8">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Keep Going! 🚀</h3>
                    <p className="text-emerald-100 text-lg leading-relaxed max-w-3xl mx-auto">
                        {finalFeedback.encouragement}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                    <button
                        onClick={handleReturnHome}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    >
                        ← Back to Interviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalFeedbackSection;
