import React from "react"

import Icon from "../../../components/icon"
import Layout from "../components/layout"
import { Select } from "../../../components/select"
import MockInterviewModal from "../components/mock-interview-modal"
import { useGlobalContext } from "../../../context"
import { restApi } from "../../../context/restApi"
import { showToast } from "../../../context/helper"
import { useNavigate } from "react-router-dom"
interface MockInterview {
    interview_id: string;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PaginationInfo {
    current_page: number;
    per_page: number;
    total_mock_interviews: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}

const MockInterview = () => {
    const navigate = useNavigate();
    const [state, { dispatch }] = useGlobalContext();
    const [showMockInterviewModal, setShowMockInterviewModal] = React.useState(false)
    const [showCreateSessionModal, setShowCreateSessionModal] = React.useState(false)
    const [showJoinSessionModal, setShowJoinSessionModal] = React.useState(false)
    const [status, setStatus] = React.useState({
        status: "All Status"
    })
    const [showStatusDropdown, setShowStatusDropdown] = React.useState(false)
    const [mockInterviews, setMockInterviews] = React.useState<MockInterview[]>([])
    const [pagination, setPagination] = React.useState<PaginationInfo>({
        current_page: 1,
        per_page: 10,
        total_mock_interviews: 0,
        total_pages: 0,
        has_next: false,
        has_previous: false
    })
    const [loading, setLoading] = React.useState(false)
    const [isCreatingSession, setIsCreatingSession] = React.useState(false)

    // Session creation state
    const [sessionData, setSessionData] = React.useState({
        specialty: 'general',
        session_type: 'examiner'
    })
    const [joinSessionCode, setJoinSessionCode] = React.useState('')
    const [joinSessionRole, setJoinSessionRole] = React.useState<'examiner' | 'student'>('student')

    const showStatusDropdownRef = React.useRef<HTMLDivElement | null>(null);

    const onHandleStatus = (v: string, obk: string) => {
        setStatus({ ...status, [obk]: v });
        setShowStatusDropdown(false)
        // Fetch interviews with new status filter
        const statusFilter = v === "All Status" ? undefined : v.toLowerCase().replace(" ", "_") as 'active' | 'completed' | 'cancelled';
        fetchMockInterviews(1, statusFilter);
    }

    const onShowStatusDropdown = (event: MouseEvent) => {
        if (showStatusDropdownRef.current && !showStatusDropdownRef.current.contains(event.target as Node)) {
            setShowStatusDropdown(false);
        }
    };

    const fetchMockInterviews = React.useCallback(async (page: number = 1, statusFilter?: 'active' | 'completed' | 'cancelled') => {
        setLoading(true);
        try {
            const params: any = {
                page,
                per_page: pagination.per_page
            };

            if (statusFilter) {
                params.status = statusFilter;
            }

            const response = await restApi.getMockInterviews(params);

            if (response.status === 200 && response.data?.data) {
                setMockInterviews(response.data.data);
                if (response.data.pagination) {
                    setPagination(response.data.pagination);
                }
            } else {
                console.error('Failed to fetch mock interviews:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to fetch mock interviews', 'error');
            }
        } catch (error) {
            console.error('Error fetching mock interviews:', error);
            showToast('An error occurred while fetching mock interviews', 'error');
        } finally {
            setLoading(false);
        }
    }, [pagination.per_page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            const statusFilter = status.status === "All Status" ? undefined : status.status.toLowerCase().replace(" ", "_") as 'active' | 'completed' | 'cancelled';
            fetchMockInterviews(newPage, statusFilter);
        }
    };

    const handleEndMockInterview = async (interviewId: string) => {
        if (!interviewId) {
            console.error("No mock interview ID provided");
            showToast("Error: No mock interview ID found", "error");
            return;
        }

        try {
            const response = await restApi.leaveMockInterview(interviewId, 'leave');

            if (response.status === 200) {
                // Clear mock interview state from localStorage
                localStorage.removeItem('currentInterview');
                dispatch({
                    type: "isLeaveInterview",
                    payload: {
                        status: false,
                        link: ""
                    }
                })
                fetchMockInterviews(pagination.current_page)
            } else {
                console.error('Failed to complete mock interview:', response.data?.msg || response.msg);
                showToast(response.data?.msg || response.msg || 'Failed to complete mock interview', 'error');
            }
        } catch (error) {
            console.error('Error completing mock interview:', error);
            showToast('An error occurred while completing the mock interview', 'error');
        }
    };

    const handleJoinMockInterview = (interviewId: string) => {
        localStorage.setItem('currentInterview', JSON.stringify({
            interviewId: interviewId,
            link: `/app/mock-interview/mock/${interviewId}`,
            status: true,
            timestamp: new Date().toISOString()
        }));
        navigate(`/app/mock-interview/mock/${interviewId}`)
    }

    const handleCreateSession = async () => {
        setIsCreatingSession(true)
        try {
            const response = await restApi.postRequest('mock-interview-create-session', sessionData);

            if (response.status === 200 && response.data?.data) {
                const { session_code } = response.data.data;
                showToast(`Session created! Code: ${session_code}`, 'success');
                setShowCreateSessionModal(false);

                // Navigate to the session room
                navigate(`/app/mock-interview/session/${session_code}`);
            } else {
                showToast('Failed to create session', 'error');
            }
        } catch (error) {
            console.error('Error creating session:', error);
            showToast('An error occurred while creating the session', 'error');
        } finally {
            setIsCreatingSession(false)
        }
    };

    const handleJoinSession = async () => {
        if (!joinSessionCode.trim()) {
            showToast('Please enter a session code', 'warning');
            return;
        }

        try {
            const response = await restApi.postRequest('mock-interview-join-session', {
                session_code: joinSessionCode,
                session_type: joinSessionRole
            });

            if (response.status === 200 && response.data?.data) {
                showToast('Successfully joined session!', 'success');
                setShowJoinSessionModal(false);

                // Navigate to the session room
                navigate(`/app/mock-interview/session/${joinSessionCode}`);
            } else {
                showToast(response.data?.msg || 'Failed to join session', 'error');
            }
        } catch (error) {
            console.error('Error joining session:', error);
            showToast('An error occurred while joining the session', 'error');
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", onShowStatusDropdown);
        return () => {
            document.removeEventListener("mousedown", onShowStatusDropdown);
        };
    }, []);

    // Load mock interviews on component mount
    React.useEffect(() => {
        fetchMockInterviews(1);
    }, [fetchMockInterviews]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'in_progress':
                return 'bg-blue-500';
            case 'completed':
                return 'bg-slate-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-slate-500';
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

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-10 lg:pl-14 md:max-h-screen">
                <div>
                    <h1 className="text-left text-3xl font-semibold leading-8">
                        Mock Interview
                    </h1>
                    <div className="mt-4 max-w-[640px] text-lg font-medium leading-6 text-slate-700">
                        Prepare for the interview in advance and get yourself in the best possible state.
                    </div>
                </div>
                <div className="mb-4 flex-col justify-between gap-4 sm:flex md:flex-row">
                    <div className="hidden gap-4 md:flex">
                        <button
                            onClick={() => setShowMockInterviewModal(!showMockInterviewModal)}
                            disabled={state.isLeaveInterview.status}
                            className={`whitespace-nowrap flex items-center gap-2 justify-center gap-y-3 rounded-md p-3 text-sm font-medium text-white ${state.isLeaveInterview.status
                                ? "bg-slate-500 cursor-not-allowed"
                                : "bg-sky-500 hover:opacity-80"
                                }`}
                        >
                            <Icon icon="MockInterview" />
                            <span className="text-sm font-medium">
                                {state.isLeaveInterview.status ? 'Interview in Progress' : 'Start Mock Interview'}
                            </span>
                        </button>
                        <button
                            onClick={() => setShowCreateSessionModal(true)}
                            className="whitespace-nowrap flex items-center gap-2 justify-center gap-y-3 rounded-md p-3 text-sm font-medium text-white bg-green-600 hover:opacity-80"
                        >
                            <Icon icon="New" />
                            <span className="text-sm font-medium">
                                Create Session
                            </span>
                        </button>
                        <button
                            onClick={() => setShowJoinSessionModal(true)}
                            className="whitespace-nowrap flex items-center gap-2 justify-center gap-y-3 rounded-md p-3 text-sm font-medium text-white bg-purple-600 hover:opacity-80"
                        >
                            <Icon icon="MockInterview" />
                            <span className="text-sm font-medium">
                                Join Session
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
                            data={["All Status", "Active", "Completed", "Cancelled"]}
                            dropdownRef={showStatusDropdownRef}
                        />
                    </div>
                    <div className="flex flex-1 gap-2 md:hidden">
                        <button
                            onClick={() => setShowMockInterviewModal(true)}
                            disabled={state.isLeaveInterview.status}
                            className={`items-center justify-center whitespace-nowrap rounded-md text-md font-medium bg h-[50px] flex-1 flex-col px-4 py-2.5 ${state.isLeaveInterview.status
                                ? "bg-slate-500 cursor-not-allowed"
                                : "!bg-design-orange"
                                }`}
                        >
                            <Icon icon="New" className="text-white" />
                            <span className="text-lg font-medium text-slate-50">
                                {state.isLeaveInterview.status ? 'Interview in Progress' : 'Mock Interview'}
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
                                    <th className="h-10 px-2 text-left align-middle hidden w-3/12 cursor-pointer font-semibold text-slate-900 md:table-cell">
                                        Created
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle w-3/12 font-semibold text-slate-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {mockInterviews.length === 0 ? (
                                <tbody className="[&_tr:last-child]:border-0">
                                    <tr className="border-b transition-colors hover:bg-slate-500/50">
                                        <td colSpan={4} className="p-8 text-center text-slate-500">
                                            No mock interviews found. Start your first mock interview!
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody className="[&_tr:last-child]:border-0">
                                    {mockInterviews.map((interview) => (
                                        <tr key={interview.interview_id} className="border-b transition-colors hover:bg-sky-100/50">
                                            <td className="p-2 align-middle">
                                                <span className="inline-block max-w-64 truncate">
                                                    <div className="font-semibold">{interview.title || 'Untitled Interview'}</div>
                                                    <div className="text-[11px] text-slate-500">Mock Interview</div>
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden sm:table-cell">
                                                <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(interview.status)}`} />
                                                    <span className={`text-xs text-slate-700 capitalize ${interview.status.toLowerCase() === 'in_progress' ? 'text-green-500' : 'text-slate-700'}`}>{interview.status}</span>
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle hidden md:table-cell">
                                                {formatDate(interview.created_at)}
                                            </td>
                                            <td className="p-2 align-middle flex items-center gap-3">
                                                {interview.status.toLowerCase() === 'in_progress' && (
                                                    <button onClick={() => handleJoinMockInterview(interview.interview_id)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600">
                                                        Join
                                                    </button>
                                                )}
                                                {interview.status.toLowerCase() === 'in_progress' && (
                                                    <button onClick={() => handleEndMockInterview(interview.interview_id)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600">
                                                        End
                                                    </button>
                                                )}
                                                {interview.status.toLowerCase() === 'completed' && (
                                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-green-500 text-white px-3 py-1.5 hover:bg-green-600">
                                                        View Results
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

                {/* Mobile view for mock interviews */}
                {!loading && mockInterviews.length > 0 && (
                    <div className="flex flex-col gap-3 md:hidden">
                        {mockInterviews.map((interview) => (
                            <div key={interview.interview_id} className="flex flex-col rounded-lg border border-slate-200">
                                <div className="p-4">
                                    <div className="font-base truncate font-semibold text-slate-900">
                                        {interview.title || 'Untitled Interview'}
                                    </div>
                                    <div className="font-base text-slate-400">Mock Interview</div>
                                    <div className="font-base text-slate-400">{formatDate(interview.created_at)}</div>
                                    <div className="mt-2">
                                        <span className="inline-flex items-center rounded-xl border border-slate-100 bg-white px-2.5 py-1.5">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(interview.status)}`} />
                                            <span className="text-xs text-slate-700 capitalize">{interview.status}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="align-items box-content rounded-b-lg bg-slate-50 p-2">
                                    <div className="flex gap-2">
                                        {interview.status.toLowerCase() === 'active' && (
                                            <>
                                                <button className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-sky-500 text-white px-3 py-1.5 hover:bg-sky-600">
                                                    Join
                                                </button>
                                                <button className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-red-500 text-white px-3 py-1.5 hover:bg-red-600">
                                                    End
                                                </button>
                                            </>
                                        )}
                                        {interview.status.toLowerCase() === 'completed' && (
                                            <button className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-green-500 text-white px-3 py-1.5 hover:bg-green-600">
                                                View Results
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && mockInterviews.length > 0 && (
                    <div className="my-4 flex h-8 items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 antialiased">
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                                <span className="text-xs font-medium text-slate-900">{pagination.current_page}/{pagination.total_pages}</span>
                            </h4>
                            <h4>
                                <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                                <span className="text-xs font-medium text-slate-900">{pagination.total_mock_interviews}</span>
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
            </div>
            {showMockInterviewModal && (<MockInterviewModal isOpen={showMockInterviewModal} onClose={() => setShowMockInterviewModal(false)} />)}

            {/* Create Session Modal */}
            {showCreateSessionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Create Mock Interview Session</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Specialty
                                </label>
                                <select
                                    value={sessionData.specialty}
                                    onChange={(e) => setSessionData({ ...sessionData, specialty: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="general">General</option>
                                    <option value="internal_medicine">Internal Medicine</option>
                                    <option value="surgery">Surgery</option>
                                    <option value="pediatrics">Pediatrics</option>
                                    <option value="psychiatry">Psychiatry</option>
                                    <option value="emergency_medicine">Emergency Medicine</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Role
                                </label>
                                <select
                                    value={sessionData.session_type}
                                    onChange={(e) => setSessionData({ ...sessionData, session_type: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="examiner">Examiner</option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6 justify-end">
                            <button onClick={() => setShowCreateSessionModal(false)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-[13px] font-medium ring-offset-background transition-colors border bg-white hover:bg-sky-100 px-4 py-2 mt-2 sm:mt-0 h-[42px] md:h-9">
                                Cancel
                            </button>
                            <span>
                                <button
                                    onClick={handleCreateSession}
                                    disabled={state.isLeaveInterview.status || isCreatingSession}
                                    className={`inline-flex justify-center items-center text-center text-white px-4 py-2 mt-2 sm:mt-0 h-[42px] md:h-9 rounded-md ${state.isLeaveInterview.status || isCreatingSession
                                        ? "bg-slate-500 cursor-not-allowed"
                                        : "bg-[linear-gradient(90deg,_#0090FF_0%,_#00F7FF_100%)] hover:bg-[linear-gradient(90deg,_#0091ffa2_0%,_#00f7ff7f_100%)]"
                                        }`}
                                >
                                    {isCreatingSession ? 'Creating...' : state.isLeaveInterview.status ? 'Interview in Progress' : 'Launch'}
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Join Session Modal */}
            {showJoinSessionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-lg font-semibold mb-4">Join Mock Interview Session</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Session Code
                                </label>
                                <input
                                    type="text"
                                    value={joinSessionCode}
                                    onChange={(e) => setJoinSessionCode(e.target.value.toUpperCase())}
                                    placeholder="Enter session code"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    maxLength={8}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Role
                                </label>
                                <select
                                    value={joinSessionRole}
                                    onChange={(e) => setJoinSessionRole(e.target.value as 'examiner' | 'student')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="student">Student</option>
                                    <option value="examiner">Examiner</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowJoinSessionModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleJoinSession}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Join Session
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export default MockInterview