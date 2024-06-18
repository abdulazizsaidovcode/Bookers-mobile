// main button type
export interface IButton {
    title: string;
    backgroundColor: string;
    textColor: string;
    onPress?: () => void;
};