import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "expo-router";
import { Loading } from "@/components/loading/loading";

export interface RatioProps {
  label: string;
  value: string;
  theme?: string;
}

interface ComponentData {
  radioProps: RatioProps[];
  // updateName: string
}

const RatioOption: React.FC<ComponentData> = ({ radioProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Language, setLanguage] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const getStoredLanguage = async () => {
        try {
          const storedLanguage = await SecureStore.getItemAsync(
            "selectedLanguage"
          );
          if (storedLanguage) {
            setIsLoading(false);
            setLanguage(storedLanguage);
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Failed to get stored language:", error);
        }
      };

      getStoredLanguage();
      return () => null;
    }, [])
  );

  const onPressRadioButton = async (key: string) => {
    setIsLoading(true);
    setLanguage(key);
    try {
      await SecureStore.setItemAsync("selectedLanguage", key);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to save language:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.content}>
          <RadioForm formHorizontal={false} animation={true}>
            {radioProps.map((obj, i) => (
              <RadioButton
                style={{ marginTop: 8 }}
                labelHorizontal={true}
                key={i}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={Language === obj.value}
                  onPress={() => onPressRadioButton(obj.value)}
                  buttonInnerColor={"#9C035A"}
                  buttonOuterColor={"#9C035A"}
                  buttonSize={15}
                  buttonOuterSize={25}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={() => onPressRadioButton(obj.value)}
                  labelStyle={styles.radioButtonLabel}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      )}
    </>
  );
};

export default RatioOption;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#B9B9C9",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  selectedGenderText: {
    marginTop: 15,
    fontSize: 16,
    color: "#333",
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});
