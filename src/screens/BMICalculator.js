import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import GenderSelect from '../components/GenderSelect';
import SliderInput from '../components/SliderInput';
import CounterInput from '../components/CounterInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import useFetchCurrentBmiData from '../CurrentBmiResult';
import LinearGradient from 'react-native-linear-gradient';

const BMICalculator = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(25);
  const [bmiResultState, setBmiResultState] = useState(0);

  const navigate = useNavigation();

  const {bmiResultData} = useFetchCurrentBmiData();

  useEffect(() => {
    setGender(bmiResultData?.gender || '');
    setHeight(bmiResultData?.height || 160);
    setWeight(bmiResultData?.weight || 160);
    setAge(bmiResultData?.age || 25);
    setBmiResultState(bmiResultData?.bmiResult || 0);

    console.log('sample');
  }, [bmiResultData]);

  console.log(bmiResultData);

  useEffect(() => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const finalBmi = Math.round(bmi * 1e2) / 1e2;
    setBmiResultState(finalBmi);
  });

  const handleSubmitBmiResult = () => {
    let bmiCategory = '';
    if (bmiResultState < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiResultState >= 18.5 && bmiResultState < 24.9) {
      bmiCategory = 'Normal';
    } else if (bmiResultState >= 25 && bmiResultState < 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }

    navigate.navigate('BMIResult', {
      gender: gender,
      height: height,
      weight: weight,
      age: age,
      bmiResult: bmiResultState,
      bmiCategory: bmiCategory,
    });
  };

  const disabled = gender === '';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <GenderSelect
        onSelectGender={selectedGender => setGender(selectedGender)}
        gender={gender}
      />
      <SliderInput
        label="Height (cm)"
        value={height}
        min={100}
        max={250}
        step={1}
        onValueChange={value => setHeight(value)}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <CounterInput
          label="Weight (kg)"
          value={weight}
          onIncrement={() => setWeight(prevWeight => prevWeight + 1)}
          onDecrement={() => setWeight(prevWeight => prevWeight - 1)}
        />
        <CounterInput
          label="Age"
          value={age}
          onIncrement={() => setAge(prevAge => prevAge + 1)}
          onDecrement={() => setAge(prevAge => prevAge - 1)}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmitBmiResult}
        style={styles.button}
        disabled={disabled}>
        <LinearGradient
          colors={disabled ? ['#d3d3d3', '#d3d3d3'] : ['#FFAA21', '#FFC42C']}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.buttonText}>
            {bmiResultData ? 'Re-calculate BMI' : 'Calculate BMI'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BMICalculator;
