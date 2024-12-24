import React from "react";
import Icon from "../../../components/icon";

const RealtimeResponseCustomizer = ({ onNext, onPrev }: { onNext: VoidFunction, onPrev: VoidFunction }) => {

    const [uploadedFile, setUploadedFile] = React.useState(null as File | null);

    const onFileUpload = (e: any) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setUploadedFile(file); // Update state with the selected file
            console.log("Uploaded file:", file);
            // Add your upload logic here (e.g., send to server)
        }
    }
    return (

        <div>
            <button onClick={onPrev} className="flex gap-2 items-center">
                <Icon icon="ArrowLeft" />
                <span>Back</span>
            </button>
            <div className="my-9">
                <div className="mb-2 text-sm font-medium text-slate-900">2/4</div>
                <p className="text-2xl font-semibold leading-8 text-slate900">
                    Help us tailor our realtime responses to you
                </p>
                <div className="mt-2 text-sm font-medium leading-5 text-slate-500">
                    Our AI will generate realtime responses to your interviewer’s questions
                    based on your experience.
                </div>
                <div>
                    <div className="mt-4">
                        <div className="mb-2 text-sm font-medium leading-5 text-slate-900">
                            Upload your resume
                        </div>
                        <div className="h-auto w-full break-all">
                            <div className="h-auto w-full">

                                {!uploadedFile ? (
                                    <div className="relative flex h-20 w-full items-center justify-center rounded-md border border-dashed border-slate-400">
                                        <input
                                            onClick={onFileUpload}
                                            accept=".pdf,.docx,.doc,.DOC,.PDF,.DOCX"
                                            type="file"
                                            title="Upload file"
                                            className="z-10 absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                                        />
                                        <div className="inline-flex items-center">
                                            <Icon icon="Upload" />
                                            <span className="ml-2 text-sm font-medium leading-6">
                                                Drag or Click to Upload
                                            </span>
                                        </div>
                                    </div>

                                ) : (
                                    <div className="flex h-auto justify-between rounded-md bg-slate-100 p-6">
                                        <div>{uploadedFile.name}</div>
                                        <div onClick={() => setUploadedFile(null)} className="flex cursor-pointer items-center">
                                            <Icon icon="Trash" />
                                        </div>
                                    </div>
                                )}
                                <div className="mt-2 text-xs font-medium leading-4 text-slate-400">
                                    Only PDF, DOC, or DOCX files up to 10 MB are accepted.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    onClick={onNext}
                    className="bg-slate-900 text-white rounded-md text-sm font-medium px-4 py-3 mb-3 w-full"
                >
                    Next Step
                </button>
                <button className="text-sm px-4 py-2 w-full hover:bg-slate-100 hover:text-slate-900 font-semibold text-slate-400">
                    Skip This Step
                </button>
            </div>
        </div>

    )
}

export default RealtimeResponseCustomizer