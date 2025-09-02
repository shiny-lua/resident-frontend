import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { restApi } from "../../../context/restApi";

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

interface MockInterviewResults {
    finalFeedback: FinalFeedback;
}

const MockInterviewResults: React.FC<MockInterviewResults> = () => {
    const navigate = useNavigate();
    const [_, { dispatch }] = useGlobalContext();
    const { interviewId } = useParams();
    const [finalFeedback, setFinalFeedback] = React.useState<FinalFeedback>({
        overall_assessment: "",
        detailed_feedback: "",
        recommendations: [],
        next_steps: "",
        encouragement: "",
        performance_summary: {
            overall_score: 0,
            communication_score: 0,
            completeness_score: 0,
            relevance_score: 0,
            professionalism_score: 0,
        },
    });

    const getFinalFeedback = async () => {
        const res = await restApi.postRequest('get-mock-interview-result', {
            session_code: interviewId
        });
        if (res.status === 200) {
            setFinalFeedback(res.data.data);
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

    const getScoreColor = (score: number) => {
        if (score >= 8) return "text-emerald-700 bg-emerald-50 border-emerald-200";
        if (score >= 6) return "text-blue-700 bg-blue-50 border-blue-200";
        if (score >= 4) return "text-amber-700 bg-amber-50 border-amber-200";
        return "text-red-700 bg-red-50 border-red-200";
    };

    const getScoreStatus = (score: number) => {
        if (score >= 8) return "Excellent";
        if (score >= 6) return "Good";
        if (score >= 4) return "Fair";
        return "Needs Improvement";
    };

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

                {/* Performance Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 my-12">
                    <div className={`text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreColor(finalFeedback.performance_summary.overall_score)}`}>
                        <div className="text-3xl font-bold mb-2">
                            {finalFeedback.performance_summary.overall_score.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Overall Score</div>
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {getScoreStatus(finalFeedback.performance_summary.overall_score)}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                            <div 
                                className="bg-slate-700 h-1.5 rounded-full transition-all duration-1000" 
                                style={{ width: `${(finalFeedback.performance_summary.overall_score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className={`text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreColor(finalFeedback.performance_summary.communication_score)}`}>
                        <div className="text-3xl font-bold mb-2">
                            {finalFeedback.performance_summary.communication_score.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Communication</div>
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {getScoreStatus(finalFeedback.performance_summary.communication_score)}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                            <div 
                                className="bg-slate-700 h-1.5 rounded-full transition-all duration-1000" 
                                style={{ width: `${(finalFeedback.performance_summary.communication_score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className={`text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreColor(finalFeedback.performance_summary.completeness_score)}`}>
                        <div className="text-3xl font-bold mb-2">
                            {finalFeedback.performance_summary.completeness_score.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Completeness</div>
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {getScoreStatus(finalFeedback.performance_summary.completeness_score)}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                            <div 
                                className="bg-slate-700 h-1.5 rounded-full transition-all duration-1000" 
                                style={{ width: `${(finalFeedback.performance_summary.completeness_score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className={`text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreColor(finalFeedback.performance_summary.relevance_score)}`}>
                        <div className="text-3xl font-bold mb-2">
                            {finalFeedback.performance_summary.relevance_score.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Relevance</div>
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {getScoreStatus(finalFeedback.performance_summary.relevance_score)}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                            <div 
                                className="bg-slate-700 h-1.5 rounded-full transition-all duration-1000" 
                                style={{ width: `${(finalFeedback.performance_summary.relevance_score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className={`text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${getScoreColor(finalFeedback.performance_summary.professionalism_score)}`}>
                        <div className="text-3xl font-bold mb-2">
                            {finalFeedback.performance_summary.professionalism_score.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-slate-700 mb-2">Professionalism</div>
                        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            {getScoreStatus(finalFeedback.performance_summary.professionalism_score)}
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-3">
                            <div 
                                className="bg-slate-700 h-1.5 rounded-full transition-all duration-1000" 
                                style={{ width: `${(finalFeedback.performance_summary.professionalism_score / 10) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Feedback Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Overall Assessment */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Overall Assessment
                            </h2>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                            <p className="text-slate-700 leading-relaxed">
                                {finalFeedback.overall_assessment}
                            </p>
                        </div>
                    </div>

                    {/* Detailed Feedback */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                Detailed Feedback
                            </h2>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                            <p className="text-slate-700 leading-relaxed">
                                {finalFeedback.detailed_feedback}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Recommendations for Improvement
                        </h2>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                        <ul className="space-y-3">
                            {finalFeedback.recommendations.map((recommendation, index) => (
                                <li key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-amber-200">
                                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-xs font-bold">{index + 1}</span>
                                    </div>
                                    <span className="text-slate-700 leading-relaxed">{recommendation}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Next Steps
                        </h2>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                        <p className="text-slate-700 leading-relaxed">
                            {finalFeedback.next_steps}
                        </p>
                    </div>
                </div>

                {/* Encouragement */}
                <div className="bg-slate-800 rounded-xl p-8 text-center shadow-lg mb-12">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Continue Your Professional Development</h3>
                    <p className="text-slate-200 leading-relaxed max-w-3xl mx-auto">
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
                    <button
                        onClick={() => window.print()}
                        className="w-full sm:w-auto px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium shadow-sm"
                    >
                        Print Report
                    </button>
                    <button
                        onClick={() => navigate('/app/mock-interview')}
                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium shadow-sm"
                    >
                        Practice Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockInterviewResults;
