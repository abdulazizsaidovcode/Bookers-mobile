import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import clientStore from "@/helpers/state_managment/client/clientStore";

const radioProps = [
  { label: "Erkak", value: 0 },
  { label: "Ayol", value: 1 },
];

const SelectGender = () => {

  const [genderIndex, setGenderIndex] = useState<number>(-1);
  const { attachmentID } = clientStore();

  const onPressRadioButton = (index: number) => {
    setGenderIndex(index);
  };

  return (
    <View style={styles.content}>
      <RadioForm formHorizontal={false} animation={true}>
        {radioProps.map((obj, i) => (
          <RadioButton style={{ marginTop: 8 }} labelHorizontal={true} key={i}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={genderIndex === i}
              onPress={onPressRadioButton}
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
              onPress={onPressRadioButton}
              labelStyle={styles.radioButtonLabel}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};

export default SelectGender;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#B9B9C9",
    borderRadius: 8,
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
