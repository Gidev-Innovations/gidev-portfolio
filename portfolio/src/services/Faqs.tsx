import FaqsItem from "./FaqsItem.tsx";
import { motion } from "framer-motion";
import {divParentVariants, divChildHeaderVariants} from "./Services.tsx";
import { faqs, type Faq } from "../data/faqs";

const Faqs = () => {
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
                    <p className="lg:text-5xl text-2xl text-center leading-none">Essential FAQs Answered for You</p>
                    <span className="text-stone-900 text-center">Everything you need to know before we start building together.</span>
                </div>
            </motion.div>
            {/*The questions*/}
            {
                faqs.map((faq: Faq)=> <FaqsItem key={faq.question} question={faq.question} answer={faq.answer} />)
            }


        </motion.div>
    )
}

export default Faqs;
