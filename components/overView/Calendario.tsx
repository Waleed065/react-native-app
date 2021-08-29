import React from "react";
// import { StyleSheet, } from "react-native";
import { Calendar } from "react-native-calendars";
import { root } from "../../css";
import { calendarDate, defaultCalendarDate } from "../../types";



interface schema {
  startDate: calendarDate;
  endDate: calendarDate;
  setStartDate: (arg: calendarDate) => void;
  setEndDate: (arg: calendarDate) => void;
}

export default function Calendario({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: schema): JSX.Element {
  const onDayPress = (day: any) => {
    if (!startDate.timestamp && !endDate.timestamp) {
      setStartDate(day);
    } else if (startDate.timestamp && !endDate.timestamp) {
      if (day.timestamp > startDate.timestamp) {
        setEndDate(day);
      } else {
        setStartDate(day);
      }
    } else if (startDate.timestamp && endDate.timestamp) {
      setStartDate(day);
      setEndDate(defaultCalendarDate);
    }
  };

  return (
    <Calendar
      // minDate={startDate.dateString}
      onDayPress={onDayPress}
      markingType={"period"}
      markedDates={{
        [startDate.dateString]: {
          selected: true,
          startingDay: true,
          color: root.primaryThemeColor,
          textColor: root.textColor1,
        },
        [endDate.dateString]: {
          selected: true,
          endingDay: true,
          color: root.primaryThemeColor,
          textColor: root.textColor1,
        },
      }}
      theme={{
        arrowColor: root.primaryThemeColor,
      }}
      enableSwipeMonths={true}
    />
  );
}

// const styles = StyleSheet.create({});
