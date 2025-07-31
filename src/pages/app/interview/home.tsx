import React from "react"
import { Link } from "react-router-dom"

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import InterviewModal from "../components/interview-modal"
import { Select } from "../../../components/select"
import { restApi } from "../../../context/restApi"
import { showToast } from "../../../context/helper"
import { useGlobalContext } from "../../../context"

interface Interview {
    interview_id: string;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PaginationInfo {
    current_page: number;
    per_page: number;
    total_interviews: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}

const HomeIndex = () => {
    const [state, { dispatch }] = useGlobalContext();
    const [showCreateDropdown, setShowCreateDropdown] = React.useState(false)
    const [showInterviewModal, setShowInterviewModal] = React.useState(false)
    const [interviews, setInterviews] = React.useState<Interview[]>([])
    const [loading, setLoading] = React.useState(false)
    const [pagination, setPagination] = React.useState<PaginationInfo>({
        current_page: 1,
        per_page: 10,
        total_interviews: 0,
        total_pages: 0,
        has_next: false,
        has_previous: false
    })
    const [status, setStatus] = React.useState({
        status: "All Status"
    })
    const [showStatusDropdown, setShowStatusDropdown] = React.useState(false)

    const showCreateDropdownRef = React.useRef<HTMLDivElement | null>(null);
    const showStatusDropdownRef = React.useRef<HTMLDivElement | null>(null);

    const onHandleStatus = (v: string, obk: string) => {
        setStatus({ ...status, [obk]: v });
        setShowStatusDropdown(false)
        // Reset to first page when filter changes
        fetchInterviews(1, v === "All Status" ? undefined : v.toLowerCase().replace(' ', '_') as any);
    }

    const onShowCreateDropdown = (event: MouseEvent) => {
        if (showCreateDropdownRef.current && !showCreateDropdownRef.current.contains(event.target as Node)) {
            setShowCreateDropdown(false);
        }
    };

    const onShowStatusDropdown = (event: MouseEvent) => {
        if (showStatusDropdownRef.current && !showStatusDropdownRef.current.contains(event.target as Node)) {
            setShowStatusDropdown(false);
        }
    };

    const fetchInterviews = React.useCallback(async (page: number = 1, statusFilter?: 'in_progress' | 'completed' | 'cancelled') => {
        setLoading(true);
        try {
            const params: any = {
                page,
                per_page: pagination.per_page
            };

            if (statusFilter) {
                params.status = statusFilter;
            }

            const response = await restApi.getInterviews(params);

            if (response.status === 200 && response.data?.data) {
                setInterviews(response.data.data);
                if (response.data.pagination) {
                    setPagination(response.data.pagination);
                }
            } else {
                console.error('Failed to fetch interviews:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to fetch interviews', 'error');
            }
        } catch (error) {
            console.error('Error fetching interviews:', error);
            showToast('An error occurred while fetching interviews', 'error');
        } finally {
            setLoading(false);
        }
    }, [pagination.per_page]);

    React.useEffect(() => {
        document.addEventListener("mousedown", onShowCreateDropdown);
        document.addEventListener("mousedown", onShowStatusDropdown);
        return () => {
            document.removeEventListener("mousedown", onShowCreateDropdown);
            document.removeEventListener("mousedown", onShowStatusDropdown);
        };
    }, []);

    // Load interviews on component mount
    React.useEffect(() => {
        fetchInterviews(1);
    }, [fetchInterviews]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            const statusFilter = status.status === "All Status" ? undefined : status.status.toLowerCase().replace(' ', '_') as any;
            fetchInterviews(newPage, statusFilter);
        }
    };

