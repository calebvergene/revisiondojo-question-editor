"use client"

import QuestionModal from '@/components/question-editor/QuestionModal';
import { Part, Option } from '@/types';
import React, { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState({
    id: crypto.randomUUID(),
    specification: '',
    options: [] as Option[],
    parts: [] as Part[]
  });

  return (
    <div className="flex justify-center mt-10 min-h-screen">
      <div className="w-full max-w-2xl px-4">
        <QuestionModal question={question} setQuestion={setQuestion}/>
        <div className="p-4 rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-2">Question JSON</h2>
          <pre className="bg-neutral-800 text-neutral-200 p-4 rounded-lg overflow-auto">
            {JSON.stringify(question, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}