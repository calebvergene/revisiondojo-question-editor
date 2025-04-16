"use client"
import { Image } from '@/types';
import { Bold, ImagePlus, Italic, Underline } from 'lucide-react';
import React, { ChangeEvent } from 'react' 
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface Props {
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const TextAreaToolbar = ({ setImages }: Props) => {

  // handles image uploading
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.onloadend = () => {
        const result = reader.result as string;
        setImages(prev => [...prev, {
          id: Math.floor(Math.random() * 100000).toString(),
          url: result,
          markdown: '',
          width: 300,
          height: 300,
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='my-1 flex row gap-x-0.5'>
      <ToggleGroup type="single" size="sm" className='gap-x-0.5'>
      <ToggleGroupItem value="bold" aria-label="Toggle bold" className='!rounded-sm'>
        <Bold className="h-3 w-3" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" className='!rounded-sm'>
        <Italic className="h-3 w-3" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" className='!rounded-sm'>
        <Underline className="h-3 w-3" />
      </ToggleGroupItem>
    </ToggleGroup>
      <label htmlFor="image-upload" className="inline-block">
        <ImagePlus className="size-8 stroke-2.5 p-2 text-neutral-800 hover:text-neutral-500 hover:bg-neutral-100 rounded-sm duration-100 cursor-pointer" />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default TextAreaToolbar