import Link from 'next/link';
import PlantCard from '../components/plantCard';

function Home() {
  return (
    <>
      <Link className="btn btn-primary" href="/plants/new" role="button">New Plant</Link>
      <PlantCard />
    </>
  );
}

export default Home;
