
export interface ServicesProps {
    title: string;
    onPress?: () => void;
    onToggle?: (label: string | null, isnewChecked: boolean | null) => void;
    isRadioButton?: boolean;
    id?: string;
    label?: string
}