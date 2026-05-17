import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Download, X } from 'lucide-react';
import { getAllCertificates, createCertificate, updateCertificate, deleteCertificate } from '../api/certificateApi';
import type { Certificate } from '../api/certificateApi';

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    contactNo: '',
    batchNo: '',
    grade: '',
    status: 'Verified' as 'Verified' | 'Not Verified' | 'Revoked'
  });

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCertificates();
      if (response.success) {
        setCertificates(response.certificates);
      }
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
      setError('Failed to load certificates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openAddModal = () => {
    setEditingCert(null);
    setFormData({
      name: '',
      rollNo: '',
      contactNo: '',
      batchNo: '',
      grade: '',
      status: 'Verified'
    });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      rollNo: cert.rollNo,
      contactNo: cert.contactNo,
      batchNo: cert.batchNo,
      grade: cert.grade,
      status: cert.status
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        const res = await deleteCertificate(id);
        if (res.success) {
          setCertificates(certificates.filter(c => c.certificateId !== id));
        }
      } catch (err) {
        console.error('Failed to delete:', err);
        alert('Failed to delete certificate');
      }
    }
  };

  const handleDownload = (cert: Certificate) => {
    // Dummy download action or open new tab if PDF url is available
    if (cert.qrCode) {
      const link = document.createElement('a');
      link.href = cert.qrCode;
      link.download = `QR_${cert.certificateId}.png`;
      link.click();
    } else {
      alert(`Downloading PDF for ${cert.name} (${cert.certificateId})`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (editingCert) {
        // Edit mode
        const res = await updateCertificate(editingCert.certificateId, formData);
        if (res.success) {
          setCertificates(certificates.map(c => 
            c.certificateId === editingCert.certificateId 
              ? { ...c, ...formData }
              : c
          ));
          setIsModalOpen(false);
        }
      } else {
        // Add mode
        const res = await createCertificate(formData);
        if (res.success) {
          setCertificates([res.certificate, ...certificates]);
          setIsModalOpen(false);
        }
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Certificate Management</h2>
          <p className="text-gray-500 mt-1">View, add, edit, and manage student certificates.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={18} className="mr-2" />
          Add Certificate
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, ID, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm outline-none bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Certificate ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Roll No</th>
                <th className="px-6 py-4 font-medium">Batch</th>
                <th className="px-6 py-4 font-medium">Grade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && certificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Loading certificates...
                  </td>
                </tr>
              ) : filteredCertificates.map((cert) => (
                <tr key={cert.certificateId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 text-xs">{cert.certificateId.substring(0, 8)}...</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{cert.name}</td>
                  <td className="px-6 py-4 text-gray-600">{cert.rollNo}</td>
                  <td className="px-6 py-4 text-gray-600">{cert.batchNo}</td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{cert.grade}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'Verified' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end space-x-3">
                    <button onClick={() => handleDownload(cert)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Download QR/PDF">
                      <Download size={18} />
                    </button>
                    <button onClick={() => openEditModal(cert)} className="text-gray-400 hover:text-amber-600 transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(cert.certificateId)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredCertificates.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">
                {editingCert ? 'Edit Certificate' : 'Generate New Certificate'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. CS2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="text"
                    required
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. 9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    required
                    name="batchNo"
                    value={formData.batchNo}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. BATCH-A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input
                    type="text"
                    required
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. A+"
                  />
                </div>
                
                {editingCert && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange as any}
                      className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="Verified">Verified</option>
                      <option value="Not Verified">Not Verified</option>
                      <option value="Revoked">Revoked</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:bg-blue-400"
                >
                  {isLoading ? 'Processing...' : (editingCert ? 'Save Changes' : 'Generate Certificate')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
