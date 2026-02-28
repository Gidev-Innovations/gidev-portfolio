import FaqsItem from "./FaqsItem.tsx";
import { motion } from "framer-motion";
import {divParentVariants, divChildHeaderVariants} from "./Services.tsx";

interface Faq {
    question: string;
    answer: string;
}

const Faqs = () => {
    const faqs = [
        {
            question: "How fast can Twist deliver business designs?",
            answer: "This section is designed to provide businesses with comprehensive integration solution that streamline their insights operations improve productivity Start with support and build on your own."
        },
        {
            question: "Are revisions available for provided designs?",
            answer: "Streamline your business operations and boost productivity with a comprehensive integration solution. Start with expert support and grow independently at your pace."
        },
        {
            question: "What factors influence pixelta pricing strategy?",
            answer: "Empower your business with tailored integration solutions that simplify insights and enhance efficiency. Begin with dedicated support and expand on your terms."
        },
        {
            question: "Can Pixel assist with ongoing design requirements for my business?",
            answer: "Unlock seamless operations and higher productivity through a robust integration platform. Start strong with professional support and scale confidently."
        },
        {
            question: "Do you offer refunds?",
            answer: "Simplify insights, improve workflows, and drive productivity with our all-in-one integration solution. Begin your journey with reliable support and scale effortlessly."
        }
    ] as Faq []

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            variants={divParentVariants}
            className="space-y-8">
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={divChildHeaderVariants}
                className=" lg:w-1/3 w-3/4 mx-auto">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <p>FAQ</p>
                    <p className="lg:text-5xl text-2xl text-center leading-none">Vital Inquiries Responded for You</p>
                    <span className="text-stone-900 text-nowrap">Customer Testimonials Speak Volumes.</span>
                </div>
            </motion.div>
            {/*The questions*/}
            {
                faqs.map((faq: Faq)=> <FaqsItem question={faq.question} answer={faq.answer} />)
            }


        </motion.div>
    )
}

export default Faqs;
