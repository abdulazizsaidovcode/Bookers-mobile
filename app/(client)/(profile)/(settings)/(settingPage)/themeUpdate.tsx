import { StyleSheet, View } from "react-native";
import React, { useState, useCallback } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { RatioProps } from "./ratioOptiom";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { Loading } from "@/components/loading/loading";

interface ComponentData {
  radioProps: RatioProps[];
  // updateName: string
}

const ThemeUpdate: React.FC<ComponentData> = ({ radioProps }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [Theme, setTheme] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      const getStoredTheme = async () => {
        setIsLoading(true);
        try {
          const storedTheme = await SecureStore.getItemAsync("selectedTheme");
          if (storedTheme) {
            setTheme(storedTheme);
            setIsLoading(false);
          }
          else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Failed to get stored Theme:", error);
          setIsLoading(false);
        }
      };

      getStoredTheme();
      return () => null;
    }, [])
  );

  const onPressRadioButton = async (key: string) => {
      setIsLoading(true)
      setTheme(key);
    try {
      await SecureStore.setItemAsync("selectedTheme", key);
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to save Theme:", error);
      setIsLoading(false)
    }
  };

  return (
    <>
      { isLoading ? <Loading/> : 
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
                  isSelected={Theme === obj.value}
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
      }
    </>
  );
};

export default ThemeUpdate;

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
