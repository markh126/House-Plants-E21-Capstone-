import { Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSKj-rcawftngt1iMiQf7EFos3RHnmKN0yvD4BkXTJ6VVe8s6wwyLYLCBiOf9YfHQIZyotJRrk3RSYxIqA" />
      <Card.Body>
        <Card.Title>Monstera</Card.Title>
        <Card.Text>
          Plant Info
        </Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

export default Home;
