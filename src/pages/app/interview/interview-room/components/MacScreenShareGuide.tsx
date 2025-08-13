import React from 'react';
import Icon from '../../../../../components/icon';

interface MacScreenShareGuideProps {
    isVisible: boolean;
    onClose: () => void;
}

const MacScreenShareGuide: React.FC<MacScreenShareGuideProps> = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    // Debug information
    const debugInfo = {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        isSecureContext: window.isSecureContext,
        protocol: location.protocol,
        hasGetDisplayMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia),
        isMacOS: navigator.platform.toLowerCase().includes('mac') || navigator.userAgent.toLowerCase().includes('mac'),
        isChrome: navigator.userAgent.toLowerCase().includes('chrome'),
        isSafari: navigator.userAgent.toLowerCase().includes('safari') && !navigator.userAgent.toLowerCase().includes('chrome'),
        isFirefox: navigator.userAgent.toLowerCase().includes('firefox')
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Icon icon="Apple" className="w-6 h-6 mr-2" />
                        Mac Screen Sharing Setup
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <Icon icon="Close" className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Debug Information (only show if there are issues) */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">🔍 System Information:</h3>
                        <div className="text-xs text-gray-600 space-y-1">
                            <div><strong>Platform:</strong> {debugInfo.platform}</div>
                            <div><strong>Browser:</strong> {debugInfo.isChrome ? 'Chrome' : debugInfo.isSafari ? 'Safari' : debugInfo.isFirefox ? 'Firefox' : 'Other'}</div>
                            <div><strong>Secure Context:</strong> {debugInfo.isSecureContext ? '✅ Yes' : '❌ No'}</div>
                            <div><strong>Protocol:</strong> {debugInfo.protocol}</div>
                            <div><strong>Screen Share Support:</strong> {debugInfo.hasGetDisplayMedia ? '✅ Yes' : '❌ No'}</div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Why screen sharing might not work on Mac:</h3>
                        <ul className="text-blue-800 text-sm space-y-1">
                            <li>• System-level screen recording permissions not granted</li>
                            <li>• Browser not added to Screen Recording permissions</li>
                            <li>• Using Safari instead of Chrome (less reliable)</li>
                            <li>• Not running on HTTPS (required for screen sharing)</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Step-by-Step Setup:</h3>
                        <ol className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">1</span>
                                <div>
                                    <strong>Open System Preferences</strong>
                                    <p className="text-gray-600 mt-1">Click the Apple menu → System Preferences</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">2</span>
                                <div>
                                    <strong>Go to Security & Privacy</strong>
                                    <p className="text-gray-600 mt-1">Click on "Security & Privacy" in the System Preferences window</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">3</span>
                                <div>
                                    <strong>Select Privacy Tab</strong>
                                    <p className="text-gray-600 mt-1">Click the "Privacy" tab at the top of the window</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">4</span>
                                <div>
                                    <strong>Find Screen Recording</strong>
                                    <p className="text-gray-600 mt-1">In the left sidebar, scroll down and click on "Screen Recording"</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">5</span>
                                <div>
                                    <strong>Add Your Browser</strong>
                                    <p className="text-gray-600 mt-1">Click the lock icon to unlock, then click the "+" button and add your browser (Chrome, Safari, or Firefox)</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">6</span>
                                <div>
                                    <strong>Restart Browser</strong>
                                    <p className="text-gray-600 mt-1">Completely close and restart your browser application</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="font-semibold text-yellow-900 mb-2">💡 Pro Tips:</h3>
                        <ul className="text-yellow-800 text-sm space-y-1">
                            <li>• <strong>Chrome works best</strong> for screen sharing on Mac</li>
                            <li>• Make sure you're on <strong>HTTPS</strong> (not HTTP)</li>
                            <li>• If using Safari, you may need to enable "Develop" menu first</li>
                            <li>• Some corporate networks may block screen sharing</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">✅ Troubleshooting:</h3>
                        <ul className="text-green-800 text-sm space-y-1">
                            <li>• If still not working, try restarting your Mac</li>
                            <li>• Check if your browser is up to date</li>
                            <li>• Try a different browser (Chrome → Firefox → Safari)</li>
                            <li>• Ensure you're not in a private/incognito window</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            // Try to open System Preferences programmatically (Mac only)
                            if (navigator.platform.toLowerCase().includes('mac')) {
                                window.open('x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture');
                            }
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
                    >
                        Open System Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MacScreenShareGuide;
