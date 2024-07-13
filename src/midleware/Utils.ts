export interface RekapSampah {
  status: string;
  code: number;
  message: string;
  data: GetRekapSampah;
}

interface GetRekapSampah {
  result: DataRekapSampah;
  page: number;
  limit: number;
  totalRows: number;
  totalPage: number;
}

export interface DataRekapSampah {
  id: number;
  name: string;
  class_name: string;
  assignment_date: string | null;
  createdAt: string;
  updatedAt: string;
  class_id: number;
  employee_id: number;
  employee: Employee;
  class: Class;
}

export interface Employee {
  id: number;
  full_name: string;
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

export interface Class {
  id: number;
  level: string;
  class_name: string;
  waste_target: string;
}

export interface CreateRekapSampah {
  student_class_id: number | string;
  collection_date: Date;
  waste_type_id: number | string;
  weight: number;
}
