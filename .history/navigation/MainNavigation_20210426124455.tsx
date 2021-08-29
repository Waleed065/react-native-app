import React, {useRef, useEffect} from 'react';

import database from '@react-native-firebase/database';

import firestore from '@react-native-firebase/firestore';
import {STORE} from '../STORE';

import {useSelector, batch, useDispatch} from 'react-redux';
import {stateTypes} from '../types';
import {
  addChatRoom,
  setUsers,
  addNewMessage,
  addOrders,
  removeOrder,
  modifyOrder,
  addToTrash,
  removeFromTrash,
  removeFromPostAdRequests,
  modifyPostAdRequest,
  addToPostAdRequests,
  removeFromContactUsMessages,
  modifyContactUsMessage,
  addToContactUsMessages,
  removeChatRoom,
  removeMessage,
  modifyUser,
} from '../STORE/actions';
import StackNavigation from './StackNavigation';

const sortIt = (prevValue: any, nextValue: any) =>
  nextValue.createdAt < prevValue.createdAt
    ? 1
    : nextValue.createdAt > prevValue.createdAt
    ? -1
    : 0;

export default function MainNavigation(): JSX.Element {
  const userId = useSelector((state: stateTypes) => state.userInfo.uid);
  const dispatch = useDispatch();

  const usersRef: any = useRef(null);
  useEffect(() => {
    if (userId) {
      const storedUsers = STORE.getState().users;
      let allUsers: any = {};

      const usersStartAt =
        Object.values(storedUsers).sort(sortIt).pop()?.createdAt ?? null;
      const userIds = Object.keys(storedUsers);

      database()
        .ref('/userIds')
        .orderByChild('createdAt')
        .startAt(usersStartAt)
        .on('child_added', (snap: any) => {
          if (!(userIds.indexOf(snap.key) > -1)) {
            // console.log('child added');
            database()
              .ref(`/users/${snap.key}`)
              .once('value')
              .then(snapShot => {
                // console.log('Clild Added');
                if (snapShot.exists()) {
                  allUsers[snap.key] = {
                    ...snapShot.val(),
                    createdAt: snap.val().createdAt,
                  };
                  clearTimeout(usersRef.current);
                  usersRef.current = setTimeout(() => {
                    batch(() => {
                      Object.keys(allUsers).forEach((userId: any) =>
                        Object.keys(allUsers[userId].userChats).forEach(
                          (chatRoomId: string) => {
                            dispatch(
                              addChatRoom({
                                chatRoomId,
                                chatRoomPayload: {
                                  chatDetails:
                                    allUsers[userId].userChats[chatRoomId]
                                      .chatDetails ?? {},
                                  memberDetails:
                                    allUsers[userId].userChats[chatRoomId]
                                      .memberDetails ?? {},
                                  messages: {},
                                  createdAt: null,
                                },
                              }),
                            );
                          },
                        ),
                      );

                      dispatch(setUsers(allUsers));
                    });
                    allUsers = {};
                  }, 20);
                }
              });
          }
        });

      database()
        .ref('/users')
        .on('child_changed', (snap: any) => {
          // console.log('User Updated');
          const data = snap.val();
          batch(() => {
            Object.keys(data.userChats).forEach((chatRoomId: string) => {
              dispatch(
                addChatRoom({
                  chatRoomId,
                  chatRoomPayload: {
                    chatDetails: data.userChats[chatRoomId].chatDetails ?? {},
                    memberDetails:
                      data.userChats[chatRoomId].memberDetails ?? {},
                    messages: {},
                    createdAt: null,
                  },
                }),
              );
            });

            dispatch(
              modifyUser({
                userId: snap.key,
                userDetails: snap.val(),
              }),
            );
          });
        });

      return () => {
        database().ref('/userIds').off();
        database().ref('/users').off();
      };
    }
  }, [userId, dispatch]);

  // messages child added
  const chatRoomsOnAddedRef = useRef<any>(null);
  const messagesOnAddedRef: any = useRef({});
  const messagesOnAddedMountedRef: any = useRef({});
  useEffect(() => {
    const allMessages = STORE.getState().messages;

    if (userId) {
      const messages: any = {};
      let chatRooms: any = {};

      // const chatStartAt =
      //   Object.values(allMessages).sort(sortIt).pop()?.createdAt ?? null;
      const chatIds = Object.keys(allMessages);

      // console.log({chatStartAt: Object.values(allMessages).pop()});
      // .orderByChild('createdAt')
      // .startAt(chatStartAt)
      database()
        .ref('/chatIds')
        .on('child_added', (snap: any) => {
          // console.log({chatId: snap.key});
          chatRooms[snap.key] = {
            chatRoomId: snap.key,
            createdAt: snap.val().createdAt,
          };
          clearTimeout(chatRoomsOnAddedRef.current);
          chatRoomsOnAddedRef.current = setTimeout(() => {
            if (!(chatIds.indexOf(snap.key) > -1)) {
              batch(() => {
                Object.keys(chatRooms).forEach((chatRoomId: string) => {
                  dispatch(
                    addChatRoom({
                      chatRoomId,
                      chatRoomPayload: {
                        chatDetails: {},
                        memberDetails: {},
                        messages: {},
                        createdAt: chatRooms[chatRoomId].createdAt,
                      },
                    }),
                  );
                });
              });
            }

            Object.keys(chatRooms).forEach((chatRoomId: string) => {
              messages[chatRoomId] = {};
              const messagesStartAt =
                Object.values(allMessages[chatRoomId]?.messages ?? '')?.pop()
                  ?.sentAt ?? null;

              database()
                .ref(`chats/${chatRoomId}/messages`)
                .orderByChild('sentAt')
                .startAt(messagesStartAt)
                .on('child_added', (snapShot: any) => {
                  // console.log('message Added');

                  messages[chatRoomId][snapShot.key] = {
                    msgId: snapShot.key,
                    ...snapShot.val(),
                  };

                  if (
                    Object.prototype.hasOwnProperty.call(
                      messagesOnAddedMountedRef.current,
                      chatRoomId,
                    )
                  ) {
                    // console.log('messageFucked');
                    dispatch(
                      addNewMessage({
                        chatRoomId,
                        messages: messages[chatRoomId],
                      }),
                    );
                    messages[chatRoomId] = {};
                  }
                });

              // .orderByChild('sentAt')
              // .startAt(messagesStartAt)
              database()
                .ref(`chats/${chatRoomId}/messages`)
                .on('child_removed', (snapShot: any) => {
                  // console.log('message removed', snap.key);

                  dispatch(
                    removeMessage({
                      chatRoomId,
                      messageId: snapShot.key,
                    }),
                  );
                });
            });

            clearTimeout(messagesOnAddedRef.current);
            messagesOnAddedRef.current = setTimeout(() => {
              // console.log('normal');
              batch(() => {
                Object.keys(messages).forEach(chatRoomId => {
                  dispatch(
                    addNewMessage({
                      chatRoomId,
                      messages: messages[chatRoomId],
                    }),
                  );
                  messages[chatRoomId] = {};
                  messagesOnAddedMountedRef.current[chatRoomId] = true;
                });
              });
            }, 1000);

            chatRooms = {};
          }, 100);
        });

      database()
        .ref('/chatIds')
        .on('child_removed', (snap: any) => {
          // console.log('chatRoom removed', snap.key);
          dispatch(removeChatRoom(snap.key));
        });
    }
    return () => {
      database().ref('chatIds').off();
      database().ref('chats').off();
    };
  }, [userId, dispatch]);

  useEffect(() => {
    let unsubscribe: any;
    if (userId) {
      unsubscribe = firestore()
        .collection('orders')
        .orderBy('time')
        .onSnapshot(snapShot => {
          let allOrders: any = {};
          snapShot.docChanges().forEach(change => {
            // console.log('contactUs', change.type);
            switch (change.type) {
              case 'added':
                return (allOrders[change.doc.id] = change.doc.data());
              case 'removed':
                return dispatch(removeOrder(change.doc.id));
              case 'modified':
                return dispatch(
                  modifyOrder({[change.doc.id]: change.doc.data() as any}),
                );
              default:
                return null;
            }
          });

          if (Boolean(Object.keys(allOrders).length)) {
            dispatch(addOrders(allOrders));
            allOrders = {};
          }
        });
    }
    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [userId]);

  useEffect(() => {
    let unsubscribe: any;
    if (userId) {
      unsubscribe = firestore()
        .collection('post-ad-requests')
        .orderBy('time')
        .onSnapshot(snapShot => {
          let allRequests: any = {};
          snapShot.docChanges().forEach(change => {
            // console.log('post-ad-requests', change.type);
            switch (change.type) {
              case 'added':
                return (allRequests[change.doc.id] = change.doc.data());
              case 'removed':
                return dispatch(removeFromPostAdRequests(change.doc.id));
              case 'modified':
                return dispatch(
                  modifyPostAdRequest({
                    [change.doc.id]: change.doc.data() as any,
                  }),
                );
              default:
                return null;
            }
          });

          if (Boolean(Object.keys(allRequests).length)) {
            dispatch(addToPostAdRequests(allRequests));
            allRequests = {};
          }
        });
    }
    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [userId]);

  useEffect(() => {
    let unsubscribe: any;
    if (userId) {
      unsubscribe = firestore()
        .collection('contact-us')
        .orderBy('time')
        .onSnapshot(snapShot => {
          let allMessages: any = {};
          snapShot.docChanges().forEach(change => {
            // console.log('contactUs', change.type);
            switch (change.type) {
              case 'added':
                return (allMessages[change.doc.id] = change.doc.data());
              case 'removed':
                return dispatch(removeFromContactUsMessages(change.doc.id));
              case 'modified':
                return dispatch(
                  modifyContactUsMessage({
                    [change.doc.id]: change.doc.data() as any,
                  }),
                );
              default:
                return null;
            }
          });

          if (Boolean(Object.keys(allMessages).length)) {
            dispatch(addToContactUsMessages(allMessages));
            allMessages = {};
          }
        });
    }
    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [userId]);

  useEffect(() => {
    let unsubscribe: any;
    if (userId) {
      unsubscribe = firestore()
        .collection('trash')
        .orderBy('time')
        .onSnapshot(snapShot => {
          let allTrash: any = {};
          snapShot.docChanges().forEach(change => {
            // console.log({collection: 'trash', type: change.type});
            switch (change.type) {
              case 'added':
                return (allTrash[change.doc.id] = change.doc.data());
              case 'modified':
                return (allTrash[change.doc.id] = change.doc.data());
              case 'removed':
                return dispatch(removeFromTrash(change.doc.id));
              default:
                return null;
            }
          });

          if (Boolean(Object.keys(allTrash).length)) {
            dispatch(addToTrash(allTrash));
            allTrash = {};
          }
        });
    }

    return () => {
      if (unsubscribe) {
        return unsubscribe();
      }
    };
  }, [userId]);

  return <StackNavigation />;
}
