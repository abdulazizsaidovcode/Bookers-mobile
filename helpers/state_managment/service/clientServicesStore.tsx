interface BackendService {
    active: boolean;
    attachmentId: string | null;
    category: {
      attachmentId: string | null;
      categoryFatherId: string | null;
      categoryFatherName: string | null;
      id: string;
      isNew: boolean | null;
      message: string | null;
      name: string;
      statusCategory: string | null;
    };
    categoryId: string;
    description: string;
    genderId: number[];
    genderNames: string[];
    id: string;
    message: string | null;
    name: string;
    paymentPercent: number;
    paymentPrice: number;
    price: number;
    serviceStatus: string;
    serviceTime: number;
  }
  
  interface MappedService {
    type: string;
    price: number;
    img: string;
    description: string;
    subDescription: string;
    services?: string[];
  }
  
  const mapBackendDataToClientDetails = (data: BackendService[]): MappedService[] => {
    return data.map(service => ({
      type: service.category.name,
      price: service.price,
      img: '', 
      description: service.description,
      subDescription: service.message || '',
      services: []
    }));
  };
  