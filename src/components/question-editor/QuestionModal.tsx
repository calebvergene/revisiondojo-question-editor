"use client"
import { useState } from "react";
import { CheckSquare, AlignLeft, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Option, Part } from "@/types/index";
import MCQ from "../MCQ/MCQ";

interface Props {
    question: {
        id: string;
        specification: string;
        options: Option[];
        parts: Part[];
    };
    setQuestion: React.Dispatch<React.SetStateAction<{
        id: string;
        specification: string;
        options: Option[];
        parts: Part[];
    }>>;
}

const QuestionModal = ({ question, setQuestion }: Props) => {

    // generates IDs for options and parts
    const generateId = (): number => Math.floor(Math.random() * 100000);


    // For specification (temporary, need a save question button at the end)
    const [specification, setSpecification] = useState("");
    const handleMessageChange = (e: { target: { value: string; }; }) => {
        setSpecification(e.target.value);
        setQuestion({
            ...question,
            specification: specification
        })
    };


    // For MCQs
    const addOption = (): void => {
        const newOption: Option = {
            id: generateId(),
            content: '',
            correct: false,
            order: question.options.length,
            markscheme: ''
        };
        setQuestion({
            ...question,
            options: [...question.options, newOption]
        });
    };

    // flexible function to update option
    const updateOption = (id: number, field: keyof Option, value: any): void => {
        setQuestion({
            ...question,
            options: question.options.map(option =>
                option.id === id ? { ...option, [field]: value } : option
            )
        });
    };

    const removeOption = (id: number): void => {
        setQuestion({
            ...question,
            options: question.options.filter(option => option.id !== id).map((option, idx) => ({
                ...option,
                order: idx
            }))
        });
    };
    // !need to make function to drag options to change order

    return (
        <Dialog>
            <DialogTrigger className="flex items-center space-x-1 px-3 py-1.5 font-bold bg-[#0084c7] text-white rounded-2xl hover:bg-[#0084c7]/90 duration-100 cursor-pointer">
                <Plus size={16} />
                <span>Create Question</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="!text-2xl !font-extrabold">Create a Question</DialogTitle>
                    <form onSubmit={() => console.log('eventually...')}>
                        <div className="grid w-full gap-1.5 mt-3">
                            <Textarea
                                placeholder="Type your question here."
                                id="message"
                                value={specification}
                                onChange={handleMessageChange}
                                className="!font-sans !min-h-20"
                            />
                        </div>
                        <Tabs defaultValue="mcq" className="mt-6">
                            <TabsList>
                                <TabsTrigger value="mcq" className="!font-bold"><CheckSquare /> MCQ</TabsTrigger>
                                <TabsTrigger value="long answer" className="!font-bold"><AlignLeft /> Long Answer</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mcq" ><MCQ addOption={addOption} updateOption={updateOption} removeOption={removeOption} question={question} /></TabsContent>
                            <TabsContent value="long answer">long answer</TabsContent>
                        </Tabs>
                    </form>
                    <div className="w-full flex justify-end">
                        <button className=" mt-1 items-center space-x-1 px-3 py-1.5 font-bold bg-[#0084c7] text-white rounded-2xl hover:bg-[#0084c7]/90 duration-100 cursor-pointer">
                            <span>Save Question</span>
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default QuestionModal