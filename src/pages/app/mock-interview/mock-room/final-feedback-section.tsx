import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../../context";

interface FinalFeedback {
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
}

interface FinalFeedbackSectionProps {
    finalFeedback: FinalFeedback;
}

const FinalFeedbackSection: React.FC<FinalFeedbackSectionProps> = ({ finalFeedback }) => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();

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

    return (
        <div className="h-dvh bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        Interview Completed
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
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🎉</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Interview Completed Successfully!
                        </h1>
                        <p className="text-gray-600">
                            Here's your comprehensive feedback and performance analysis
                        </p>
                    </div>

                    {/* Performance Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">
                                {finalFeedback.performance_summary.overall_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Overall Score</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600">
                                {finalFeedback.performance_summary.communication_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Communication</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-3xl font-bold text-yellow-600">
                                {finalFeedback.performance_summary.completeness_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Completeness</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">
                                {finalFeedback.performance_summary.relevance_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Relevance</div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                            <div className="text-3xl font-bold text-indigo-600">
                                {finalFeedback.performance_summary.professionalism_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Professionalism</div>
                        </div>
                    </div>

                    {/* Overall Assessment */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Assessment</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {finalFeedback.overall_assessment}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Feedback */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Feedback</h2>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">
                                {finalFeedback.detailed_feedback}
                            </p>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations for Improvement</h2>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <ul className="space-y-2">
                                {finalFeedback.recommendations.map((recommendation, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-orange-600 font-bold mr-2">•</span>
                                        <span className="text-gray-700">{recommendation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">
                                {finalFeedback.next_steps}
                            </p>
                        </div>
                    </div>

                    {/* Encouragement */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <h3 className="text-xl font-bold text-green-900 mb-2">Keep Going! 🚀</h3>
                        <p className="text-green-800 text-lg">
                            {finalFeedback.encouragement}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <button
                            onClick={handleReturnHome}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Back to Interviews
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Print Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Footer */}
            <div className="flex items-center justify-center gap-x-1 rounded-md bg-green-200 px-2 py-2 leading-[14px] absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-green-900">
                    Secured by 256-bit AES and 256-bit SSL/TLS encryption
                </span>
            </div>
        </div>
    );
};

export default FinalFeedbackSection;
