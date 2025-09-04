// Mock API endpoint for officials
export const createCertificate = async (data: {
  farmerName: string;
  farmerId: string;
  landId: string;
  cropType: string;
  landArea: string;
  treesPlanted: string;
  fertilizerUse: string;
  fertilizerAmount: string;
  irrigationPractices: string;
  visitDate: string;
  officerName: string;
  notes: string;
}) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate certificate ID and QR code
  const certificateId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const qrCode = `CC-${Date.now()}`;
  
  return {
    success: true,
    certificateId,
    qrCode,
    downloadUrl: `/certificates/${certificateId}.pdf`,
    message: 'Certificate generated successfully'
  };
};

export const getCertificates = async () => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    certificates: [
      {
        id: '1',
        certificateId: 'CERT-ABC123',
        farmerName: 'Rajesh Kumar',
        farmerId: 'FARM001',
        landId: 'LAND-001-2025',
        cropType: 'Rice (Paddy)',
        landArea: '2.5 acres',
        treesPlanted: '15 Mango trees',
        fertilizerUse: 'Organic compost',
        fertilizerAmount: '200kg',
        irrigationPractices: 'Alternate wetting and drying',
        visitDate: '2025-01-15',
        officerName: 'Officer Singh',
        dateIssued: '2025-01-15',
        status: 'active',
        qrCode: 'QR-ABC123'
      }
    ]
  };
};

export const verifyCertificate = async (certificateId: string) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock verification - in real app, check database
  if (certificateId.startsWith('CERT-')) {
    return {
      success: true,
      isValid: true,
      certificate: {
        certificateId,
        farmerName: 'Rajesh Kumar',
        farmerId: 'FARM001',
        landId: 'LAND-001-2025',
        cropType: 'Rice (Paddy)',
        landArea: '2.5 acres',
        treesPlanted: '15 Mango trees',
        fertilizerUse: 'Organic compost (200kg)',
        irrigationPractices: 'Alternate wetting and drying',
        visitDate: '2025-01-15',
        officerName: 'Officer Singh',
        dateIssued: '2025-01-15',
        status: 'active',
        qrCode: `QR-${certificateId}`
      }
    };
  } else {
    return {
      success: false,
      isValid: false,
      message: 'Certificate not found or invalid'
    };
  }
};