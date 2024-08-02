import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';

interface SplashScreenComponentProps {
  onFinish: () => void;
}

const SplashScreenComponent: React.FC<SplashScreenComponentProps> = ({ onFinish }) => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise(resolve => setTimeout(resolve, 6000));
      await SplashScreen.hideAsync();
      onFinish();
    };

    hideSplashScreen();
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require('@/assets/videos/mobile.mp4')}
        style={styles.video}
        resizeMode="cover"
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreenComponent;


