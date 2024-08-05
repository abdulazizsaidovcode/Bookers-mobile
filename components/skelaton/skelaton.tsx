import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Skelaton = () => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startFade = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedOpacity, {
            toValue: 0.5, // Fade to half opacity
            duration: 1000, // Duration of fade out
            useNativeDriver: true,
          }),
          Animated.timing(animatedOpacity, {
            toValue: 1, // Fade back to full opacity
            duration: 1000, // Duration of fade in
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startFade();
  }, [animatedOpacity]);

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={1}>
        <Animated.View style={[styles.profileContainer, { opacity: animatedOpacity }]}>
          <View style={styles.profileRow}>
            <Animated.View style={[tw`w-16 h-16 rounded-full mr-3 bg-gray-300`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
            <View>
              <View style={styles.profileDetails}>
                <Animated.View style={[tw`bg-gray-300 rounded-md w-48 p-2 mb-2`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
              </View>
              <Animated.View style={[tw`p-3 bg-gray-300 rounded-md w-full`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
            </View>
          </View>
          <View style={styles.feedbackContainer}>
            <Animated.View style={[tw`h-4 bg-gray-300 rounded-md w-12 mb-2`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
            <Animated.View style={[tw`h-4 bg-gray-300 rounded-md w-12`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.titleContainer, { opacity: animatedOpacity }]}>
          <Animated.View style={[tw`h-4 bg-gray-300 rounded-md w-3/4 mb-1`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
          <Animated.View style={[tw`h-4 bg-gray-300 rounded-md w-3/4 mb-3`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
        </Animated.View>
        <View style={tw`flex flex-row mt-2`}>
          <Animated.View style={[tw`p-3 bg-gray-300 rounded-md w-3/4 mr-2`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
          <Animated.View style={[tw`bg-gray-300 rounded-md w-10 h-10 rounded-full`, { opacity: animatedOpacity, borderColor: 'gray' }]} />
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
    marginBottom: 10
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
