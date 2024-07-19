export interface ProductType {
  id: string;
  fullName: string;
  clientStatus: string[];
  phone: string;
  serviceName: string;
  servicePrice: number;
  serviceHour: number;
  serviceMinute: number;
  orderDate: string;
  prePayment: number;
  paid: number;
  toPay: number;
  startTime: string;
  finishTime: string;
  notifyForHour: number;
  notifyForMinute: number;
  orderStatus: string;
  hallStatus: string;
  attachmentId: string;
}