import FullListbanner from '../components/FullList/FullListbanner';
import FullListinfo from '../components/FullList/FullListinfo';

const FullList = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Map Banner Section — starts below fixed navbar */}
      <FullListbanner />

      {/* Listings Info Section — flush below the map */}
      <FullListinfo />
    </div>
  );
};

export default FullList;
