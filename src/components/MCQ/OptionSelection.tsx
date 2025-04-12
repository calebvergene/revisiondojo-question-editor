import React from 'react'
import { Option } from '@/types'
import { Trash2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface Props {
  removeOption: (id: number) => void
  updateOption: (id: number, field: keyof Option, value: any) => void
  option: Option
}

const OptionSelection = ({ removeOption, updateOption, option }: Props) => {
  return (
    <div className="px-3 py-3 rounded-2xl border border-dashed bg-neutral-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-neutral-700">Option {option.order + 1}</span>
          <div className="flex items-center space-x-1">
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
            className="p-1 text-neutral-500 hover:text-neutral-700 cursor-pointer"
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