    const getStatusDisplay = (status: string) => {
        const statusConfig = {
            'in_progress': { text: 'In Progress', color: 'bg-blue-500', borderColor: 'border-blue-100', textColor: 'text-blue-700' },
            'completed': { text: 'Completed', color: 'bg-slate-500', borderColor: 'border-gray-300', textColor: 'text-gray-700' },
            'cancelled': { text: 'Cancelled', color: 'bg-red-500', borderColor: 'border-red-100', textColor: 'text-red-700' },
        };
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
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

    const handleJoinInterview = (interviewId: string) => {
        // Navigate to interview room
        window.location.href = `/app/live-interview/live/${interviewId}`;
    };

    const handleEndInterview = async (interviewId: string) => {
        try {
            const response = await restApi.leaveInterview(interviewId, 'leave');
            if (response.status === 200) {
                showToast('Interview ended successfully', 'success');
                localStorage.removeItem('currentInterview');
                dispatch({
                    type: "isLeaveInterview",
                    payload: {
                        status: false,
                        link: ""
                    }
                });
                fetchInterviews(pagination.current_page, status.status === "All Status" ? undefined : status.status.toLowerCase().replace(' ', '_') as any);
            } else {
                console.error('Failed to end interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to end interview', 'error');
            }
        } catch (error) {
            console.error('Error ending interview:', error);
            showToast('An error occurred while ending interview', 'error');
        }
    };

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-10 lg:pl-14 md:max-h-screen">
                <div>
                    <h1 className="text-left text-3xl font-semibold leading-8">
                        Live Interview
                    </h1>
                    <div className="mt-4 max-w-[640px] text-lg font-medium leading-6 text-slate-700">
                        Live Interview offers a variety of interview scenarios and provides
                        customized add-ons tailored to different industries.
                    </div>
                </div>
                <div className="mb-4 flex-col justify-between gap-4 sm:flex md:flex-row">
                    <div className="hidden gap-4 md:flex">
                        <div className="relative">
                            <button
                                onClick={() => setShowInterviewModal(true)}
                                disabled={state.isLeaveInterview.status}
                                className={`items-center whitespace-nowrap rounded-md text-md font-medium text-slate-500 hover:bg-opacity-90 px-4 py-2 relative flex flex-col justify-between md:h-10 md:flex-row ${state.isLeaveInterview.status
                                    ? "bg-slate-500 cursor-not-allowed"
                                    : "bg-sky-500"
                                    }`}
                            >
                                <div className="flex flex-row items-center text-white gap-2">
                                    <Icon icon="LiveInterview" />
                                    {state.isLeaveInterview.status ? 'Interview in Progress' : 'Start Live Interview'}
                                </div>
                            </button>
                        </div>
                        <Link to="/app/permission-setting" className="flex border border-sky-300 gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium h-10 px-4 py-2 text-sky-600">
                            <Icon className="flex items-center w-6 h-6 text-sky-600" icon="Setting" />
                            Setting
                        </Link>
                    </div>
                    <div className="hidden gap-4 md:flex">
                        <Select
                            onDropdown={() => setShowStatusDropdown(true)}
                            showDropdown={showStatusDropdown}
                            value={status.status}
                            obk="status"
                            onHandle={onHandleStatus}
                            data={["All Status", "In Progress", "Completed", "Cancelled"]}
                            dropdownRef={showStatusDropdownRef}
                        />
                    </div>
                    <div className="flex flex-1 gap-2 md:hidden">
                        <button
                            onClick={() => setShowInterviewModal(true)}
                            disabled={state.isLeaveInterview.status}
                            className={`items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 box-content flex h-[50px] flex-1 flex-col px-4 py-2.5 ${state.isLeaveInterview.status
                                ? "bg-slate-500 cursor-not-allowed"
                                : "!bg-design-orange"
                                }`}
                        >
                            <Icon icon="New" className="text-white" />
                            <span className="text-lg font-medium text-slate-50">
                                {state.isLeaveInterview.status ? 'Interview in Progress' : 'Live Interview'}
                            </span>
                        </button>
                    </div>
                    <div className="-mb-6 mt-4 block border-b border-slate-100 md:hidden" />
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-slate-500">Loading interviews...</div>
                    </div>
                ) : (
                    <>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-md hidden md:table">
                                <thead>
                                    <tr className="border-b transition-colors hover:bg-sky-200/50 h-12 bg-slate-50">
                                        <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">Interview</th>
                                        <th className="h-10 px-2 text-left align-middle hidden w-2/12 font-semibold text-slate-900 sm:table-cell">Status</th>
                                        <th className="h-10 px-2 text-left align-middle hidden w-3/12 cursor-pointer font-semibold text-slate-900 md:table-cell">Created</th>
                                        <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {interviews.length === 0 ? (
                                        <tr className="border-b transition-colors hover:bg-sky-200/50">
                                            <td colSpan={4} className="p-8 text-center text-slate-500">
                                                No interviews found. Start your first interview!
                                            </td>
                                        </tr>
                                    ) : (
                                        interviews.map((interview) => {
                                            const statusDisplay = getStatusDisplay(interview.status);
                                            return (
                                                <tr key={interview.interview_id} className="border-b text-slate-600 hover:bg-sky-200/50 text-md">
                                                    <td className="p-2 align-middle">
                                                        <span className="inline-block max-w-64 truncate ">
                                                            {interview.title || 'Untitled Interview'}
                                                        </span>
                                                    </td>
                                                    <td className="p-2 align-middle hidden sm:table-cell">
                                                        <span className={`inline-flex items-center rounded-xl border px-2.5 py-1.5 ${statusDisplay.borderColor} ${statusDisplay.textColor}`}>
                                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusDisplay.color}`} />
                                                            <span className="text-xs">{statusDisplay.text}</span>
                                                        </span>
                                                    </td>
                                                    <td className="p-2 align-middle hidden md:table-cell">
                                                        {formatDate(interview.created_at)}
                                                    </td>
                                                    <td className="p-2 align-middle flex items-center gap-3">
                                                        {interview.status === 'in_progress' && (
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleJoinInterview(interview.interview_id)}
                                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600"
                                                                >
                                                                    Join
                                                                </button>
                                                                <span>/</span>
                                                                <button
                                                                    onClick={() => handleEndInterview(interview.interview_id)}
                                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600"
                                                                >
                                                                    End
                                                                </button>
                                                            </div>
                                                        )}
                                                        {interview.status === 'completed' && (
                                                            <span>/</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile view */}
                        <div className="flex flex-col rounded-lg border border-slate-200 md:hidden">
                            {interviews.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    No interviews found. Start your first interview!
                                </div>
                            ) : (
                                interviews.map((interview) => {
                                    const statusDisplay = getStatusDisplay(interview.status);
                                    return (
                                        <div key={interview.interview_id} className="p-4 border-b border-slate-200 last:border-b-0">
                                            <div className="font-base truncate font-semibold text-slate-900">
                                                {interview.title || 'Untitled Interview'}
                                            </div>
                                            <div className="font-base text-slate-400">Live Interview</div>
                                            <div className="font-base text-slate-400">{formatDate(interview.created_at)}</div>
                                            <div className="mt-2">
                                                <span className={`inline-flex items-center rounded-xl border px-2.5 py-1.5 ${statusDisplay.borderColor} ${statusDisplay.textColor}`}>
                                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusDisplay.color}`} />
                                                    <span className="text-xs">{statusDisplay.text}</span>
                                                </span>
                                            </div>
                                            {interview.status === 'in_progress' && (
                                                <div>
                                                    <button
                                                        onClick={() => handleJoinInterview(interview.interview_id)}
                                                        className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600"
                                                    >
                                                        Join Interview
                                                    </button>
                                                    <button
                                                        onClick={() => handleEndInterview(interview.interview_id)}
                                                        className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600"
                                                    >
                                                        End Interview
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination.total_pages > 1 && (
                            <div className="my-4 flex h-8 items-center justify-center gap-6">
                                <div className="flex items-center space-x-2 antialiased">
                                    <h4>
                                        <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                                        <span className="text-xs font-medium text-slate-900">{pagination.current_page}/{pagination.total_pages}</span>
                                    </h4>
                                    <h4>
                                        <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                                        <span className="text-xs font-medium text-slate-900">{pagination.total_interviews}</span>
                                    </h4>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.current_page - 1)}
                                        disabled={!pagination.has_previous}
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0 ${!pagination.has_previous ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                                            }`}
                                    >
                                        <Icon icon="ArrowLeft" />
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(pagination.current_page + 1)}
                                        disabled={!pagination.has_next}
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0 ${!pagination.has_next ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'
                                            }`}
                                    >
                                        <Icon icon="ChevronRight" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {showInterviewModal && (<InterviewModal isOpen={showInterviewModal} onClose={() => setShowInterviewModal(false)} />)}
        </Layout>
    )
}

export default HomeIndex