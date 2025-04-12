"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



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
                        <Tabs defaultValue="account" className="mt-6">
                            <TabsList>
                                <TabsTrigger value="account">MCQ</TabsTrigger>
                                <TabsTrigger value="password">Long Answer</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">Make changes to your account here.</TabsContent>
                            <TabsContent value="password">Change your password here.</TabsContent>
                        </Tabs>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default QuestionModal