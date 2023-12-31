import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

const CounterInput = ({label, value, onIncrement, onDecrement}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        width: '45%',
        height: 200,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
        {label}
      </Text>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black'}}>
          {value}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={onDecrement}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              marginRight: 5,
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onIncrement}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              marginLeft: 5,
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CounterInput;
