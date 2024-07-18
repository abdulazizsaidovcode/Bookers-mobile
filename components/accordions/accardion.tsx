import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';

interface AccordionItemProps {
  title: string;
  titleThen?: string;
  children: React.ReactNode;
  backgroundColor: string; 
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, titleThen, backgroundColor }) => {
  const {mainExpend,setMainExpend}=useAccardionStore()

  const toggleExpand = () => {
    // Animatsiya
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMainExpend(!mainExpend);
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.mainText}>
          <Text style={styles.headerText}>{title}</Text>
          {titleThen && <Text style={styles.headerTitle}>{titleThen}</Text>}
        </View>
        <AntDesign name={mainExpend ? 'down' : 'right'} size={20} color="#4F4F4F" />
      </TouchableOpacity>
      {mainExpend && (
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
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
    backgroundColor: '#21212E',
  },
});

export default AccordionItem;
