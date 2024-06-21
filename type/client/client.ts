export interface Client {
    isClientModal: boolean;
    setIsClientModal: (val: boolean) => void;
    selectedClientList: number[];
    setSelectedClientList: (val: any) => void
}

export interface ClientData {
    id: number;
    name: string;
    phone: string;
    image: string;
}

export interface ClientItemProps {
    client: ClientData;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

//vaqtinchalik data
export const clientsData: ClientData[] = [
    {id: 1, name: 'Гузаль Шерматова', phone: '+998 93 123-45-67', image: 'https://via.placeholder.com/150'},
    {id: 2, name: 'Севара Юнусова', phone: '+998 93 171-63-80', image: 'https://via.placeholder.com/150'},
    {id: 3, name: 'Ноила Азизова', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 4, name: 'Шахло Акбарова', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
    {id: 5, name: 'Максуд Акбаров', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 6, name: 'Нодир Расулов', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
];