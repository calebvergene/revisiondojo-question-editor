"use client"
import { Bold, Italic, Underline } from 'lucide-react';
import React from 'react'

const SpecificationToolbar = () => {
  return (
    <div>
        <button>
            <Bold className="size-8 stroke-3 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
        <button>
            <Italic className="size-8 stroke-3 p-2 mb-[1px] text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
        <button>
            <Underline className="size-8.5 stroke-[3px] p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
    </div>
  )
}

export default SpecificationToolbar