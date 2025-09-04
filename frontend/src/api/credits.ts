// Mock API endpoint for credits
export const getCredits = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    balance: 50,
    history: [
      {
        id: '1',
        date: '2025-01-15',
        activity: 'Rice field monitoring',
        credits: 10,
        type: 'rice'
      },
      {
        id: '2',
        date: '2025-01-15',
        activity: 'Tree planting verification',
        credits: 15,
        type: 'trees'
      },
      {
        id: '3',
        date: '2025-01-10',
        activity: 'Sustainable farming practices',
        credits: 8,
        type: 'other'
      }
    ]
  };
};