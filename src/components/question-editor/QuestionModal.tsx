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
import { Textarea } from "@/components/Textarea/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Option, Part } from "@/types/index";
import MCQ from "../MCQ/MCQ";
import LongAnswer from "../long-answer/LongAnswer";

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
    // will be a list of images in markdown
    const [specificationText, setSpecificationText] = useState<string>('');
    const [images, setImages] = useState<Image[]>([]);

    // generates IDs for options and parts
    const generateId = (): number => Math.floor(Math.random() * 100000);


    // For specification
    const handleMessageChange = ({ target: { value } }: { target: { value: string } }) => {
        setSpecificationText(value);
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
    // eslint-disable-next-line
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


    // For long answer
    const addPart = (): void => {
        const newPart: Part = {
            id: generateId(),
            content: '',
            markscheme: '',
            marks: 1,
            order: question.parts.length,
            rubricId: null
        };
        setQuestion({
            ...question,
            parts: [...question.parts, newPart]
        });
    };

    // eslint-disable-next-line
    const updatePart = (id: number, field: keyof Part, value: any): void => {
        setQuestion({
            ...question,
            parts: question.parts.map(part =>
                part.id === id ? { ...part, [field]: value } : part
            )
        });
    };

    const removePart = (id: number) => {
        setQuestion({
            ...question,
            parts: question.parts.filter(part => part.id !== id).map((part, idx) => ({
                ...part,
                order: idx
            }))
        });
    };


    // save question
    const saveQuestion = () => {

        images.forEach((image) => {
            image.markdown = `<img src="${image.url}" alt="Visual reference for the question" width="${image.width}" height="${image.height}">`;
        })

        const newQuestion = {
            ...question,
            specification: `${specificationText}\n\n${images.map((image) => image.markdown).join('\n\n')}`,
            options: question.options.map((option) => ({
                ...option,
                order: question.options.indexOf(option)
            })),
            parts: question.parts.map((part) => ({
                ...part,
                order: question.parts.indexOf(part)
            }))
        };

        // this is just for testing purposes, i should do something now with this question. this is just to see the finished question
        setQuestion(newQuestion);

        // would refresh question editor and then save the finished question.
        //setSpecificationText('');
        //setImages([]);
        console.log(newQuestion);
    }


    return (
        <Dialog>
            <DialogTrigger className="flex items-center space-x-1 px-3 py-1.5 font-bold bg-[#0084c7] text-white rounded-2xl hover:bg-[#0084c7]/90 duration-100 cursor-pointer">
                <Plus size={16} />
                <span>Create Question</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex justify-between">
                        <DialogTitle className="!text-2xl !font-extrabold">Create a Question</DialogTitle>
                    </div>
                    <div>
                        <div className="grid w-full gap-1.5 mt-3">
                            <Textarea
                                placeholder="Type your question here."
                                id="message"
                                value={specificationText}
                                onChange={handleMessageChange}
                                setImages={setImages}
                                images={images}
                                className="!font-sans !min-h-20"
                            />
                        </div>
                        <Tabs defaultValue="mcq" className="mt-6">
                            <TabsList>
                                <TabsTrigger value="mcq" className="!font-bold"><CheckSquare /> MCQ</TabsTrigger>
                                <TabsTrigger value="long answer" className="!font-bold"><AlignLeft /> Long Answer</TabsTrigger>
                            </TabsList>
                            <TabsContent value="mcq" ><MCQ addOption={addOption} updateOption={updateOption} removeOption={removeOption} question={question} /></TabsContent>
                            <TabsContent value="long answer"><LongAnswer addPart={addPart} updatePart={updatePart} removePart={removePart} question={question} /></TabsContent>
                        </Tabs>
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={saveQuestion} className=" mt-2 items-center space-x-1 px-3 py-1.5 font-bold bg-[#0084c7] text-white rounded-2xl hover:bg-[#0084c7]/90 duration-100 cursor-pointer">
                            <span>Save Question</span>
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default QuestionModal