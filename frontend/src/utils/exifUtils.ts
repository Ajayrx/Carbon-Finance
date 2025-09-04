// EXIF data extraction utilities
export interface ExifData {
  latitude?: number;
  longitude?: number;
  timestamp?: Date;
  camera?: string;
}

export const extractExifData = async (file: File): Promise<ExifData> => {
  return new Promise((resolve) => {
    // For demo purposes, we'll simulate EXIF extraction
    // In a real app, you'd use a library like exif-js or piexifjs
    
    setTimeout(() => {
      // Mock EXIF data - in reality this would come from the actual image
      const mockExifData: ExifData = {
        latitude: 20.2961 + (Math.random() - 0.5) * 0.1, // Random location near Bhubaneswar
        longitude: 85.8245 + (Math.random() - 0.5) * 0.1,
        timestamp: new Date(),
        camera: 'Smartphone Camera'
      };
      
      resolve(mockExifData);
    }, 500);
  });
};

export const formatCoordinates = (lat: number, lng: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
};