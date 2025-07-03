import React, { useState, useRef, useCallback } from 'react';
import { restApi } from '../context/restApi';
import Icon from './icon';

interface UploadedDocument {
    filename: string;
    url: string;
    type: string;
    uploaded_at: string;
}

interface DocumentUploadProps {
    onUploadSuccess?: (document: UploadedDocument) => void;
    onUploadError?: (error: string) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadSuccess, onUploadError }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [documents, setDocuments] = useState<UploadedDocument[]>([]);
    const [loadingDocuments, setLoadingDocuments] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch user documents
    const fetchDocuments = useCallback(async () => {
        setLoadingDocuments(true);
        try {
            const response = await restApi.postRequest('get-documents');
            console.log('Get documents response:', response);
            
            if (response.status === 200 && response.data?.data) {
                setDocuments(response.data.data);
            } else {
                console.error('Failed to fetch documents:', response.data?.msg || response.msg);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoadingDocuments(false);
        }
    }, []);

    // Load documents on component mount
    React.useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    const handleFiles = async (files: FileList) => {
        if (files.length === 0) return;

        const file = files[0];
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        
        if (!allowedTypes.includes(file.type)) {
            const error = 'Invalid file type. Only PDF and DOCX files are allowed.';
            onUploadError?.(error);
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB
            const error = 'File too large. Maximum size is 10MB.';
            onUploadError?.(error);
            return;
        }

        await uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        
        try {
            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading file:', file.name, 'Size:', file.size);
            const response = await restApi.postRequest('upload-document', formData);
            console.log('Upload response:', response);
            
            // Check if the request was successful (status 200)
            if (response.status === 200 && response.data?.msg === 'Document uploaded successfully') {
                const newDocument = response.data.data;
                setDocuments(prev => [...prev, newDocument]);
                onUploadSuccess?.(newDocument);
                console.log('Document uploaded successfully:', newDocument);
            } else {
                // Handle error response
                const error = response.data?.msg || response.msg || 'Upload failed';
                console.error('Upload failed:', error);
                onUploadError?.(error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            onUploadError?.('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const deleteDocument = async (filename: string) => {
        try {
            const response = await restApi.postRequest('delete-document', { filename });
            console.log('Delete response:', response);
            
            if (response.status === 200 && response.data?.msg === 'Document deleted successfully') {
                setDocuments(prev => prev.filter(doc => doc.filename !== filename));
            } else {
                const error = response.data?.msg || response.msg || 'Delete failed';
                onUploadError?.(error);
            }
        } catch (error) {
            console.error('Delete error:', error);
            onUploadError?.('Delete failed. Please try again.');
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return 'FileText'; // You might want to use a specific PDF icon
            case 'docx':
            case 'doc':
                return 'FileText';
            default:
                return 'File';
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                    dragActive
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                } ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleInputChange}
                    className="hidden"
                />
                
                <div className="flex flex-col items-center space-y-4">
                    {isUploading ? (
                        <>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600">Uploading document...</p>
                        </>
                    ) : (
                        <>
                            <Icon className="w-12 h-12 text-gray-400" icon="Upload" />
                            <div>
                                <p className="text-lg font-semibold text-gray-700">
                                    Drop your document here, or click to browse
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Supports PDF and DOCX files up to 10MB
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Documents List */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Uploaded Documents</h3>
                
                {loadingDocuments ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-600">Loading documents...</span>
                    </div>
                ) : documents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Icon className="w-16 h-16 mx-auto mb-2 text-gray-300" icon="FileText" />
                        <p>No documents uploaded yet</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {documents.map((doc, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        className="w-6 h-6 text-blue-500"
                                        icon={getFileIcon(doc.type)}
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{doc.filename}</p>
                                        <p className="text-sm text-gray-500">
                                            {doc.type.toUpperCase()} • Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => deleteDocument(doc.filename)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete document"
                                >
                                    <Icon className="w-4 h-4" icon="Trash2" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentUpload; 