interface LocationInputProps {
    label?: string;
    labalVisible?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    type?: "default" | "numeric" | "email-address" | "phone-pad";
}