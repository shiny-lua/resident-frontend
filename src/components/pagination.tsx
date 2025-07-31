import React from "react";
import Icon from "./icon";

interface PaginationInfo {
    current_page: number;
    per_page: number;
    total_documents: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}

interface PaginationProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    className?: string;
    loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
    pagination, 
    onPageChange, 
    className = "",
    loading = false
}) => {
    const handlePreviousPage = () => {
        if (pagination.has_previous && !loading) {
            onPageChange(pagination.current_page - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.has_next && !loading) {
            onPageChange(pagination.current_page + 1);
        }
    };

    return (
        <div className={`my-4 flex h-8 items-center justify-center gap-6 ${className}`}>
            <div className="flex items-center space-x-2 antialiased">
                <h4>
                    <span className="text-xs font-medium text-[#6B7280]"> Page </span>
                    <span className="text-xs font-medium text-slate-900">
                        {pagination.current_page}/{pagination.total_pages || 1}
                    </span>
                </h4>
                <h4>
                    <span className="text-xs font-medium text-[#6B7280]"> Total </span>
                    <span className="text-xs font-medium text-slate-900">
                        {pagination.total_documents}
                    </span>
                </h4>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handlePreviousPage}
                    disabled={!pagination.has_previous || loading}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0 ${
                        pagination.has_previous && !loading
                            ? 'hover:bg-slate-100 cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    <Icon icon="ArrowLeft" />
                </button>
                <button 
                    onClick={handleNextPage}
                    disabled={!pagination.has_next || loading}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium border-slate-300 box-content h-8 w-8 px-0 py-0 ${
                        pagination.has_next && !loading
                            ? 'hover:bg-slate-100 cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    <Icon icon="ChevronRight" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
export type { PaginationInfo }; 