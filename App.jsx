import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
// data import
import {choices} from './src/data/mockData';
// utils import
import {COLORS} from './src/utils/constants';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
  };
  const determineWinner = (user, computer) => {
    if (user?.name === computer?.name) {
      setResult('TIE!');
    } else if (
      (user?.name === 'Rock' && computer?.name === 'Scissors') ||
      (user?.name === 'Scissors' && computer?.name === 'Paper') ||
      (user?.name === 'Paper' && computer?.name === 'Rock')
    ) {
      setResult('YOU WIN!');
    } else {
      setResult('YOU LOSE!');
    }
  };

  // console.log(Math.floor(Math.random() * choices.length));
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>ROCK-PAPER-SCISSORS</Text>
        <Text style={styles.choiceText}>Make Your Choice</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={`${choice.id}-choice`}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>
        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Phone`s Choice</Text>
            <View style={styles.button}>
              <Image source={computerChoice.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  choiceText: {
    marginVertical: 10,
    fontSize: 25,
    color: COLORS.white,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  image: {
    width: 90,
    height: 90,
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'purple',
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
});
