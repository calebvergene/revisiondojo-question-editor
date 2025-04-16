import React from 'react'
import { Part } from '@/types'
import { Trash2, ChevronsUpDown, GripVertical } from 'lucide-react'
import { Label } from '../ui/label'
import { Textarea } from '../Textarea/textarea'

interface Props {
    removePart: (id: number) => void
    // eslint-disable-next-line
    updatePart: (id: number, field: keyof Part, value: any) => void
    part: Part
    handleDragStart: (type: 'option' | 'part', id: number) => void
    handleDragOver: (e: React.DragEvent, type: 'option' | 'part', id: number) => void
    handleDragEnd: () => void
};


const PartSelection = ({ removePart, updatePart, part, handleDragStart, handleDragOver, handleDragEnd }: Props) => {

    // so that the drag image of the whole component shows
    const partRef = React.useRef<HTMLDivElement>(null);
    const onDragStart = (e: React.DragEvent) => {
        if (partRef.current) {
            partRef.current.classList.add('dragging');
            e.dataTransfer.setDragImage(partRef.current, 0, 0);
            setTimeout(() => {
                partRef.current?.classList.remove('dragging');
            }, 0);
        }
        handleDragStart('part', part.id);
    };

    return (
        <div 
            ref={partRef}
            className="px-3 py-3 rounded-2xl border border-dashed bg-neutral-50"
            onDragOver={(e) => handleDragOver(e, 'part', part.id)}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        draggable
                        onDragStart={onDragStart}
                        onDragEnd={handleDragEnd}
                        className='cursor-move'
                    >
                        <GripVertical size={16} />
                    </button>
                    <span className="font-semibold text-neutral-800">Part {part.order + 1}</span>
                    <div className="flex items-center space-x-1">
                        <Label className="text-sm mr-2 ml-3 font-medium leading-none text-neutral-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Marks
                        </Label>
                        <div>
                            6
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => removePart(part.id)}
                        className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl duration-200 cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            <div className="grid w-full gap-1.5 my-1.5 mb-0.5">
                <Textarea className='!font-sans !bg-white' placeholder="Type your long answer content." value={part.content} onChange={(e) => updatePart(part.id, 'content', e.target.value)} id="content" />
            </div>
            <div className="grid w-full gap-y-1.5 my-1.5 mb-0.5">
                <Label htmlFor="content" className="text-xs font-medium text-neutral-700 mt-2">
                    Markscheme <span className='text-neutral-500 ml-1'>(optional)</span>
                </Label>
                <Textarea className='!font-sans !bg-white' placeholder="Type your grading criteria." value={part.markscheme} onChange={(e) => updatePart(part.id, 'markscheme', e.target.value)} id="markscheme" />
            </div>
        </div>
    )
}

export default PartSelection