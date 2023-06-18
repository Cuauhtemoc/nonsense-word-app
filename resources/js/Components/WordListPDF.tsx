import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { WordPattern } from '@/types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    
  },
  section: {
    width: '100%',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12
    
  
  },
  heading: {

    display: 'flex',
    flexDirection: 'row',
    
  },
  word : {

    paddingTop: "60px",
    paddingBottom: "60px",
    margin: "10px",
    width: "100%",
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
    
  }
});
interface Props {
    wordPatterns: WordPattern[];
}
const row = (wordList : WordPattern, numPerRow : number ) => {
    let queue = [...wordList.words];
    let res = [];
    while(queue.length){
        let count = 0;
        let words = [];
        while(count < numPerRow){
            let word = queue.pop();
            words.push(<Text wrap={false} key={word?.word} style={styles.word} >{word?.word}</Text>)
            count++;

        }
        let row = <View key={wordList.pattern_name} style={styles.heading}>{words}</View>
        res.push(row);
    }
        
    return res;
}
// Create Document Component
const WordListPDF = ({wordPatterns} : Props) => (
  <Document>
    {wordPatterns.map(wordList => 
        <Page key={wordList.pattern_name} size="A4" style={styles.page}>
            <View style={styles.section}>               
                    {row(wordList, 3)}
            </View>
        </Page>    
    )}
  
  </Document>
);
export default WordListPDF;