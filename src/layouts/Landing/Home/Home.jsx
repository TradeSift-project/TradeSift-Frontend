import Hero from './components/Hero'
import DocumentWorkflow from './components/DocumentWorkflow'
import HowItWorks from './components/HowItWorks'
import SupportedDocuments from './components/SupportedDocuments'
import Integrations from './components/Integrations'
import Benefits from './components/Benefits'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { NavThemeProvider } from '../../../context/NavThemeContext'

const Home = () => {
  return (
    <NavThemeProvider>
      <div className="overflow-hidden bg-white">
        <Hero />
        <DocumentWorkflow />
        <HowItWorks />
        <SupportedDocuments />
        <Integrations />
        <Benefits />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </NavThemeProvider>
  )
}

export default Home
