export interface HomeCard {
    icon: React.ComponentType<{ style?: any }>;
    title?: string;
    description?: string;
    onPress?: () => void;
}