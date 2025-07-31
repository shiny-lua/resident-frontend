import React from "react";
import Layout from "../components/layout";
import Icon from "../../../components/icon";
import UploadModal from "../components/upload-modal";
import LinkedinProfileModal from "../components/linkedin-profile-modal";
import Pagination, { PaginationInfo } from "../../../components/pagination";
import { restApi } from "../../../context/restApi";
import { formatDate } from "../../../context/helper";

interface UploadedDocument {
    filename: string;
    url: string;
    type: string;
    uploaded_at: string;
}

const Resume = () => {
    const [showUploadModal, setShowUploadModal] = React.useState(false)
    const [showLinkedinProfileModal, setShowLinkedinProfileModal] = React.useState(false)
    const [documents, setDocuments] = React.useState<UploadedDocument[]>([])
    const [pagination, setPagination] = React.useState<PaginationInfo>({
        current_page: 1,
        per_page: 5,
        total_documents: 0,
        total_pages: 0,
        has_next: false,
        has_previous: false
    })
    const [loading, setLoading] = React.useState(false)

    const fetchDocuments = React.useCallback(async (page: number = 1) => {
        setLoading(true)
        try {
            const response = await restApi.postRequest(`get-documents?page=${page}`);
            console.log('Get documents response:', response);

            if (response.status === 200 && response.data?.data) {
                setDocuments(response.data.data);
                if (response.data.pagination) {
                    setPagination(response.data.pagination);
                }
            } else {
                console.error('Failed to fetch documents:', response.data?.msg || response.msg);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false)
        }
    }, []);

    // Load documents on component mount
    React.useEffect(() => {
        fetchDocuments(1);
    }, [fetchDocuments]);

    const handleDelete = async (filename: string) => {
        const response = await restApi.postRequest('delete-document', { filename });
        console.log("response", response);
        if (response.status === 200 && response.data?.msg === 'Document deleted successfully') {
            // Refresh current page after deletion
            fetchDocuments(pagination.current_page);
        } else {
            console.error('Failed to delete document:', response.data?.msg || response.msg);
        }
    }

    const handleDownload = async (doc: UploadedDocument) => {
        try {
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = doc.url;
            link.download = doc.filename;
            link.target = '_blank';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading document:', error);
            // Fallback: open in new tab if download fails
            window.open(doc.url, '_blank');
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            fetchDocuments(newPage);
        }
    }

    return (
        <Layout>
            <div className="w-full relative flex flex-1 flex-col gap-3 p-4 pb-16 lg:gap-4 lg:p-10 lg:pl-14 md:max-h-screen">
                <div className="flex flex-col items-start justify-center border-b border-slate-100 pb-3">
                    <h1 className="text-left text-3xl font-semibold leading-8">
                        Document Center
                    </h1>
                    <div className="mt-4 max-w-[640px] text-lg font-medium leading-6 text-slate-700">
                        Upload your resume, cover letter, notes or any other application materials. AI will extract key content and remind you during the interview to fully showcase yourself.</div>
                </div>
                <div className="flex justify-between md:mb-4">
                    <div className="flex gap-4">
                        <button onClick={() => setShowUploadModal(!showUploadModal)} className="flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-md font-medium border px-6 py-3 relative border-slate-100 bg-primary hover:bg-primary/90 bg-gradient-to-r from-[#0090FF] to-[#00F7FF] text-slate-50">
                            <Icon icon="Upload" />
                            Upload
                        </button>
                        {/* <button className="items-center justify-center gap-1 whitespace-nowrap rounded-md text-md font-medium hover:bg-sky-100 py-1 hidden border border-slate-300 bg-white px-3 shadow-sm md:flex">
                            <Icon icon="New" />
                            <Link to={"/ai-resume-builder"} className="ml-[6px] text-left">
                                <div className="mt-1 text-md text-slate-900">Create</div>
                                <div className="mt-[-6px] text-[10px] text-slate-400">
                                    by AI Resume Builder
                                </div>
                            </Link>
                        </button> */}
                        {/* <button onClick={() => setShowLinkedinProfileModal(!showLinkedinProfileModal)} className="flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-md font-medium border hover:bg-sky-100 py-1 px-4">LinkedIn Profile</button> */}
                    </div>
                </div>
                <div className="h-min">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm hidden md:table">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-sky-100/50 h-12 bg-slate-50">
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">File Name</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Document Type</th>
                                    <th className="h-10 px-2 text-left align-middle cursor-pointer font-semibold text-slate-900">Upload Date</th>
                                    <th className="h-10 px-2 text-left align-middle font-semibold text-slate-900">Action</th>
                                </tr>
                            </thead>

                            {!loading && documents.map((document) => (
                                <tbody key={document.filename}>
                                    <tr className="border-b transition-colors hover:bg-sky-100/50">
                                        <td className="p-2 align-middle">
                                            <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">{document.filename}</div>
                                        </td>
                                        <td className="p-2 align-middle">
                                            <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">{document.type}</div>
                                        </td>
                                        <td className="p-2 align-middle">
                                            <div className="max-w-[500px] overflow-hidden overflow-ellipsis whitespace-nowrap">{formatDate(document.uploaded_at)}</div>
                                        </td>
                                        <td className="p-2 align-middle flex items-center">
                                            <button onClick={() => handleDownload(document)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                                <Icon icon="Download" />
                                            </button>
                                            <button onClick={() => handleDelete(document.filename)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                                <Icon icon="Remove" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                            {loading && (
                                <tbody>
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center">
                                            <div className="text-slate-500">Loading documents...</div>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                    <div className="md:hidden">
                        {!loading && documents.map((document) => (
                            <div key={document.filename} className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <h3 className="font-semibold leading-none tracking-tight break-words">
                                        {document.filename}
                                    </h3>
                                    <p className="text-sm text-muted-foreground break-words" />
                                    <div className="mt-2">
                                        <div>Document Type: {document.type}</div>
                                        <div className="mt-1">Upload Date: {formatDate(document.uploaded_at)}</div>
                                    </div>

                                    <div className="mt-4">
                                        <button onClick={() => handleDownload(document)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10">
                                            <Icon icon="Download" />
                                        </button>
                                        <button onClick={() => handleDelete(document.filename)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border hover:bg-sky-100 h-10 w-10 ml-3">
                                            <Icon icon="Remove" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="rounded-xl border bg-card text-card-foreground mb-4 shadow-none md:hidden">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <div className="text-slate-500 text-center">Loading documents...</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Pagination 
                        pagination={pagination} 
                        onPageChange={handlePageChange}
                        loading={loading}
                    />
                    {documents.length === 0 && !loading && (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-slate-500">No documents found. Upload your first document to get started.</div>
                        </div>
                    )}
                </div>
            </div>
            {showUploadModal && <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onUploadSuccess={() => fetchDocuments(1)} />}
            {showLinkedinProfileModal && <LinkedinProfileModal isOpen={showLinkedinProfileModal} onClose={() => setShowLinkedinProfileModal(false)} />}
        </Layout>
    )
}

export default Resume