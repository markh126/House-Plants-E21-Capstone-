import { Button } from 'react-bootstrap';
import PlantCard from '../components/plantCard';

function Home() {
  return (
    <>
      <Button href="/plants/new">Add a Plant</Button>
      <PlantCard />
    </>
  );
}

export default Home;
