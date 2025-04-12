import React from 'react'
import { Option, Question } from '@/types/index'
import { Plus } from 'lucide-react'
import OptionSelection from './OptionSelection'

interface Props {
    addOption: () => void
    removeOption: (id: number) => void
    updateOption: (id: number, field: keyof Option, value: any) => void
    question: Question
}

const MCQ = ({ addOption, removeOption, updateOption, question }: Props) => {
    // prevent refresh
    const handleAddOption = (e: React.MouseEvent) => {
        e.preventDefault();
        addOption();
    };

    return (
        <div className="px-5 py-3 border mt-1 rounded-xl h-full overflow-y-scroll">

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-extrabold">Answer Choices</h2>
                <button
                    onClick={handleAddOption}
                    type="button"
                    className="flex items-center space-x-1 px-3 py-1.5 font-bold bg-neutral-100 text-neutral-500 rounded-2xl hover:bg-neutral-200 duration-100 cursor-pointer"
                >
                    <Plus size={16} />
                    <span>Add Option</span>
                </button>
            </div>

            {question.options.length === 0 ? (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500">No options added yet. Click "Add Option" to create a multiple-choice option.</p>
                </div>
            ) : (
                <div className="space-y-4 mt-3 mb-1.5">
                    {question.options.map((option) => (
                        <OptionSelection
                            key={option.id}
                            removeOption={removeOption}
                            updateOption={updateOption}
                            option={option}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MCQ