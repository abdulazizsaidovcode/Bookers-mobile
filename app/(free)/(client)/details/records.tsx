import {View, ScrollView, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {RouteProp, useRoute} from '@react-navigation/native'
import Buttons from "@/components/(buttons)/button";
import CalendarGraffic from "@/app/(free)/(work-grafic)/calendar";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/records'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records'>;

const Records = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {record} = route.params;

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <CalendarGraffic/>
                    </View>
                    <View style={[tw`pb-5`]}>
                        <Buttons
                            title={`Записать`}
                            isDisebled
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Records;
