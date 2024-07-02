import tw from "tailwind-react-native-classnames";
import {Text, TouchableOpacity} from "react-native";
import CountNumber from "@/components/clients/count-number";
import clientStore from "@/helpers/state_managment/client/clientStore";

const ClientsBtn = ({countOrIcon, icon, name, clicks, role, isActive}: {
    countOrIcon: boolean,
    icon?: JSX.Element,
    name: string,
    clicks?: () => void,
    role?: string,
    isActive?: boolean
}) => {
    const {statusData} = clientStore()
    let counts;
    if (statusData) {
        if (role === 'all') counts = +statusData.didNotVisit + +statusData.fromTheAddressBook + +statusData.stoppedVisiting + +statusData.newClient + +statusData.permanent;
        if (role === 'new') counts = +statusData.newClient;
        if (role === 'constant') counts = +statusData.permanent;
        if (role === 'free') counts = +statusData.allClient + +statusData.fromTheAddressBook;
    }

    return (
        <TouchableOpacity
            onPress={clicks}
            activeOpacity={.8}
            style={[tw`flex-row items-center rounded-lg py-2 ${role ? 'px-3' : 'px-5'}`, {
                backgroundColor: isActive ? '#21212E' : '#9C0A35',
                borderColor: isActive ? '#828282' : 'transparent',
                borderWidth: isActive ? 1 : 0,
            }]}
        >
            {countOrIcon
                ? <>
                    <Text style={[tw`text-base font-semibold mr-2`, {color: isActive ? '#828282' : '#fff'}]}>{name}</Text>
                    <CountNumber
                        count={counts && counts}
                        color={isActive ? 'white' : '#9C0A35'}
                        bg_color={isActive ? '#9C0A35' : 'white'}
                    />
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