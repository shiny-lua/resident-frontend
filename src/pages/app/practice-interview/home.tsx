import React from "react"

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import { Select } from "../../../components/select"
import PracticeInterviewModal from "../components/practice-interview-modal"
import { useGlobalContext } from "../../../context"
import { restApi } from "../../../context/restApi"
import { showToast } from "../../../context/helper"
import { useNavigate } from "react-router-dom"

interface PracticeInterview {
    _id: string;
    session_code: string;
    session_name: string;
    description: string;
    specialty: string;
    interview_type: string;
    status: string;
    email: string;
    created_at: string;
    updated_at: string;
    session_started: boolean;
    session_completed: boolean;
    responses: any[];
    questions?: any[];
    evaluations?: any[];
    current_question_index?: number;
}

interface PaginationInfo {
    current_page: number;
    per_page: number;
    total_practice_interviews: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}

const PracticeInterview = () => {
    const navigate = useNavigate();
    const [state, { dispatch }] = useGlobalContext();
    const [showPracticeInterviewModal, setShowPracticeInterviewModal] = React.useState(false)
    const [status, setStatus] = React.useState({
        status: "All Status"
    })
    const [interviewType, setInterviewType] = React.useState({
        type: "All Types"
    })
    const [showStatusDropdown, setShowStatusDropdown] = React.useState(false)
    const [showTypeDropdown, setShowTypeDropdown] = React.useState(false)
    const [practiceInterviews, setPracticeInterviews] = React.useState<PracticeInterview[]>([])
    const [pagination, setPagination] = React.useState<PaginationInfo>({
        current_page: 1,
        per_page: 10,
        total_practice_interviews: 0,
        total_pages: 0,
        has_next: false,
        has_previous: false
    })
    const [loading, setLoading] = React.useState(false)
    const showStatusDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const showTypeDropdownRef = React.useRef<HTMLDivElement | null>(null);

    const onHandleStatus = (v: string, obk: string) => {
        setStatus({ ...status, [obk]: v });
        setShowStatusDropdown(false)
        // Fetch interviews with new status filter
        const statusFilter = v === "All Status" ? undefined : v.toLowerCase().replace(" ", "_") as 'active' | 'completed' | 'cancelled' | 'waiting';
        fetchPracticeInterviews(1, statusFilter, interviewType.type === "All Types" ? undefined : interviewType.type.toLowerCase() as 'text' | 'voice');
    }

    const onHandleInterviewType = (v: string, obk: string) => {
        setInterviewType({ ...interviewType, [obk]: v });
        setShowTypeDropdown(false)
        // Fetch interviews with new type filter
        const typeFilter = v === "All Types" ? undefined : v.toLowerCase() as 'text' | 'voice';
        fetchPracticeInterviews(1, status.status === "All Status" ? undefined : status.status.toLowerCase().replace(" ", "_") as 'active' | 'completed' | 'cancelled' | 'waiting', typeFilter);
    }

    const onShowStatusDropdown = (event: MouseEvent) => {
        if (showStatusDropdownRef.current && !showStatusDropdownRef.current.contains(event.target as Node)) {
            setShowStatusDropdown(false);
        }
    };

    const onShowTypeDropdown = (event: MouseEvent) => {
        if (showTypeDropdownRef.current && !showTypeDropdownRef.current.contains(event.target as Node)) {
            setShowTypeDropdown(false);
        }
    };

    const fetchPracticeInterviews = React.useCallback(async (page: number = 1, statusFilter?: 'active' | 'completed' | 'cancelled' | 'waiting', typeFilter?: 'text' | 'voice') => {
        setLoading(true);
        try {
            const params: any = {
                page,
                per_page: pagination.per_page
            };

            if (statusFilter) {
                params.status = statusFilter;
            }

            if (typeFilter) {
                params.interview_type = typeFilter;
            }

            const response = await restApi.getPracticeInterviews(params);

            if (response.status === 200 && response.data?.data) {
                setPracticeInterviews(response.data.data);
                if (response.data.pagination) {
                    setPagination(response.data.pagination);
                }
            } else {
                console.error('Failed to fetch practice interviews:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to fetch practice interviews', 'error');
            }
        } catch (error) {
            console.error('Error fetching practice interviews:', error);
            showToast('An error occurred while fetching practice interviews', 'error');
        } finally {
            setLoading(false);
        }
    }, [pagination.per_page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            const statusFilter = status.status === "All Status" ? undefined : status.status.toLowerCase().replace(" ", "_") as 'active' | 'completed' | 'cancelled' | 'waiting';
            const typeFilter = interviewType.type === "All Types" ? undefined : interviewType.type.toLowerCase() as 'text' | 'voice';
            fetchPracticeInterviews(newPage, statusFilter, typeFilter);
        }
    };

    const handleEndPracticeInterview = async (interviewId: string) => {
        if (!interviewId) {
            console.error("No practice interview ID provided");
            showToast("Error: No practice interview ID found", "error");
            return;
        }

        try {
            const response = await restApi.leavePracticeInterview(interviewId, 'leave');

            if (response.status === 200) {
                // Clear practice interview state from localStorage
                localStorage.removeItem('currentPracticeInterview');
                dispatch({
                    type: "isLeaveInterview",
                    payload: {
                        status: false,
                        link: ""
                    }
                })
                fetchPracticeInterviews(pagination.current_page)
            } else {
                console.error('Failed to complete practice interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to complete practice interview', 'error');
            }
        } catch (error) {
            console.error('Error completing practice interview:', error);
            showToast('An error occurred while completing the practice interview', 'error');
        }
    };

    const handleJoinPracticeInterview = (interviewId: string) => {
        localStorage.setItem('currentPracticeInterview', JSON.stringify({
            interviewId: interviewId,
            link: `/app/practice-interview/practice/${interviewId}`,
            status: true,
            timestamp: new Date().toISOString()
        }));
        navigate(`/app/practice-interview/practice/${interviewId}`)
    }

    React.useEffect(() => {
        document.addEventListener("mousedown", onShowStatusDropdown);
        document.addEventListener("mousedown", onShowTypeDropdown);
        return () => {
            document.removeEventListener("mousedown", onShowStatusDropdown);
            document.removeEventListener("mousedown", onShowTypeDropdown);
        };
    }, []);

    // Load practice interviews on component mount
    React.useEffect(() => {
        fetchPracticeInterviews(1);
    }, [fetchPracticeInterviews]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-500';
            case 'waiting':
                return 'bg-yellow-500';
            case 'completed':
                return 'bg-slate-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-slate-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'Active';
            case 'waiting':
                return 'Waiting';
            case 'completed':
                return 'Completed';
            case 'cancelled':
                return 'Cancelled';
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'N/A';
        }
    };

    const getInterviewTypeText = (type: string) => {
        switch (type.toLowerCase()) {
            case 'text':
                return 'Text Interview';
            case 'voice':
                return 'Voice Interview';
            default:
                return type;
        }
    };

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-10 lg:pl-14 md:max-h-screen">
                <div>
                    <h1 className="text-left text-3xl font-semibold leading-8">
                        Practice Interview
                    </h1>
                    <div className="mt-4 max-w-[640px] text-lg font-medium leading-6 text-slate-700">
                        Practice your interview skills with structured questions and get detailed feedback.
                    </div>
                </div>
                <div className="mb-4 flex-col justify-between gap-4 sm:flex md:flex-row">
                    <div className="hidden gap-4 md:flex">
                        <button
                            onClick={() => setShowPracticeInterviewModal(!showPracticeInterviewModal)}
                            disabled={state.isLeaveInterview.status}
                            className={`whitespace-nowrap flex items-center gap-2 justify-center gap-y-3 rounded-md p-3 text-sm font-medium text-white ${state.isLeaveInterview.status
                                ? "bg-slate-500 cursor-not-allowed"
                                : "bg-sky-500 hover:opacity-80"
                                }`}
                        >
                            <Icon icon="MockInterview" />
                            <span className="text-sm font-medium">
                                {state.isLeaveInterview.status ? 'Interview in Progress' : 'Start Practice Interview'}
                            </span>
                        </button>
                    </div>
                    <div className="hidden gap-4 md:flex">
                        <Select
                            onDropdown={() => setShowStatusDropdown(true)}
                            showDropdown={showStatusDropdown}
                            value={status.status}
                            obk="status"
                            onHandle={onHandleStatus}
                            data={["All Status", "Active", "Waiting", "Completed", "Cancelled"]}
                            dropdownRef={showStatusDropdownRef}
                        />
                        <Select
                            onDropdown={() => setShowTypeDropdown(true)}
                            showDropdown={showTypeDropdown}
                            value={interviewType.type}
                            obk="type"
                            onHandle={onHandleInterviewType}
                            data={["All Types", "Text", "Voice"]}
                            dropdownRef={showTypeDropdownRef}
                        />
                    </div>
                    <div className="flex flex-1 gap-2 md:hidden">
                        <button
                            onClick={() => setShowPracticeInterviewModal(true)}
                            disabled={state.isLeaveInterview.status}
                            className={`items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg h-[50px] flex-1 flex-col px-4 py-2.5 ${state.isLeaveInterview.status
                                ? "bg-slate-500 cursor-not-allowed"
                                : "!bg-design-orange"
                                }`}
                        >
                            <Icon icon="New" className="text-white" />
                            <span className="text-lg font-medium text-slate-50">
                                {state.isLeaveInterview.status ? 'Interview in Progress' : 'Practice Interview'}
                            </span>
                        </button>
                    </div>
                    <div className="-mb-6 mt-4 block border-b border-slate-100 md:hidden" />
                </div>
                <div className="relative w-full overflow-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-slate-500">Loading interviews...</div>
                        </div>
                    ) : (
                        <table className="w-full caption-bottom text-sm hidden md:table">
                            <thead className="[&_tr]:border-0">
                                <tr className="border-b transition-colors hover:bg-sky-100/50 h-12 bg-slate-50">
                                    <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">
                                        Interview
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle hidden w-2/12 font-semibold text-slate-900 sm:table-cell">
                                        Status
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle hidden w-2/12 font-semibold text-slate-900 sm:table-cell">
                                        Type
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle hidden w-2/12 font-semibold text-slate-900 sm:table-cell">
                                        Specialty
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle hidden w-3/12 cursor-pointer font-semibold text-slate-900 md:table-cell">
                                        Created
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {practiceInterviews.length === 0 ? (
                                <tbody className="[&_tr:last-child]:border-0">
                                    <tr className="border-b transition-colors hover:bg-slate-500/50">
                                        <td colSpan={6} className="p-8 text-center text-slate-500">
                                            No practice interviews found. Start your first practice interview!
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody className="[&_tr:last-child]:border-0">
                                    {practiceInterviews.map((interview) => (
                                        <tr key={interview._id} className="border-b transition-colors hover:bg-sky-100/50">
                                            <td className="p-2 align-middle">
                                                <span className="inline-block max-w-64 truncate">
                                                    <div className="font-semibold">{interview.session_name || 'Untitled Interview'}</div>
                                                    <div className="text-[11px] text-slate-500">
                                                        {interview.description || 'Practice Interview'}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden sm:table-cell">
                                                <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(interview.status)}`} />
                                                    <span className={`text-xs text-slate-700 capitalize ${interview.status.toLowerCase() === 'active' ? 'text-green-500' : 'text-slate-700'}`}>
                                                        {getStatusText(interview.status)}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden sm:table-cell">
                                                <span className="text-xs text-slate-600">
                                                    {getInterviewTypeText(interview.interview_type)}
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden sm:table-cell">
                                                <span className="text-xs text-slate-600 capitalize">
                                                    {interview.specialty || 'General'}
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden md:table-cell">
                                                {formatDate(interview.created_at)}
                                            </td>
                                            <td className="p-2 align-middle flex items-center gap-3">
                                                {interview.status.toLowerCase() === 'active' && (
                                                    <button onClick={() => handleJoinPracticeInterview(interview._id)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600">
                                                        Join
                                                    </button>
                                                )}
                                                {interview.status.toLowerCase() === 'active' && (
                                                    <button onClick={() => handleEndPracticeInterview(interview._id)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600">
                                                        End
                                                    </button>
                                                )}
                                                {interview.status.toLowerCase() === 'completed' && (
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-green-500 text-white px-3 py-1.5 hover:bg-green-600">
                                                        View Results
                                                    </button>
                                                )}
                                                {interview.status.toLowerCase() === 'waiting' && (
                                                    <button onClick={() => handleJoinPracticeInterview(interview._id)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white px-3 py-1.5 hover:bg-blue-600">
                                                        Start
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )
                            }
                        </table>
                    )}
                </div>

                {/* Mobile view for practice interviews */}
                {!loading && practiceInterviews.length > 0 && (
                    <div className="flex flex-col gap-3 md:hidden">
                        {practiceInterviews.map((interview) => (
                            <div key={interview._id} className="flex flex-col rounded-lg border border-slate-200">
                                <div className="p-4">
                                    <div className="font-base truncate font-semibold text-slate-900">
                                        {interview.session_name || 'Untitled Interview'}
                                    </div>
                                    <div className="font-base text-slate-400">
                                        {interview.description || 'Practice Interview'}
                                    </div>
                                    <div className="font-base text-slate-400">{formatDate(interview.created_at)}</div>
                                    <div className="mt-2 flex gap-2">
                                        <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(interview.status)}`} />
                                            <span className="text-xs text-slate-700 capitalize">{getStatusText(interview.status)}</span>
                                        </span>
                                        <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                            <span className="text-xs text-slate-600">{getInterviewTypeText(interview.interview_type)}</span>
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 capitalize">
                                        Specialty: {interview.specialty || 'General'}
                                    </div>
                                </div>
                                <div className="align-items box-content rounded-b-lg bg-slate-50 p-2">
                                    <div className="flex gap-2">
                                        {interview.status.toLowerCase() === 'active' && (
                                            <>
                                                <button onClick={() => handleJoinPracticeInterview(interview._id)} className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600">
                                                    Join
                                                </button>
                                                <button onClick={() => handleEndPracticeInterview(interview._id)} className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600">
                                                    End
                                                </button>
                                            </>
                                        )}
                                        {interview.status.toLowerCase() === 'completed' && (
                                            <button className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-green-500 text-white px-3 py-1.5 hover:bg-green-600">
                                                View Results
                                            </button>
                                        )}
                                        {interview.status.toLowerCase() === 'waiting' && (
                                            <button onClick={() => handleJoinPracticeInterview(interview._id)} className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 text-white px-3 py-1.5 hover:bg-blue-600">
                                                Start
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && practiceInterviews.length > 0 && (
                    <div className="my-4 flex h-8 items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 antialiased">
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                                <span className="text-xs font-medium text-slate-900">{pagination.current_page}/{pagination.total_pages}</span>
                            </h4>
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                                <span className="text-xs font-medium text-slate-900">{pagination.total_practice_interviews}</span>
                            </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={!pagination.has_previous}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium box-content h-8 w-8 px-0 py-0 ${!pagination.has_previous ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100'
                                    }`}
                            >
                                <Icon icon="ArrowLeft" />
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={!pagination.has_next}
                                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium box-content h-8 w-8 px-0 py-0 ${!pagination.has_next ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100'
                                    }`}
                            >
                                <Icon icon="ChevronRight" />
                            </button>
                        </div>
                    </div>
                )}
            {showPracticeInterviewModal && (<PracticeInterviewModal isOpen={showPracticeInterviewModal} onClose={() => setShowPracticeInterviewModal(false)} />)}
            </div>
        </Layout>
    )
}

export default PracticeInterview
