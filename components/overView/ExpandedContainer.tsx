import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {root} from '../../css';
import {getServicesHeadings} from '../../STORE/selectors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {firebaseTime} from '../../utils/firebaseTime';

interface schema {
  fromDate: {
    seconds: number;
    nanoseconds: number;
  };
  toDate: {
    seconds: number;
    nanoseconds: number;
  };
  setShowSnackBarTrue: () => void,
}

export default function ExpandedContainer({
  fromDate,
  toDate,
  setShowSnackBarTrue
}: schema): JSX.Element {
  const {
    document: {
      calendarHeadingOne,
      calendarHeadingTwo,
      // locationHeadingOne,
      // locationHeading2,
    } = {},
  } = useSelector(getServicesHeadings).headings;

  return (
    <View style={styles.expanded}>
      <TouchableOpacity
        style={styles.flexBox}
        activeOpacity={root.activeOpacity}
        onPress={() => setShowSnackBarTrue()}
      >
        <>
          <LinearGradient
            colors={root.primaryThemeColorDarkGradient}
            style={styles.expandedButton}>
            <Text style={styles.addButtonText}>{calendarHeadingOne}</Text>
            <Text style={styles.text}>{firebaseTime(fromDate).date}</Text>
          </LinearGradient>
          <View style={styles.seperator} />
          <LinearGradient
            colors={root.primaryThemeColorDarkGradient}
            style={styles.expandedButton}>
            <Text style={styles.addButtonText}>{calendarHeadingTwo}</Text>
            <Text style={styles.text}>{firebaseTime(toDate).date}</Text>
          </LinearGradient>
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  expanded: {
    height: root.expandedHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: root.defaultSpace,
    backgroundColor: root.bgColor1,
    // paddingVertical: 10,
  },
  flexBox: {
    width: root.width - root.defaultSpace * 2,
    height: root.expandedHeight - root.defaultSpace * 2,

    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    elevation: 1,
    // height: 30,
    borderRadius: 100,
    overflow: 'hidden',
  },
  expandedButton: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seperator: {
    width: 1,
    backgroundColor: root.primaryThemeColorLite,
  },
  text: {
    marginTop: 5,
    color: root.textColor1,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  addButtonText: {
    color: root.textColor1,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightBold as any,
  },
});
