// bottom modal uchun type
export interface IBottomModalProps {
  children: JSX.Element; // modal body qismi
  toggleBottomModal: () => void; // modal ochib yopish un function
  isBottomModal: boolean; // modal ochib yopish un state
}

//centered modal
export interface ICenteredModalProps {
  children: JSX.Element; //modal body qismi
  btnWhiteText: string; // oq btn uchun text
  btnRedText: string; // qizil btn uchun text
  isFullBtn: boolean; // btn lar row yoki col joylashishi uchun trueOrfalse
  isModal: boolean; // modal ochish uchin state uzgaruvchi
  toggleModal: () => void; // modalni ochib yopish uchun function m: => const toggleModal = () => setIsModal(!isModal);
  onConfirm?: () => void; //tasdiqlash uchun function
  oneBtn?: boolean
}
