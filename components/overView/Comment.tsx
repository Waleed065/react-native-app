import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {commentsItemType, stateTypes} from '../../types';
import Ratings from '../Ratings';
import moment from 'moment';
import {root} from '../../css';
import {abbreviateNumber} from '../../utils';

declare const alert: any;

interface schema {
  review: commentsItemType;
}
export default function Comment({review}: schema): JSX.Element {
  const isLoggedIn = useSelector((state: stateTypes) => state.isLoggedIn);
  const [liked, setLiked] = useState<boolean | null>(null);

  const {
    dated: {seconds = 0, nanoseconds = 0},
    avatar,
    upVotes,
    downVotes,
    name,
    rated,
    comment,
  } = review;

  const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
  // const date = fireBaseTime.toDateString();
  // const atTime = fireBaseTime.toLocaleTimeString();

  const renderOnLikePress = () => {
    if (isLoggedIn) {
      if (liked === true) {
        setLiked(null);
      } else {
        setLiked(true);
      }
    } else {
      alert('You must be logged in to cast a like!');
    }
  };

  const renderOnDisLikePress = () => {
    if (isLoggedIn) {
      if (liked === false) {
        setLiked(null);
      } else {
        setLiked(false);
      }
    } else {
      alert('You must be logged in to cast a dislike!');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: avatar}} />
      <View style={styles.commentContainer}>
        <View style={[styles.flexBox, styles.marginBox]}>
          <Text style={styles.heading}>{name}</Text>
          <Ratings averageRating={rating(rated)} />
        </View>

        <View style={styles.marginBox}>
          <Text style={styles.text}>{comment}</Text>
        </View>

        <Text style={[styles.smallFont, styles.marginBox]}>
          Published {moment(fireBaseTime, 'YYYYMMDD').fromNow()}
        </Text>
        <View style={styles.flexBox}>
          <View style={[styles.flexBox, styles.buttonContainer]}>
            <TouchableOpacity onPress={renderOnLikePress}>
              <AntDesign
                name="like2"
                size={20}
                color={liked === true ? root.primaryThemeColor : '#000'}
              />
            </TouchableOpacity>
            <Text style={[styles.text, styles.aaJaSanam]}>
              {abbreviateNumber(upVotes)}
            </Text>
          </View>

          <View style={[styles.flexBox, styles.buttonContainer]}>
            <TouchableOpacity onPress={renderOnDisLikePress}>
              <AntDesign
                name="dislike2"
                size={20}
                color={liked === false ? root.primaryThemeColor : '#000'}
              />
            </TouchableOpacity>
            <Text style={[styles.text, styles.aaJaSanam]}>
              {abbreviateNumber(downVotes)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function rating(arg: string) {
  switch (arg) {
    case 'fiveStar':
      return 5;
    case 'fourStar':
      return 4;
    case 'threeStar':
      return 3;
    case 'twoStar':
      return 2;
    case 'oneStar':
      return 1;
    default:
      return 5;
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flexDirection: 'row',

    paddingVertical: root.defaultSpace,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: root.bgColor2,
    // alignItems: "flex-start",
    overflow: 'hidden',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 1000,
  },
  commentContainer: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: root.primaryThemeColorLite,
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginRight: 5,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
  smallFont: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  marginBox: {
    marginBottom: 5,
  },
  buttonContainer: {
    marginRight: 20,
  },
  aaJaSanam: {
    marginLeft: 5,
  },
});
