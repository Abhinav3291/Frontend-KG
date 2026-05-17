import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Download, Copy, Calendar, User, Award, Hash, Check, AlertCircle } from 'lucide-react';

interface CertificateData {
  certificateId: string;
  name: string;
  rollNo: string;
  contactNo: string;
  batchNo: string;
  grade: string;
  status: 'Verified' | 'Not Verified' | 'Revoked';
  qrCode?: string;
  createdAt: string;
}

const API_BASE_URL = "https://server-kg.onrender.com";

const VerifyCertificate = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`${API_BASE_URL}/api/certificate/verify/${id}`);
        if (res.data.success) {
          setCertificate(res.data.certificate);
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.response?.data?.message || 'Failed to verify certificate');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCertificate();
    }
  }, [id]);

  const handleCopy = () => {
    if (certificate?.certificateId) {
      navigator.clipboard.writeText(certificate.certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (certificate?.qrCode) {
      const link = document.createElement('a');
      link.href = certificate.qrCode;
      link.download = `QR_${certificate.certificateId}.png`;
      link.click();
    } else {
      alert('PDF Download feature coming soon!');
    }
  };

  // State Variations
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"
        />
        <h2 className="text-xl font-medium text-slate-700">Verifying Certificate...</h2>
        <p className="text-slate-500 mt-2 text-sm">Please wait while we securely fetch the records.</p>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100"
        >
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <XCircle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Certificate</h1>
          <p className="text-slate-500 mb-8">{error || 'This certificate could not be found or is invalid.'}</p>
          <Link to="/" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-md">
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  const isVerified = certificate.status === 'Verified';
  const themeColor = isVerified ? 'emerald' : 'red';
  const ThemeIcon = isVerified ? CheckCircle : AlertCircle;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header / Status Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-3xl p-8 shadow-lg border-t-4 border-${themeColor}-500 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden`}
        >
          <div className={`absolute -right-16 -top-16 w-64 h-64 bg-${themeColor}-50 rounded-full blur-3xl opacity-50 pointer-events-none`} />
          
          <div className="flex items-center gap-6 z-10">
            <div className={`w-20 h-20 rounded-2xl bg-${themeColor}-50 text-${themeColor}-600 flex items-center justify-center shadow-inner shrink-0`}>
              <ThemeIcon size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {isVerified ? 'Certificate Verified' : 'Certificate Revoked'}
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                {isVerified ? 'This is a valid and authentic credential.' : 'This credential has been revoked and is no longer valid.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium shadow-sm"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              {copied ? 'Copied' : 'Copy ID'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-md"
            >
              <Download size={18} />
              Save PDF
            </button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-8"
          >
            {/* Student Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                {/* <User size={120} /> */}
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <User size={16} /> Credential Holder
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Student Name</p>
                  <p className="text-xl font-bold text-slate-900">{certificate.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Roll Number</p>
                  <p className="text-lg font-semibold text-slate-800">{certificate.rollNo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Batch Number</p>
                  <p className="text-lg font-semibold text-slate-800">{certificate.batchNo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Achieved Grade</p>
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-lg">
                    {certificate.grade}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Meta */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Award size={16} /> Certification Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Hash className="text-slate-400 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Certificate ID</p>
                    <p className="font-mono text-slate-900 font-medium break-all">{certificate.certificateId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Calendar className="text-slate-400 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Issue Date</p>
                    <p className="text-slate-900 font-medium">
                      {new Date(certificate.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Organization Info */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src="/kg_logo.jpg" alt="KG Logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">KG Training & Placements</h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">Official Issuing Authority</p>
              
            </div>

            {/* QR Preview */}
            {certificate.qrCode && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Scan to Verify</p>
                <div className="bg-white p-2 rounded-2xl border border-slate-100 inline-block shadow-sm">
                  <img src={certificate.qrCode} alt="Verification QR" className="w-32 h-32 object-contain" />
                </div>
              </div>
            )}
            
          </motion.div>
        </div>

        <div className="text-center pt-8 border-t border-slate-200/50">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            KG Training and Placements &copy; {new Date().getFullYear()}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VerifyCertificate;
