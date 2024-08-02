import React, { useEffect, useRef, useState } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Skelaton = () => {
  




  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800, // Faster animation
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
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.profileContainer}>
          <View style={styles.profileRow}>
            <Animated.View style={[tw`w-16 h-16 rounded-full mr-3 bg-gray-400`, { opacity: shimmerOpacity }]} />
            <View>
              <View style={styles.profileDetails}>
                <Animated.View style={[tw`h-4 bg-gray-400 w-24 mb-2 rounded-full`, { opacity: shimmerOpacity }]} />
                <Animated.View style={[tw`h-4 bg-gray-400 w-20 rounded-full`, { opacity: shimmerOpacity }]} />
              </View>
              <Animated.View style={[tw`h-4 bg-gray-400 w-16 rounded-full`, { opacity: shimmerOpacity }]} />
            </View>
          </View>
          <View style={styles.feedbackContainer}>
            <Animated.View style={[tw`h-4 bg-gray-400 w-12 rounded-full mb-2`, { opacity: shimmerOpacity }]} />
            <Animated.View style={[tw`h-4 bg-gray-400 w-10 rounded-full`, { opacity: shimmerOpacity }]} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Animated.View style={[tw`h-4 bg-gray-400 w-3/4 mb-2 rounded-full`, { opacity: shimmerOpacity }]} />
          <Animated.View style={[tw`h-4 bg-gray-400 w-1/2 rounded-full`, { opacity: shimmerOpacity }]} />
        </View>
        <Animated.View style={[tw`h-4 bg-gray-400 w-5/6 mb-2 rounded-full`, { opacity: shimmerOpacity }]} />
        <Animated.View style={[tw`h-4 bg-gray-400 w-2/3 rounded-full`, { opacity: shimmerOpacity }]} />
      </TouchableOpacity>
    </View>
  );
};

export default Skelaton;

const styles = StyleSheet.create({
  card: {
    marginBottom: 16
  },
  profileContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  profileRow: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row'
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5
  },
  feedbackContainer: {
    alignItems: 'flex-end'
  },
  titleContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10
  }
});
