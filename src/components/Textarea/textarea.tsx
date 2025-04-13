import * as React from "react"
import { cn } from "@/lib/utils"
import TextAreaToolbar from "./Toolbar"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  images: string[]
}

function Textarea({ className, setImages, images, ...props }: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
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
      <TextAreaToolbar setImages={setImages}/>
    </div>
  )
}

export { Textarea }