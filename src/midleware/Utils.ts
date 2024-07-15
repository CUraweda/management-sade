export interface WasteCollectionResponse {
  status: boolean;
  code: number;
  message: string;
  data: WasteCollectionData;
}

export interface WasteCollectionData {
  result: WasteCollectionItem[];
  page: number;
  limit: number;
  totalRows: number;
  totalPage: number;
}

export interface WasteCollectionItem {
  id: number;
  student_class_id: number;
  collection_date: string;
  day_id: number;
  waste_type_id: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
  studentclass: StudentClass;
  wastetype: WasteType;
}

export interface StudentClass {
  id: number;
  class_id: number;
  student: Student;
}

export interface Student {
  nis: string;
  full_name: string;
  class: string;
}

export interface WasteType {
  id: number;
  code: string;
  name: string;
}

export interface WasteTypeDropdownResponse {
  status: boolean;
  code: number;
  message: string;
  data: WasteTypeDropdownCollectionData;
}

export interface WasteTypeDropdownCollectionData {
  result: WasteTypeData[];
}

export interface WasteTypeData {
  id: number;
  code: number;
  name: string;
}

export interface ClassDropdownResponse {
  status: boolean;
  code: number;
  message: string;
  data: ClassDropdownCollectionData;
}

export interface ClassDropdownCollectionData {
  result: ClassData[];
}

export interface ClassData {
  id: number;
  level: number;
  class_name: string;
  book_target: number;
  waste_target: number;
  createdAt: string;
  updatedAt: string;
}

export interface JenisSampah {
  status: string;
  code: number;
  message: string;
  data: BankSampah;
}

interface BankSampah {
  result: ResultSampah[];
}

export interface ResultSampah {
  id: string;
  code: string;
  name: string;
}

export interface CreateJenisSampah {
  code: string;
  name: string;
}

export interface LoginResponse {
  data: {
    token: string;
    role_id: number;
  };
  tokens: {
    access: {
      token: string;
    };
  };
}

export interface GetSiswaByNis {
  status: string;
  code: number;
  message: string;
  data: DataSiswa;
}

export interface DataSiswa {
  id: number;
  nis: string;
  nisn: string;
  full_name: string;
}

export interface GetInclassStudent {
  status: string;
  code: number;
  message: string;
  data: InclassStudent[];
}

export interface InclassStudent {
  id: number;
  student_id: number;
  class_id: number;
  student: DataSiswa;
}

export interface GetClass {
  status: string;
  code: number;
  message: string;
  data: Class;
}
export interface GetAllClass {
  status: string;
  code: number;
  message: string;
  data: ResultAllClass;
}

export interface ResultAllClass {
  result: Class[];
}


export interface Class{
    id: number;
    level: string;
    class_name: string;
    waste_target: string;
}

export interface CreateRekapSampah {
    student_class_id : number | string;
    collection_date : Date;
    waste_type_id : number | string;
    weight: number
}
