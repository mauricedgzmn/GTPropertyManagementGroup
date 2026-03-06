import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import FeaturedProperties from '../components/FeaturedProperties'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedProperties />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}

export default Home