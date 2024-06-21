import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

interface ChatCardProps {
  item: any;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
  isSelected: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ item, onPress, onLongPress, isSelected }) => {
  const { name, chatDto, newMessageCount, avatar, status } = item;
  const message = chatDto?.content || 'No message';

  return (
    <Pressable
      onPress={() => onPress(item.userId)}
      onLongPress={() => onLongPress(item.userId)}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: avatar }} style={styles.image} />
        {isSelected && (
          <AntDesign style={styles.checkIcon} name="check" size={24} color="black" />
        )}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{name}</Text>
          {newMessageCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{newMessageCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{status}</Text>
            {newMessageCount === 0 && <FontAwesome name="check" size={14} color="#ccc" />}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#4B5563',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#374151',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  checkIcon: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#34D399',
    borderRadius: 8,
    padding: 2,
  },
  textContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  badge: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default ChatCard;
