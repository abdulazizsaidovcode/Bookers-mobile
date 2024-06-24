import tw from "tailwind-react-native-classnames";
import {Text, TouchableOpacity} from "react-native";
import CountNumber from "@/components/clients/count-number";
import clientStore from "@/helpers/state_managment/client/clientStore";

const ClientsBtn = ({countOrIcon, icon, name, clicks}: {
    countOrIcon: boolean,
    icon?: JSX.Element,
    name: string,
    clicks?: () => void
}) => {
    const {statusData} = clientStore()
    let counts;
    if (statusData) counts = statusData.allClient + statusData.fromTheAddressBook
    return (
        <TouchableOpacity
            onPress={clicks}
            activeOpacity={.8}
            style={[tw`flex-row items-center rounded-lg py-2 px-5`, {backgroundColor: '#9C0A35'}]}
        >
            {countOrIcon
                ? <>
                    <Text style={tw`text-white text-base font-semibold mr-2`}>{name}</Text>
                    <CountNumber count={counts && counts}/>
                </>
                : <>
                    {icon}
                    <Text style={tw`text-white text-base font-semibold ml-2`}>{name}</Text>
                </>
            }
        </TouchableOpacity>
    );
};

export default ClientsBtn;