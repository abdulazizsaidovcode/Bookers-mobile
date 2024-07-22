import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";

const radioProps = [
  { label: "Erkak", value: "MALE", isTrue: true },
  { label: "Ayol", value: "FEMALE", isTrue: false },
];

const SelectGender = () => {
  const { getMee } = useGetMeeStore();
  const {updateProfileField} = useProfileStore()
  const [genderIndex, setGenderIndex] = useState<boolean>(getMee && getMee.gender ? getMee.gender === "MALE" : getMee.gender === "FEMALE");

  const onPressRadioButton = (key: boolean) => {
    setGenderIndex(key)
    updateProfileField("gender", key)
  };

  return (
    <View style={styles.content}>
      <RadioForm formHorizontal={false} animation={true}>
        {radioProps.map((obj, i) => (
          <RadioButton style={{ marginTop: 8 }} labelHorizontal={true} key={i}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={genderIndex === obj.isTrue}
              onPress={ () => onPressRadioButton(obj.isTrue)}
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
