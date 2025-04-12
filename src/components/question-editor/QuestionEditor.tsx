import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const QuestionEditor = () => {

    const [question, setQuestion] = useState({
        id: crypto.randomUUID(),
        specification: '',
        options: [],
        parts: []
    });

    const generateId = () => Math.floor(Math.random() * 100000);


    return (
       <div></div>
    )
}

export default QuestionEditor