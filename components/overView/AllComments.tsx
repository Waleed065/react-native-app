import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {root} from '../../css';
import {fetchComments} from '../../STORE/actions';
import {getComments} from '../../STORE/selectors';
import Comment from './Comment';

interface schema {
  setShowModal: (arg: boolean) => void;
}
const AllComments = ({setShowModal}: schema): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(getComments);

  const commentsExist = comments && Object.keys(comments).length;
  const condition = commentsExist || !comments;
  console.log(condition);
  useEffect(() => {
    if (condition) return;
    let mounted = true;
    if (!mounted) return;
    console.log('Fetching Comments');

    setLoading(true);

    dispatch(fetchComments());
    return () => {
      mounted = false;
      setLoading(false);
    };
  }, [dispatch, condition]);

  return (
    <View style={styles.container}>
      {comments
        ? Object.values(comments)
            .slice(0, 5)
            .map((item, index) => <Comment key={index} review={item} />)
        : loading && (
            <ActivityIndicator
              hidesWhenStopped={true}
              animating={true}
              color={root.primaryThemeColor}
              size={30}
            />
          )}
      {comments && Object.keys(comments).length > 5 && (
        <TouchableOpacity
          style={styles.showMoreButton}
          activeOpacity={root.activeOpacity}
          onPress={() => setShowModal(true)}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(AllComments);

const styles = StyleSheet.create({
  container: {
    padding: root.defaultSpace,
  },

  showMoreButton: {
    marginTop: root.defaultSpace,
    alignItems: 'center',
    justifyContent: 'center',
  },

  showMoreText: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
});
