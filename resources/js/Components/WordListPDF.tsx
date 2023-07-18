import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Word, WordLIst, WordPattern } from '@/types';

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
    wordList: WordLIst;
}
const row = (words: Word[], numPerRow: number) => {
  const wordQueue = [...words];
  const rows = [];

  while (wordQueue.length) {
    const wordComponents = [];

    for (let i = 0; i < numPerRow && wordQueue.length > 0; i++) {
      const word = wordQueue.pop();
      wordComponents.push(
        <Text wrap={false} key={word?.word} style={styles.word}>
          {word?.word}
        </Text>
      );
    }

    const row = <View style={styles.heading}>{wordComponents}</View>;
    rows.push(row);
  }

  return rows;
};
// Create Document Component
const WordListPDF = ({wordList} : Props) => (
  <Document>
      <Page  size="A4" style={styles.page}>
          <View style={styles.section}>               
                  {row(wordList.words, 3)}
          </View>
      </Page>      
  </Document>
);
export default WordListPDF;