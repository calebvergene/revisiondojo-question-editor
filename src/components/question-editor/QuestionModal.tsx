"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"



const QuestionModal = () => {
    const [question, setQuestion] = useState({
        id: crypto.randomUUID(),
        specification: '',
        options: [],
        parts: []
    });


    // For specification
    const [specification, setSpecification] = useState("");
    const handleMessageChange = (e: { target: { value: string; }; }) => {
        setSpecification(e.target.value);
    };


    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Question</DialogTitle>
                    <form onSubmit={() => console.log('eventually...')}>
                        <div className="grid w-full gap-1.5 mt-4">
                            <Label htmlFor="message">Question</Label>
                            <Textarea
                                placeholder="Type your question here."
                                id="message"
                                value={specification}
                                onChange={handleMessageChange}
                            />
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default QuestionModal