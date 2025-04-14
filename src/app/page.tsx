"use client"

import QuestionModal from '@/components/question-editor/QuestionModal';
import { Part, Option } from '@/types';
import React, { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState({
    id: "test", //crypto.randomUUID(),
    specification: '',
    options: [] as Option[],
    parts: [] as Part[]
  });

  // lags from specification because image url too long. this shortens the specification
  const jsonReplacer = (key: string, value:string ) => {
    if (key === 'specification' && typeof value === 'string' && value.length > 20) {
      return value.substring(0, 20) + '...';
    }
    return value;
  };

  return (
    <div className="flex justify-center mt-10 min-h-screen">
      <div className="w-full max-w-2xl px-4">
        <QuestionModal question={question} setQuestion={setQuestion}/>
        <div className="p-4 rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-2">Question JSON</h2>
          <pre className="bg-neutral-800 text-neutral-200 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
            {JSON.stringify(question, jsonReplacer, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}