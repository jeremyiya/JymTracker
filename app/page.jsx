import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession();
  console.log(session);
  return (
    <div>Home
      <h1>Hello, </h1>
    </div>
  )
}

export default Home