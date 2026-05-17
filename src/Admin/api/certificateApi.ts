import adminAxios from './adminAxios';

export interface Certificate {
  certificateId: string;
  name: string;
  rollNo: string;
  contactNo: string;
  batchNo: string;
  grade: string;
  status: 'Verified' | 'Not Verified' | 'Revoked';
  qrCode?: string;
  createdAt?: string;
}

export interface CertificateData {
  name: string;
  rollNo: string;
  contactNo: string;
  batchNo: string;
  grade: string;
  status: 'Verified' | 'Not Verified' | 'Revoked';
}

export const getAllCertificates = async () => {
  const response = await adminAxios.get('/certificate/all');
  return response.data;
};

export const createCertificate = async (data: CertificateData) => {
  const response = await adminAxios.post('/certificate/create', data);
  return response.data;
};

export const updateCertificate = async (id: string, data: CertificateData) => {
  const response = await adminAxios.put(`/certificate/update/${id}`, data);
  return response.data;
};

export const deleteCertificate = async (id: string) => {
  const response = await adminAxios.delete(`/certificate/delete/${id}`);
  return response.data;
};
