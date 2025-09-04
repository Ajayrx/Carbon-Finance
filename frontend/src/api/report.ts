// Mock API endpoint for report download
export const downloadReport = async () => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    downloadUrl: '/reports/mrv-report.pdf',
    message: 'Report generated successfully'
  };
};