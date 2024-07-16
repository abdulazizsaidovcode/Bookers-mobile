import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Expo dan AntDesign ikonlari

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // Animatsiya
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {/* Sarlavha va belgi */}
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <Text style={styles.headerText}>{title}</Text>
        <AntDesign name={expanded ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>

      {/* Agar accordion ochilgan bo'lsa, kontentni ko'rsatish */}
      {expanded && (
        <View style={styles.content}>
          <Text>{children}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default AccordionItem;
