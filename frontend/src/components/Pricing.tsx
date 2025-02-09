import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    features: ["Basic chat functionality", "Limited AI responses", "1 GB storage"],
  },
  {
    name: "Pro",
    price: { monthly: 9.99, yearly: 99.99 },
    features: ["Advanced AI-powered chat", "Unlimited storage", "Priority support"],
  },
  {
    name: "Enterprise",
    price: { monthly: 49.99, yearly: 499.99 },
    features: ["Custom AI models", "Dedicated account manager", "API access"],
  },
]

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="flex justify-center items-center mb-8">
        <span className="mr-2">Monthly</span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className="ml-2">Yearly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold mb-4">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-sm font-normal">{isYearly ? "/year" : "/month"}</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Pricing