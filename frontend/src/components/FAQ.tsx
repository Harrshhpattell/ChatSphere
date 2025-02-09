import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is ChatSphere free to use?",
    answer:
      "ChatSphere offers a free tier with basic features. We also have paid plans for users who need advanced functionality.",
  },
  {
    question: "How secure are my chats?",
    answer:
      "ChatSphere uses end-to-end encryption for all messages, ensuring that only you and your intended recipients can read them.",
  },
  {
    question: "Do you offer business solutions?",
    answer:
      "Yes, we offer enterprise-level solutions with custom features, dedicated support, and API access for businesses.",
  },
]

const FAQ = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