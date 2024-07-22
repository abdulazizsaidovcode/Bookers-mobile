import { AllClient, ClientAddressBook } from "@/type/client/client";

export type RootStackParamList = {
  'index': undefined;
  'settings': undefined;
  '(free)/(work-grafic)/workMain': undefined;
  '(welcome)/welcome': undefined;
  '(notifications)/(pages)/remind-about-appointment': undefined;
  '(notifications)/(pages)/cancel-recording': undefined;
  '(notifications)/(pages)/request-window': undefined;
  '(notifications)/(pages)/changing-an-entry': undefined;
  '(notifications)/(pages)/request-feedback': undefined;
  '(standart)/(services)/(myServices)/myServices': undefined;
  'settings-gallery': undefined;
  'settings-locations': undefined;
  '(free)/(help)/help': undefined;
  '(notifications)/notification': undefined;
  '(auth)/auth': undefined;
  '(auth)/(register)/(greetings)/greetingFirst': undefined;
  '(auth)/(register)/(greetings)/greetingSecond': undefined;
  '(auth)/(register)/(greetings)/greetingThird': undefined;
  '(standart)/(onlineBooking)/onlineBooking': undefined;
  '(notifications)/notifications': undefined;
  '(settings)/(settings-location)/settings-locations-main': undefined;
  '(settings)/(settings-location)/settings-locations': undefined;
  '(standart)/client/standard-main': undefined;
  '(notifications)/(pages)/messengers': undefined;
  '(settings)/(settings-gallery)/settings-gallery': undefined;
  '(settings)/(settings-gallery)/settings-gallery-main': undefined;
  '(standart)/client/stopped-visiting': undefined;
  '(standart)/client/not-visiting': undefined;
  '(chat)/(communicatie)/chatDetails': any;
  '(free)/(client)/main': undefined | string;
  '(free)/(client)/all-client': undefined | string;
  '(free)/(client)/client-list': undefined | string;
  '(free)/(client)/address-book': undefined | string;
  '(free)/(client)/creating-client': undefined | string;
  '(free)/(client)/updating-address-book': { client: ClientAddressBook };
  '(tabs)': undefined | string;
  'app/(client)/(masters)/masters': undefined | string;
  '(client)/(map)/(recent-masters)/recent-masters-by-category': undefined;
  '(client)/(map)/(recent-masters)/recent-masters': undefined;
  '(free)/(client)/details/detail-main': { infoClient: AllClient };
  '(free)/(client)/details/records': { record: AllClient | any };
  '(free)/(client)/details/history/history-details': { historyData: any };
  '(free)/(client)/details/records-information': { orderID: string };
  '(free)/(client)/details/history/upcoming-history': { clientID: string };
  '(free)/(client)/details/history/past-history': { clientID: string };
  '(free)/(client)/details/history/canceled-history': { clientID: string };
  '(welcome)/Welcome': undefined | string;
  '(profile)/(tariff)/tariff': undefined;
  'category': any;
  '(standart)/(services)/(expertise)/expertise': any;
  '(profile)/(client)/components/AllClients': undefined;
  '(settings)/(settings-gallery)/gallery-details': any;
  '(standart)/(client)/standard-main': undefined | string;
  '(Schedule)/Schedule': string | undefined;
  '(free)/(work-grafic-edit)/workMain': undefined
  '(free)/(work-grafic-edit)/workGraffic': undefined
  '(free)/(work-grafic-edit)/workTime': undefined
  '(free)/(work-grafic)/workGraffic': undefined
  '(free)/(work-grafic)/workTime': undefined
  '(profile)/(settings)/(childSettings)/(Personaldata)/PersonalData': undefined
  '(auth)/(login)/number-create': undefined
  '(auth)/(register)/(roleSelection)/masterORclient': undefined
  '(auth)/checkSendMessage': undefined
  '(auth)/(setPinCode)/installPin': undefined
  '(auth)/(register)/(roleSelection)/switchPage': undefined
  '(auth)/(register)/(masterInformation)/getNameSurname': undefined
  '(auth)/(register)/(agreements)/getAgrement': undefined
  '(auth)/(setPinCode)/checkInstalledPin': undefined
   "(client)/(dashboard)/dashboard": undefined
   '(client)/(dashboard)/(health)/health': undefined
   '(client)/(profile)/profile': undefined
   '(client)/(profile)/(settings)/settings': undefined
   '(client)/(profile)/(notification)/notification': undefined
   '(client)/(profile)/(profileEdit)/profileEdit': undefined
   '(client)/(profile)/(profileEdit)/(editPages)/editPage': undefined
   '(profile)/(settings)/(childSettings)/(profileEdit)/(editPages)/editPage': undefined
   '(client)/(profile)/(orderHistory)/orderHistory': undefined
  '(auth)/(register)/(clientInformations)/getNameSurname': undefined
  '(client)/(profile)/(payment)/payment': undefined
  '(client)/(profile)/(card)/card': undefined
  '(client)/(profile)/(profileEdit)/profileScreen' : undefined
  '(profile)/(settings)/(childSettings)/(profileEdit)/profileScreen' : undefined
  '(client)/(profile)/(settings)/(settingPage)/settingPage' : undefined
  '(profile)/(settings)/(childSettings)/(profileEdit)/profileEdit' : undefined
  "(free)/(work-grafic-edit)/workTimeDetail": undefined
};
