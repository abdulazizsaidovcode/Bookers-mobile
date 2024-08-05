import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { useAccardionStoreId } from '@/helpers/state_managment/accardion/accardionStore';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionSkelaton: React.FC = () => {
  const { expandedId, setExpandedId } = useAccardionStoreId();
  const [isExpanded, setIsExpanded] = useState(expandedId === "skelaton");
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const contentHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startFade = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedOpacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startFade();
  }, [animatedOpacity]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const id = "skelaton";
    const isCurrentlyExpanded = expandedId === id;

    if (isCurrentlyExpanded) {
      Animated.spring(contentHeight, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }).start(() => {
        setExpandedId(null);
        setIsExpanded(false);
      });
    } else {
      setExpandedId(id);
      setIsExpanded(true);
      Animated.spring(contentHeight, {
        toValue: 100, // Adjust this value to match the actual content height
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={[tw`p-1 rounded-lg`, { width: '100%' }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleExpand}
        style={tw`flex flex-row justify-between items-center p-4 bg-gray-400 rounded-lg`}
      >
        <View style={tw`flex flex-col flex-grow`}>
          <Animated.View
            style={[
              tw`h-4 bg-gray-300 rounded-md w-3/4 mb-2`,
              { opacity: animatedOpacity }
            ]}
          />
          <Animated.View
            style={[
              tw`h-4 bg-gray-300 rounded-md w-3/4 mb-2`,
              { opacity: animatedOpacity }
            ]}
          />
          <Animated.View
            style={[
              tw`h-4 bg-gray-300 rounded-md w-3/4`,
              { opacity: animatedOpacity }
            ]}
          />
        </View>
        <AntDesign name={isExpanded ? 'down' : 'right'} size={20} color="#4F4F4F" />
      </TouchableOpacity>
    </View>
  );
};

export default AccordionSkelaton;
