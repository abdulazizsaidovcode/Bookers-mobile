import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Expo dan AntDesign ikonlari

interface AccordionItemProps {
  title: string;
  titleThen?: string;
  children: React.ReactNode;
  backgroundColor: string; // backgroundColor nomli majburiy prop
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, titleThen, backgroundColor }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // Animatsiya
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {/* Sarlavha va belgi */}
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.mainText}>
          <Text style={styles.headerText}>{title}</Text>
          {titleThen && <Text style={styles.headerTitle}>{titleThen}</Text>}
        </View>
        <AntDesign name={expanded ? 'down' : 'right'} size={20} color="#4F4F4F" />
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
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  mainText: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: '#fff',
  },
  headerTitle: {
    fontSize: 12,
    color: "#C2C2C2",
  },
  content: {
    padding: 15,
    backgroundColor: '#21212E',
  },
});

export default AccordionItem;
