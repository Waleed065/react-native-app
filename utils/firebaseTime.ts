type schema =
  | {
      seconds: number;
      nanoseconds: number;
    }
  | {
      _seconds: number;
      _nanoseconds: number;
    }
  | null | any;
interface returnSchema {
  date: string;
  atTime: string;
}

export function firebaseTime(time: schema): returnSchema {
  let fireStoreTime: Date;
  if (!time) {
    fireStoreTime = new Date();
  } else {
    let seconds = 0;
    let nanoseconds = 0;
    const typeCheck = (type: string) => {
      switch (type) {
        case 'seconds':
          seconds = time['seconds'];
          break;
        case '_seconds':
          seconds = time['_seconds'];
          break;
        case 'nanoseconds':
          nanoseconds = time['nanoseconds'];
          break;
        case '_nanoseconds':
          nanoseconds = time['_nanoseconds'];
          break;
      }
    };
    typeCheck(Object.keys(time)[0])
    typeCheck(Object.keys(time)[1])

    fireStoreTime = new Date(seconds * 1000 + nanoseconds / 1000000);
  }
  return {
    date: fireStoreTime.toDateString(),
    atTime: fireStoreTime.toLocaleTimeString(),
  };
}
