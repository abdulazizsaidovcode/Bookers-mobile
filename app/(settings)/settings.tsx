import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Buttons from "@/components/(buttons)/button";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "settings"
>;

const Settings: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Buttons
        title="fresdx"
        onPress={() =>
          navigation.navigate(
            "(settings)/(settings-location)/settings-locations-main"
          )
        }
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
