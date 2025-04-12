export type Question = {
    id: string;
    specification: string; // question text that doesn't directly correlate to a response field, e.g. background info
    options: {
      id: number;
      content: string;
      correct: boolean;
      order: number;
      markscheme: string;
    }[]; // for MCQs
    parts: {
      id: number;
      content: string;
      markscheme: string;
      marks: number;
      order: number;
      rubricId?: string | null;
    }[]; // for written responses
  };