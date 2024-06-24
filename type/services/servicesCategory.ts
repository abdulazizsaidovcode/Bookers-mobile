
export interface ServicesProps {
    title: string;
    onPress?: () => void;
    onToggle?: (label: string | null, isnewChecked: boolean | null) => void;
    isRadioButton?: boolean;
    id?: string
    isChecked?: boolean
    label?: string
    setId?: (val: string | undefined) => void,
    items?: any
}