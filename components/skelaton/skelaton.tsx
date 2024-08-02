import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Skelaton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600, // Faster animation
        useNativeDriver: true,
      }).start(() => startShimmer());
    };

    startShimmer();
  }, [animatedValue]);

  const shimmerOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.7, 1, 0.7], // Adjusted for a lighter shimmer
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.profileContainer}>
          <View style={styles.profileRow}>
            <Animated.View style={[tw`w-16 h-16 rounded-full mr-3 bg-gray-400`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
            <View>
              <View style={styles.profileDetails}>
                <Animated.View style={[tw`bg-gray-400 w-48 p-2 mb-2`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
              </View>
              <Animated.View style={[tw`p-3 bg-gray-400 w-full`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
            </View>
          </View>
          <View style={styles.feedbackContainer}>
            <Animated.View style={[tw`h-4 bg-gray-400 w-12  mb-2`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
            <Animated.View style={[tw`h-4 bg-gray-400 w-12 `, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Animated.View style={[tw`h-4 bg-gray-400 w-3/4 mb-1 `, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
          <Animated.View style={[tw`h-4 bg-gray-400 w-3/4 mb-3 `, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
        </View>
        <View style={tw`flex flex-row mt-2`}>
          <Animated.View style={[tw`p-3 bg-gray-400 w-3/4 mr-2`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
          <Animated.View style={[tw`bg-gray-400 w-10 h-10 rounded-full`, { opacity: shimmerOpacity, borderColor: 'gray', borderWidth: 1 }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Skelaton;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  profileRow: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  feedbackContainer: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
  },
});
