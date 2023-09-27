import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameDay,
} from 'date-fns';
import PagerView from 'react-native-pager-view';

const DateSlider = ({selectedDay, onDayPress}) => {
  const currentDate = new Date();
  const oneWeekFromCurrentDate = addDays(currentDate, 6); // One week from the current date

  const dates = eachWeekOfInterval(
    {
      start: currentDate,
      end: oneWeekFromCurrentDate,
    },
    {
      weekStartsOn: 1,
    },
  ).reduce((acc, cur) => {
    const allDays = eachDayOfInterval({
      start: cur,
      end: addDays(cur, 6),
    });

    acc.push(allDays);
    return acc;
  }, []);

  return (
    <PagerView style={styles.container}>
      {dates.map((week, i) => {
        return (
          <View key={i}>
            <Text style={styles.month}>{format(week[0], 'MMMM')}</Text>
            <View style={styles.row}>
              {week.map(day => {
                const text = format(day, 'EEEEE');
                const isDateSelected = isSameDay(selectedDay, day);
                return (
                  <View
                    style={[
                      styles.day,
                      isDateSelected && {backgroundColor: 'green'},
                    ]}
                    key={day.toString()}
                    onTouchEnd={() => onDayPress(day)}>
                    <Text style={isDateSelected && {color: 'white'}}>
                      {day.getDate()}
                    </Text>
                    <Text style={isDateSelected && {color: 'white'}}>
                      {text}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '95%',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  day: {
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'gray',
  },
  month: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default DateSlider;
