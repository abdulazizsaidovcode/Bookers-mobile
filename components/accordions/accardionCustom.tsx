import React, { Children, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useAccardionStore } from "@/helpers/state_managment/accardion/accardionStore";

interface AccordionItemProps {
  title: string;
  children: JSX.Element;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionCustom: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [expanded5, setExpended5] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpended5(!expanded5);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={1}
      >
        <View style={styles.mainText}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <AntDesign
          name={expanded5 ? "down" : "right"}
          size={20}
          color="#4F4F4F"
        />
      </TouchableOpacity>

      {expanded5 && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    overflow: "hidden",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#B9B9C9",
    borderRadius: 8,
  },
  mainText: {
    flexDirection: "column",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  content: {
    backgroundColor: "#B9B9C9",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: -7,
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  radioButtonWrap: {
    marginLeft: 10,
  },
  selectedGenderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default AccordionCustom;
