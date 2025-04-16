import React from 'react'
import { Option } from '@/types'
import { Trash2, GripVertical } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '../ui/label'
import { Textarea } from '../Textarea/textarea'

interface Props {
  removeOption: (id: number) => void
  // eslint-disable-next-line
  updateOption: (id: number, field: keyof Option, value: any) => void
  option: Option
  handleDragStart: (type: 'option' | 'part', id: number) => void
  handleDragOver: (e: React.DragEvent, type: 'option' | 'part', id: number) => void
  handleDragEnd: () => void
};


const OptionSelection = ({ removeOption, updateOption, option, handleDragStart, handleDragOver, handleDragEnd }: Props) => {

  // so that the drag image of the whole component shows
  const optionRef = React.useRef<HTMLDivElement>(null);
  const onDragStart = (e: React.DragEvent) => {
    if (optionRef.current) {
      e.dataTransfer.setDragImage(optionRef.current, 0, 0);
    }
    handleDragStart('option', option.id);
  };

  return (
    <div
      ref={optionRef}
      className="px-3 py-3 rounded-2xl border border-dashed bg-neutral-50"
      onDragOver={(e) => handleDragOver(e, 'option', option.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <button 
            draggable
            onDragStart={onDragStart}
            onDragEnd={handleDragEnd}
            className='cursor-move'
          >
            <GripVertical size={16} />
          </button>
          <span className="font-semibold text-neutral-800">Option {option.order + 1}</span>
          <div className="flex items-center space-x-1 ml-1">
            <Checkbox id="Correct" checked={option.correct} onCheckedChange={() => updateOption(option.id, 'correct', Boolean(!option.correct))}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="Correct"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correct
              </label>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => removeOption(option.id)}
            className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl duration-200 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="grid w-full gap-1.5 my-1.5 mb-0.5">
        <Textarea className='!font-sans !bg-white' placeholder="Type your option content." value={option.content} onChange={(e) => updateOption(option.id, 'content', e.target.value)} id="content" />
      </div>
      <div className="grid w-full gap-y-1.5 my-1.5 mb-0.5">
        <Label htmlFor="content" className="text-xs font-medium text-neutral-700 mt-2">
          Markscheme <span className='text-neutral-500 ml-1'>(optional)</span>
        </Label>
        <Textarea className='!font-sans !bg-white' placeholder="Type your grading criteria." value={option.markscheme} onChange={(e) => updateOption(option.id, 'markscheme', e.target.value)} id="markscheme" />
      </div>
    </div>
  )
}

export default OptionSelection