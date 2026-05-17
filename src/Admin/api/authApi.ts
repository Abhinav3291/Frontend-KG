import adminAxios from './adminAxios';

export const loginAdmin = async (email: string, password: string) => {
  const response = await adminAxios.post('/admin/auth/login', { email, password });
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await adminAxios.post('/admin/auth/logout');
  return response.data;
};
