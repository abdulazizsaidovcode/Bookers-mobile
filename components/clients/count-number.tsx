import tw from "tailwind-react-native-classnames";
import { Text, View } from "react-native";

const CountNumber = ({
  bg_color,
  color,
  count = 0,
}: {
  bg_color?: string;
  color?: string;
  count?: string | number;
}) => {
  return (
    <View
      style={[
        tw`w-6 h-6 rounded-full items-center`,
        { backgroundColor: bg_color ? bg_color : "white" },
      ]}
    >
      <Text
        style={[
          tw`text-base font-bold`,
          { color: color ? color : "#9C0A35", transform: "translateY(-2px)" },
        ]}
      >
        {count}
      </Text>
    </View>
  );
};

export default CountNumber;