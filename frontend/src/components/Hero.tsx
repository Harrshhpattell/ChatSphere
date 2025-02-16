import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatImage from "@/assets/Landing_page.png"

const Hero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Revolutionize Your Conversations with AI-Powered Chat
            </h1>
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
              Instant, Secure & AI-driven Messaging—Anytime, Anywhere.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                See How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg -rotate-3">
                {/* Placeholder for 3D Chat UI Mockup */}
                <img 
                alt="Chat"
                src={ChatImage}
                className="object-contain rounded"
                />
                {/* <div className="h-full flex items-center justify-center text-2xl font-bold">3D Chat UI Mockup</div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero