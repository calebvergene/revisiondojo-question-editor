// mcqs
export type Option = {
    id: number;
    content: string;
    correct: boolean;
    order: number;
    markscheme: string;
  };
 
// long answer
export type Part = {
    id: number;
    content: string;
    markscheme: string;
    marks: number;
    order: number;
    rubricId?: string | null;
  };
  
// question object
export type Question = {
    id: string;
    specification: string;
    options: Option[];
    parts: Part[];
  };

// image object
export type Image = {
    id: string;
    url: string;
    markdown: string;
    width: number;
    height: number;
  };