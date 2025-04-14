"use client"

import { cn } from "@/lib/utils"
import TextAreaToolbar from "./Toolbar"
import { useEffect } from "react"
import React from "react"
import ImageRender from "./ImageRender"
import { Image } from "@/types"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  setImages?: React.Dispatch<React.SetStateAction<Image[]>>
  images?: Image[]
}

function Textarea({ className, setImages, images, ...props }: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // this automatically adjusts height of the text box when it overflows
  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }
    adjustHeight()
    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('input', adjustHeight)
      return () => {
        textarea.removeEventListener('input', adjustHeight)
      }
    }
  }, [])

  // function to update image markdown (when the user resizes)
  const updateImage = (updatedImage: Image) => {
    if (setImages) {
      setImages(prevImages =>
        prevImages.map(image =>
          image.id === updatedImage.id ? updatedImage : image
        )
      );
    }
  };


  return (
    <div>
      <textarea
        data-slot="textarea"
        ref={textareaRef}
        className={cn(
          "border-input placeholder:text-muted-foreground aria-invalid:border-destructive dark:bg-input/30 flex min-h-10 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden resize-none",
          className
        )}
        {...props}
      />
      {setImages && images && (
        <div>
          <TextAreaToolbar setImages={setImages} />
          {images.length > 0 && (
            <div>
              {images.map((image, index) => (
                <ImageRender
                  key={index}
                  image={image}
                  updateImage={updateImage}
                />
              ))}
            </div>
          )}
        </div>)}
    </div>
  )
}

export { Textarea }