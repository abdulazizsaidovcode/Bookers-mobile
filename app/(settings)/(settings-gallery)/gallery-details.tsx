import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';

const { width: innerWidth, height: innerHeight } = Dimensions.get('window');

const GalleryDetails: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View>
          <NavigationMenu all={true} name='' />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Наращивание ресниц 3D</Text>
          <View style={styles.imagesContainer}>
            {[...Array(9)].map((_, index) => (
              <Image 
                key={index} 
                style={styles.image} 
                source={require('@/assets/images/defaultImg.jpeg')} 
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default GalleryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: innerWidth / 3.4,
    height: innerHeight / 7,
    borderRadius: 15,
    marginBottom: 10,
  },
});
