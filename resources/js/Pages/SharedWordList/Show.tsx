import WordListPDF from "@/Components/WordListPDF";
import AppLayout from "@/Layouts/AppLayout";
import { WordList } from "@/types";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";

interface Props {
    wordList: WordList
}
export default function Show({wordList} : Props){
    return(
        <AppLayout title="Shared">
            <PDFViewer height={"1400"} width={"100%"}>
            <WordListPDF wordList={wordList} fontSize="24px"/>
        </PDFViewer>
        </AppLayout>
        
    )
    
}