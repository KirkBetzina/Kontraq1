import React, { useState, useEffect } from 'react';
import { fetchActiveAds, trackAdClick } from '@/lib/api';
import { Advertisement } from '@/types';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className }) => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadAds = async () => {
      try {
        // Use mock data for now until we have real ads
        // In production, this would use: const loadedAds = await fetchActiveAds();
        import('@/data/mockData').then(({ mockAds }) => {
          setAds(mockAds);
        });
      } catch (error) {
        console.error('Failed to load advertisements:', error);
      }
    };

    loadAds();
  }, []);

  useEffect(() => {
    // Rotate ads every 8 seconds if there are multiple ads
    if (ads.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [ads.length]);

  const handleAdClick = async (ad: Advertisement) => {
    try {
      // In production, this would use: await trackAdClick(ad.id);
      console.log('Ad clicked:', ad.businessName);
      window.open(ad.linkUrl, '_blank');
    } catch (error) {
      console.error('Failed to track ad click:', error);
      // Still open the link even if tracking fails
      window.open(ad.linkUrl, '_blank');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-md p-2 z-50 ${className}`}>
      <div className="flex items-center justify-between">
        <div 
          className="flex-1 flex items-center cursor-pointer" 
          onClick={() => currentAd && handleAdClick(currentAd)}
        >
          {currentAd?.imageUrl ? (
            <img 
              src={currentAd.imageUrl} 
              alt={currentAd.businessName} 
              className="h-10 w-auto mr-2 object-contain"
            />
          ) : (
            <div className="h-10 w-32 bg-gray-200 mr-2 flex items-center justify-center text-xs text-gray-500">
              Ad Image
            </div>
          )}
          <div className="text-sm">
            <p className="font-medium">{currentAd?.businessName}</p>
            <p className="text-xs text-gray-500">Special offer for subcontractors</p>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 p-1"
          aria-label="Close advertisement"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
