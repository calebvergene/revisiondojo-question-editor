"use client"
import { useState } from "react";
import { CheckSquare, AlignLeft } from 'lucide-react';
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



const QuestionModal = () => {
    const [question, setQuestion] = useState({
        id: crypto.randomUUID(),
        specification: '',
        options: [] as Option[],
        parts: [] as Part[]
    });

    // generates IDs for options and parts
    const generateId = (): number => Math.floor(Math.random() * 100000);


    // For specification
    const [specification, setSpecification] = useState("");
    const handleMessageChange = (e: { target: { value: string; }; }) => {
        setSpecification(e.target.value);
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
            <DialogTrigger>Open</DialogTrigger>
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
                                className="!font-sans"
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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default QuestionModal