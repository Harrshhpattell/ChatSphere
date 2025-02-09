import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const CTA = () => {
  return (
    <section className="py-16">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to experience next-gen messaging?</h2>
        <div className="flex justify-center space-x-4">
          <Button size="lg">Sign Up for Free</Button>
          <Button variant="outline" size="lg">
            Request a Demo
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
  )
}

export default CTA