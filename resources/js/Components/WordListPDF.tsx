import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Word, WordList } from '@/types';

// Create styles
let styles = StyleSheet.create({
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
  word: {

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
  wordList: WordList;
  fontSize: string;
}

const WordListPDF = ({ wordList, fontSize }: Props) => {
  // State to store the dynamic styles
  const [dynamicStyles, setDynamicStyles] = useState({});

  // useEffect to update styles when fontSize prop changes
  useEffect(() => {
    setDynamicStyles({
      paddingTop: "60px",
      paddingBottom: "60px",
      margin: "10px",
      width: "100%",
      borderWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      textAlign: 'center',
      flexWrap: 'wrap',
      fontSize: fontSize, // Set the font size dynamically
    });
  }, [fontSize]);

  const row = (words: Word[], numPerRow: number) => {
    const wordQueue = [...words];
    const rows = [];

    while (wordQueue.length) {
      const wordComponents = [];

      for (let i = 0; i < numPerRow; i++) {
        const word = wordQueue.pop();
        if (word) {
          wordComponents.push(
            <Text wrap={false} key={word.word} style={dynamicStyles}>
              {word.word}
            </Text>
          );
        } else {
          // If there are no more words, add an empty placeholder
          wordComponents.push(
            <Text key={'placeholder-' + i} style={dynamicStyles}></Text>
          );
        }
      }
      const row = <View key={'row-' + rows.length} style={styles.heading}>{wordComponents}</View>;
      rows.push(row);
    }

    return rows;
  };

  if (!wordList) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {row(wordList.words, 3)}
        </View>
      </Page>
    </Document>
  );
};

export default WordListPDF;