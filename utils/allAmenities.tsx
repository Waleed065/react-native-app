import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import {root} from '../css';

interface schema {
  [key: string]: {
    [key: string]: {
      icon: JSX.Element;
      title: string;
      details: string;
    };
  };
}

const size = 40;
const color = root.primaryThemeColor;

export const allAmenities: schema = {
  hotels: {
    airConditioning: {
      icon: <FontAwesome5 name="snowflake" size={size} color={color} />,
      title: 'Air-Conditioned',
      details:
        'Air conditioning [climate-controlled]\nBlackout drapes/curtains\nFree cribs/infant beds\nLinens\nPillow-top-mattress\nPremium bedding\nRollaway/extra beds(surcharge)',
    },
    wifi: {
      icon: <FontAwesome5 name="wifi" size={size} color={color} />,
      title: 'Wifi',
      details:
        'Available in all rooms. Wifi ($5.02 per night) Available in some public areas: internet access.',
    },
    petFriendly: {
      icon: <FontAwesome5 name="dog" size={size} color={color} />,
      title: 'Pet-Friendly',
      details:
        'Pets are allowed for an extra charge of $175 per night. Dogs only. 2 per room(up to 100lbs)',
    },
    spa: {
      icon: <FontAwesome5 name="spa" size={size} color={color} />,
      title: 'Spa',
      details:
        'Aromatherapy\nBody scrubs\nBody treatments\nBody wraps\nFacials\nManicures and pedicures\nMassage - deep-tissue\nMassage - hot stone\nMassage - prenatal\nMassage - sports\nMassage - Swedish\nMassage - Thai\nReflexology1nSpa open daily',
    },
    foodAndBeverages: {
      icon: <MaterialIcons name="restaurant" size={size} color={color} />,
      title: 'Food & Beverages',
      details:
        'Cooked-to-order breakfast available for a fee daily 6:00 AM-11:00 AM: $30-$55 for adults and $15-$35 for children\n11 resturants and 2 coffee shops\n5 bars/lounges and 1 poolside bar\nsize-hour room service',
    },
    kitchen: {
      icon: <MaterialIcons name="kitchen" size={size} color={color} />,
      title: 'Kitchen',
      details: '',
    },
    accessibility: {
      icon: <FontAwesome5 name="accessible-icon" size={size} color={color} />,
      title: 'accessibility',
      details:
        'If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.\nAccessible bathroom\nAssistive listening devices available\nBraille signage\nIn-room-accessibility\nRoll-in shower\nWell-lit path to entrance\nWheelchair-accessible business center\nWheelchair-accessable parking\nWheelChair-accessable path of travel\nWheelChair-accessible path to elevator\nWheelChair-accessible public washroom\nWheelChair-accessible restaurant',
    },
    conveniences: {
      icon: (
        <MaterialCommunityIcons
          name="progress-clock"
          size={size}
          color={color}
        />
      ),
      title: 'Conveniences',
      details:
        'ATM/banking services\nBallroom\nBanquet hall\nElevator\nGift shop/newsstand\nNewspapers in lobby',
    },
    entertainment: {
      icon: (
        <MaterialCommunityIcons
          name="animation-play"
          size={size}
          color={color}
        />
      ),
      title: 'Entertainment',
      details: '',
    },
    parking: {
      icon: <FontAwesome5 name="parking" size={size} color={color} />,
      title: 'Parking',
      details:
        'Free covered self parking on site. Onsite parking is wheelchair accessible. Height restrictions apply for onsite parking.',
    },
  },
  cars: {
    airConditioning: {
      icon: <FontAwesome5 name="snowflake" size={size} color={color} />,
      title: 'Air-Conditioned',
      details:
        'Air conditioning [climate-controlled]\nBlackout drapes/curtains\nFree cribs/infant beds\nLinens\nPillow-top-mattress\nPremium bedding\nRollaway/extra beds(surcharge)',
    },
    driver: {
      icon: <MaterialIcons name="person" size={size} color={color} />,
      title: 'Driver',
      details: '',
    },
    wifi: {
      icon: <FontAwesome5 name="wifi" size={size} color={color} />,
      title: 'Wifi',
      details:
        'Available in all rooms. Wifi ($5.02 per night) Available in some public areas: internet access.',
    },
    frontTelevision: {
      icon: <Entypo name="tv" size={size} color={color} />,
      title: 'Front-TV',
      details: '',
    },
    rearTelevision: {
      icon: <FontAwesome5 name="tv" size={size} color={color} />,
      title: 'Rear-TV',
      details: '',
    },
    soundSystem: {
      icon: <Entypo name="sound-mix" size={size} color={color} />,
      title: 'Sound-System',
      details: '',
    },
    drinks: {
      icon: <Entypo name="drink" size={size} color={color} />,
      title: 'Drinks',
      details: '',
    },
    tintedWindows: {
      icon: (
        <MaterialCommunityIcons name="car-door" size={size} color={color} />
      ),
      title: 'Tinted-Windows',
      details: '',
    },
    bulletProof: {
      icon: <MaterialCommunityIcons name="bullet" size={size} color={color} />,
      title: 'Bullet-Proof',
      details: '',
    },
    usbCharging: {
      icon: <Entypo name="battery" size={size} color={color} />,
      title: 'USB-Charging',
      details: '',
    },
  },
  security: {
    trained: {
      icon: (
        <MaterialCommunityIcons name="security" size={size} color={color} />
      ),
      title: 'Trained',
      details: '',
    },
    armed: {
      icon: <MaterialCommunityIcons name="pistol" size={size} color={color} />,
      title: 'Armend',
      details: '',
    },
    insurance: {
      icon: (
        <MaterialCommunityIcons
          name="file-check-outline"
          size={size}
          color={color}
        />
      ),
      title: 'Insurance',
      details: '',
    },
    lowRates: {
      icon: <FontAwesome5 name="dollar-sign" size={size} color={color} />,
      title: 'Low-Rates',
      details: '',
    },
    safety: {
      icon: <AntDesign name="Safety" size={size} color={color} />,
      title: 'Safety',
      details: '',
    },
    monitoring: {
      icon: <AntDesign name="videocamera" size={size} color={color} />,
      title: 'Monitoring',
      details: '',
    },
    firstAid: {
      icon: <Foundation name="first-aid" size={size} color={color} />,
      title: 'First-Aid',
      details: '',
    },
    mannered: {
      icon: (
        <MaterialCommunityIcons name="human-male" size={size} color={color} />
      ),
      title: 'Well-Behaved',
      details: '',
    },
  },
};
