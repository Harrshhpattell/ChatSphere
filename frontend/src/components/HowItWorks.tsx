import { motion } from "framer-motion"
import { UserPlus, MessageSquare, Sparkles } from "lucide-react"

const steps = [
  { icon: UserPlus, title: "Create an Account" },
  { icon: MessageSquare, title: "Start a Chat" },
  { icon: Sparkles, title: "Get AI Insights" },
]

const HowItWorks = () => {
  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <step.icon className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            {index < steps.length && (
              <div className="hidden md:block w-24 h-1 bg-blue-200 dark:bg-blue-700 mt-8 transform rotate-90 md:rotate-0"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default HowItWorks