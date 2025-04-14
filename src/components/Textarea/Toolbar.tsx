"use client"
import { Bold, ImagePlus, Italic, Underline } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react'

interface Props {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setImagePreviewUrl: React.Dispatch<React.SetStateAction<string>>;
}

const TextAreaToolbar = ({ setImages, setImagePreviewUrl }: Props) => {

  // handles image uploading
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreviewUrl(result);
        setImages(prev => [...prev, result as string]);
        console.log(result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='mt-0.5'>
      <label htmlFor="image-upload" className="inline-block">
        <ImagePlus className="size-7 stroke-2.5 p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        <input 
          id="image-upload"
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="hidden"
        />
      </label>
      <button>
        <Bold className="size-7 stroke-3 p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
      </button>
      <button>
        <Italic className="size-7 stroke-3 p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
      </button>
      <button>
        <Underline className="size-6.5 mb-[0.5px] stroke-3 p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
      </button>
    </div>
  )
}

export default TextAreaToolbar