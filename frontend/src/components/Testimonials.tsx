import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "/avatar1.jpg",
    content: "ChatSphere has transformed our team communication. The AI-powered features are a game-changer!",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/avatar2.jpg",
    content: "I love how seamlessly ChatSphere syncs across all my devices. It's made collaboration so much easier.",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Writer",
    avatar: "/avatar3.jpg",
    content: "The end-to-end encryption gives me peace of mind when discussing sensitive topics with clients.",
  },
]

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }, [])
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="relative h-64">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Card className="h-full">
              <CardContent className="h-full flex flex-col justify-center items-center text-center p-6">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                  <AvatarFallback>{testimonials[currentIndex].name[0]}</AvatarFallback>
                </Avatar>
                <p className="mb-4 italic">{testimonials[currentIndex].content}</p>
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[currentIndex].role}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </section>
  )
}

export default Testimonials