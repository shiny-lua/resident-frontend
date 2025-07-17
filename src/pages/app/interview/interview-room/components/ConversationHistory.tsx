import React from 'react';
import type { ConversationHistoryProps } from '../types';

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
    conversations
}) => {
    if (conversations.length === 0) {
        return null;
    }

    return (
        <div className="flex-1">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Conversation History</h4>
            <div className="space-y-3">
                {conversations.map((entry, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-3">
                        <p className="text-xs text-slate-500 mb-1">Question:</p>
                        <p className="text-sm text-slate-700 mb-2">{entry.question}</p>
                        <p className="text-xs text-slate-500 mb-1">AI Response:</p>
                        <p className="text-sm text-slate-600">{entry.answer}</p>
                        <p className="text-xs text-slate-400 mt-1">
                            {entry.timestamp.toLocaleTimeString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConversationHistory; 