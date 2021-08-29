import React, {forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {root} from '../css';

type RefType = Modalize | null;

const BottomSheet = forwardRef<RefType, ModalizeProps>(
  (props, ref): JSX.Element => {
    return (
      <Portal>
        <Modalize
          ref={ref}
          modalStyle={styles.contentContainer}
          modalHeight={root.bottomSheetHeight}
          childrenStyle={styles.content}
          HeaderComponent={
            // showHandler && (
            <View style={styles.handler}>
              <View style={styles.line} />
            </View>
            // )
          }
          {...props}
        />
      </Portal>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    marginHorizontal: root.defaultSpace,
  },
  handler: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: root.primaryThemeColor,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: root.bgColor1,
    borderRadius: 10,
  },
});
