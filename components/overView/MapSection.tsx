import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import formattedTitle from '../../utils/formattedTitle';

const icons: any = {
  cars: <FontAwesome5 name="car" size={50} color={root.primaryThemeColor} />,
  hotels: (
    <FontAwesome5 name="hotel" size={50} color={root.primaryThemeColor} />
  ),
  security: (
    <MaterialIcons name="security" size={50} color={root.primaryThemeColor} />
  ),
};

interface schema {
  location: any;
  tab: string;
  destination: {
    country: string;
    city: string;
  };
}
export default function MapSection({
  location,
  tab,
  destination,
}: schema): JSX.Element {
  const newLocation: any = Object.values(location);
  const {country, city} = destination;
  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <Text style={styles.heading}>Location</Text>
        <Text style={styles.text}>
          {formattedTitle(city) + '/' + formattedTitle(country)}
        </Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: newLocation[0],
          longitude: newLocation[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: newLocation[0],
            longitude: newLocation[1],
          }}>
          {icons[tab]}
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: root.width,
    height: Math.round(root.width * 0.7),
  },
  map: {
    flex: 1,
    marginVertical: 5,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
    marginHorizontal: root.defaultSpace,
  },
  text: {
    color: root.textColor3,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginHorizontal: root.defaultSpace,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
