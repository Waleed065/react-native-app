import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {root} from '../css';
import {countries} from '../utils/countries';

declare const alert: any;
const key = 'AIzaSyBI8cEI3kUxIqVvnSk0Qh-M9W5nLeDP74Q';
Geocoder.init(key);

interface schema {
  setLocation: ({
    name,
    coordinates,
  }: {
    name: string;
    coordinates: {
      x_: number;
      N_: number;
    };
  }) => void;
  onCancel: () => void;
  country: string;
}

export default function Places({
  onCancel,
  country,
  setLocation,
}: schema): JSX.Element {
  useEffect(() => {
    return () => undefined;
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSelect = (suggestion: any) => {
    Geocoder.from(suggestion.description)
      .then((json: any) => {
        const location = json.results[0].geometry.location;
        setLocation({
          name: suggestion.description,
          coordinates: {
            x_: location.lat,
            N_: location.lng,
          },
        });
        onCancel();
      })
      .catch(() => alert('Error while fetching'));
  };

  const countryCode = useRef(
    countries.find(state => state.name.toLowerCase() === country.toLowerCase())
      ?.alpha2Code,
  );

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        debounce={mounted ? 500 : 0}
        // GoogleReverseGeocodingQuery={}
        placeholder="Search"
        query={{
          key,
          language: 'en',
          components: `country:${countryCode.current}`,
        }}
        onPress={handleSelect}
        onFail={() => alert('Error while fetching')}
        enablePoweredByContainer={false}
      />

      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: root.defaultSpace,
    // paddingTop: getStatusBarHeight() + 10,
    backgroundColor: '#ecf0f1',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: root.bgColor1,
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: root.defaultSpace,
  },
  text: {
    color: root.primaryThemeColor,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
});
