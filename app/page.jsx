import LandingPage from '@components/LandingPage';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const session = await getServerSession();
  console.log(session)
  return (
    <div>
      {
        session ?
        <div>
          Hello
        </div>
        :
        <LandingPage />
      }
    </div>
  )
}

export default Home