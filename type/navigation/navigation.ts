export interface INavigationProps {
    name: string;
    deleteIcon?: boolean;
    all?: boolean;
    toggleModal?: () => void;
    delOnPress?: () => void;
    addOnPress?: () => void;
    editOnPress?: () => void;
    clicks?: () => void;
    navigate?: () => void
}