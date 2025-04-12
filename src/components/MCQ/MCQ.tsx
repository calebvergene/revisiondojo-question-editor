import React from 'react'
import { Option, Question } from '@/types/index'

interface props {
    addOption: () => void
    removeOption: (id: number) => void
    updateOption: (id: number, field: keyof Option, value: any) => void
    question: Question
}

const MCQ = ({ addOption, removeOption, updateOption, question }: props) => {
    // prevent default behavior that might cause refresh
    const handleAddOption = (e: React.MouseEvent) => {
        e.preventDefault();
        addOption();
    };

    return (
        <div className="p-5 border mt-1 rounded-xl">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Options</h2>
                <button
                    onClick={handleAddOption}
                    type="button" // Explicitly set type to "button" to prevent form submission
                    className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    <span>Add Option</span>
                </button>
            </div>
            {question.options.length === 0 ? (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500">No options added yet. Click "Add Option" to create a multiple-choice option.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-4 p-4 border rounded-xl">
                            <div>{option.id}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MCQ