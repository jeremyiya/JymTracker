import '@styles/site.css';
import '@public/fontawesome/css/fontawesome.css';
import '@public/fontawesome/css/brands.css';
import '@public/fontawesome/css/solid.css';
import Nav from '@components/Nav.jsx'
import { getServerSession } from 'next-auth';

export const metadata = {
    title: "Jym Tracker",
    description: "Workout and Fitness Tracking App"
}

const RootLayout = async ({children}) => {
  const session = await getServerSession();
  
  return (
    <html lang="en">
        <body className="">
          {
            session ? (<Nav loggedIn={true} />) : ( <Nav loggedIn={false} /> )
          }
          <main>
            {children}
          </main>
        </body>
    </html>
  )
}

export default RootLayout