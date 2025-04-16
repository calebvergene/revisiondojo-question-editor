import React from 'react'
import { Part, Question } from '@/types/index'
import { Plus } from 'lucide-react'
import LongAnswerPart from './LongAnswerPart'

interface Props {
    addPart: () => void
    removePart: (id: number) => void
    // eslint-disable-next-line
    updatePart: (id: number, field: keyof Part, value: any) => void
    question: Question
    handleDragStart: (type: 'option' | 'part', id: number) => void
    handleDragOver: (e: React.DragEvent, type: 'option' | 'part', id: number) => void
    handleDragEnd: () => void
}

const LongAnswer = ({ addPart, removePart, updatePart, question, handleDragStart, handleDragOver, handleDragEnd }: Props) => {
    // prevent refresh
    const handleAddPart = (e: React.MouseEvent) => {
        e.preventDefault();
        addPart();
    };

    return (
        <div className="px-5 py-3 border mt-1 rounded-xl h-full overflow-y-scroll">

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-extrabold">Question Parts</h2>
                <button
                    onClick={handleAddPart}
                    type="button"
                    className="flex items-center space-x-1 px-3 py-1.5 font-bold bg-neutral-100 text-neutral-500 rounded-2xl hover:bg-neutral-200 duration-100 cursor-pointer"
                >
                    <Plus size={16} />
                    <span>Add Part</span>
                </button>
            </div>

            {question.parts.length === 0 ? (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500">No parts added yet. Click &quot;Add Part&quot; to create a long-answer question part.</p>
                </div>
            ) : (
                <div className="space-y-4 mt-3 mb-1.5">
                    {question.parts.map((part) => (
                        <LongAnswerPart
                            key={part.id}
                            removePart={removePart}
                            updatePart={updatePart}
                            part={part}
                            handleDragStart={handleDragStart} 
                            handleDragOver={handleDragOver} 
                            handleDragEnd={handleDragEnd}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LongAnswer