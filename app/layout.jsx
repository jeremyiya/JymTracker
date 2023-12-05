import '@styles/site.css';
import Nav from '@components/Nav.jsx'

export const metadata = {
    title: "Jym Tracker",
    description: "Workout and Fitness Tracking App"
}

const RootLayout = ({children}) => {

  return (
    <html lang="en">
        <body className="">
          <Nav />
          <main>
            {children}
          </main>
        </body>
    </html>
  )
}

export default RootLayout