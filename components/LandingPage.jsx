import Link from 'next/link'
import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className='landing_page'>
      <div className="green_deco_1"></div>
      <div className="green_deco_2"></div>
      <Image 
        src={'/media/jpg/cool_guy.jpg'}
        width={600}
        height={400}
        alt='Shirtless Athletic Man'
        className='landing_img_1'
        />
      <Image 
        src={'/media/jpg/stairs_guy.jpg'}
        width={640}
        height={958}
        alt='Athletic Man Going Up Stairs'
        className='landing_img_2'
        />
      <div className="landing_container">
        <h1>Welcome to JymTracker</h1>
        <p> Your Ultimate Workout Companion! Seamlessly plan, track, and achieve your fitness goals with personalized workouts, progress analytics, and expert guidance</p>
        <Link href={'/register'}>Join JymTracker for Free</Link>
      </div>
    </div>
  )
}

export default LandingPage