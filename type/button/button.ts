// main button type
export interface IButton {
    title: string;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    onPress?: () => void;
    bordered?: boolean;
    isDisebled?: boolean;
    icon?: any
}