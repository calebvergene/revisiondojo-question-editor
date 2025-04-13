import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline } from 'lucide-react';
import { cn } from "@/lib/utils";

const MarkdownEditor: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Function to handle text updates and resize textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  // Function to capture text selection
  const handleSelect = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd
      });
    }
  };
  
  // Format functions
  const applyBold = () => {
    if (selection.start === selection.end) return;
    
    const selectedText = text.substring(selection.start, selection.end);
    const newText = 
      text.substring(0, selection.start) + 
      `**${selectedText}**` + 
      text.substring(selection.end);
    
    setText(newText);
    
    // Set focus back to textarea with adjusted selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          selection.start + 2,
          selection.end + 2
        );
      }
    }, 0);
  };
  
  const applyItalic = () => {
    if (selection.start === selection.end) return;
    
    const selectedText = text.substring(selection.start, selection.end);
    const newText = 
      text.substring(0, selection.start) + 
      `_${selectedText}_` + 
      text.substring(selection.end);
    
    setText(newText);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          selection.start + 1,
          selection.end + 1
        );
      }
    }, 0);
  };
  
  const applyUnderline = () => {
    if (selection.start === selection.end) return;
    
    const selectedText = text.substring(selection.start, selection.end);
    const newText = 
      text.substring(0, selection.start) + 
      `<u>${selectedText}</u>` + 
      text.substring(selection.end);
    
    setText(newText);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          selection.start + 3,
          selection.end + 3
        );
      }
    }, 0);
  };
  
  // Format markdown for display
  const formatMarkdown = (text: string): string => {
    // Replace bold markdown with styled span
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
    
    // Replace italic markdown with styled span
    formatted = formatted.replace(/_(.*?)_/g, '<span class="italic">$1</span>');
    
    // Underline is already HTML
    return formatted;
  };

  // Auto-resize effect
  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
    
    adjustHeight();
    
    // Sync preview scroll with textarea
    if (textareaRef.current && previewRef.current) {
      previewRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, [text]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-2 bg-white border border-neutral-200 rounded-md p-1">
        <button 
          onClick={applyBold}
          disabled={selection.start === selection.end}
          className={cn("mr-1", selection.start !== selection.end ? "opacity-100" : "opacity-50")}
          type="button"
        >
          <Bold className="size-8 stroke-3 p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
        <button 
          onClick={applyItalic}
          disabled={selection.start === selection.end}
          className={cn("mr-1", selection.start !== selection.end ? "opacity-100" : "opacity-50")}
          type="button"
        >
          <Italic className="size-8 stroke-3 p-2 mb-[1px] text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
        <button 
          onClick={applyUnderline}
          disabled={selection.start === selection.end}
          className={cn(selection.start !== selection.end ? "opacity-100" : "opacity-50")}
          type="button"
        >
          <Underline className="size-8.5 stroke-[3px] p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md duration-200 cursor-pointer" />
        </button>
      </div>
      
      <div className="relative">
        {/* Hidden textarea for editing */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          onClick={handleSelect}
          onKeyUp={handleSelect}
          className="border-input placeholder:text-muted-foreground aria-invalid:border-destructive dark:bg-input/30 flex min-h-32 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden resize-none absolute inset-0 opacity-0"
          style={{ caretColor: 'black' }}
        />
        
        {/* Preview div that shows formatted text */}
        <div 
          ref={previewRef}
          className="border-input placeholder:text-muted-foreground aria-invalid:border-destructive dark:bg-input/30 flex min-h-32 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(text) || '<br>' }}
        ></div>
      </div>
    </div>
  );
};

export default MarkdownEditor;