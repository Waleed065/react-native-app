import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import { root } from "../../css";
import { getComments } from "../../STORE/selectors";
import { commentsItemType } from "../../types";
import Comment from "./Comment";

const height = Math.floor(root.height * 0.8);
interface schema {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
}
const AllCommentsListView = ({
  showModal,
  setShowModal,
}: schema): JSX.Element => {
  const comments = useSelector(getComments);

  const dataProvider: any = new DataProvider(() => {
    return false;
  }).cloneWithRows(Object.values(comments ?? []));

  const layoutProvider = new LayoutProvider(
    (index) => index,
    (type, dim) => {
      dim.width = root.width - root.defaultSpace * 2;
      dim.height = root.width;
    }
  );

  const renderItem = (type: any, item: commentsItemType) => {
    return (
      <View style={styles.comment}>
        <Comment review={item} />
      </View>
    );
  };

  return (
    <Modal
      isVisible={showModal}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      onBackButtonPress={() => setShowModal(false)}
      onBackdropPress={() => setShowModal(false)}
      useNativeDriver={Platform.select({ ios: false, android: true })}
    >
      <View style={[styles.container, { height }]}>
        {Boolean(dataProvider._data?.length) && (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={renderItem}
            forceNonDeterministicRendering={true}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default AllCommentsListView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: root.defaultSpace,
    backgroundColor: root.bgColor1,
    width: root.width - root.defaultSpace * 2,
    alignSelf: "center",
    borderRadius: 10,
  },
  comment: {
    flex: 1,
  },
});
