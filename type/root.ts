import {ClientAddressBook} from "@/type/client/client";

export type RootStackParamList = {
    'index': undefined;
    'settings': undefined;
    'settings-locations-main': undefined;
    'settings-gallery-main': undefined;
    'settings-gallery': undefined;
    'settings-locations': undefined;
    '(auth)/auth': undefined;
    '(settings)/(settings-location)/settings-locations-main': undefined;
    '(settings)/(settings-location)/settings-locations': undefined;
    '(settings)/(settings-gallery)/settings-gallery': undefined;
    '(chat)/(communicatie)/chatDetails': any;
    '(free)/(client)/main': undefined | string;
    '(free)/(client)/client-list': undefined | string;
    '(free)/(client)/address-book': undefined | string;
    '(free)/(client)/creating-client': undefined | string;
    '(free)/(client)/updating-address-book': { client: ClientAddressBook };
    '(tabs)': undefined | string;
    '(welcome)/Welcome': undefined | string;
    '(profile)/(tariff)/tariff': undefined;
    '(profile)/(client)/components/AllClients': undefined;
    '(settings)/(settings-gallery)/gallery-details': any;
    '(standart)/client/standard-main': undefined | string;
    '(standart)/client/not-visiting': undefined | string;
  };
  