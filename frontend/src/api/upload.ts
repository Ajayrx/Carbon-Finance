// Mock API endpoint for upload
export const uploadFarmData = async (data: {
  photos: string[];
  area: string;
  trees: string;
  geo?: { lat: string; lng: string };
}) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate credits based on area and trees
  const areaValue = parseFloat(data.area) || 1;
  const treesValue = parseInt(data.trees) || 1;
  const baseCredits = Math.floor(areaValue * 5 + treesValue * 2);
  
  return {
    success: true,
    newBalance: baseCredits,
    message: 'Farm data successfully processed and verified'
  };
};