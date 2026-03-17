import Faqs from './Faqs'
import {Microchip} from "lucide-react";
import {motion, type Variants} from "framer-motion";


export const divParentVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 100
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.3
        }
    }
}

export const divChildHeaderVariants: Variants = {
    hidden: {opacity: 0, y: 70},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 1.6, ease: [0.16, 1, 0.3, 1]},
    }


}

export const divChildHeroVariants: Variants = {
    hidden: {opacity: 0, y: 70},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5,  staggerChildren: 0.3},
    }
}

export const divChildCardVariants: Variants = {
    hidden: {opacity: 0, y: 70},
    show: {
        opacity: 1,
        y: 0,
        transition: {duration: 1.6, ease: [0.16, 1, 0.3, 1]},
    }

}
const Services = () => {

    const headerContainerVariantLeft: Variants = {
        hidden: {opacity: 0, y: 70},
        show: {
            opacity: 1,
            y: 0,
            transition: {duration: 1.6, ease: [0.16, 1, 0.3, 1]},
        }

    }
    const headerContainerVariantRight: Variants = {
        hidden: {opacity: 0, y: 70},
        show: {
            opacity: 1,
            y: 0,
            transition: {duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5},
        }
    }




    return (
        <div className="min-h-screen  w-10/12 mx-auto  space-y-32 xl:space-y-64 lg:space-y-32">
            <div className="lg:flex space-y-10 lg:space-x-8  lg:pt-64 md:pt-32 pt-24">
                <motion.header className="flex-1"
                               initial="hidden"
                               whileInView="show"
                               variants={headerContainerVariantLeft}
                >
                    <h1 className="xl:text-[64px] md:text-heading-3  text-center lg:text-start text-2xl mx-auto w-3/4  font-bold  leading-none text-black">
                        Powering Digital <span
                        className="bg-linear-to-r from-primary-500 to-secondary-500 bg-clip-text  text-transparent">Transformations</span> Across
                        Africa
                    </h1>
                </motion.header>

                {/* Right Section - Image Grid */}
                <motion.header className="flex-1"
                               initial="hidden"
                               whileInView="show"
                               variants={headerContainerVariantRight}
                >
                    <div className="grid grid-cols-3 gap-4">
                        {/* Top Left Image - spans 1 column */}
                        <div className="col-span-1 row-span-2">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                                alt="Team collaboration with books"
                                className="w-full md:h-64 h-32 object-cover rounded-2xl"
                            />
                        </div>

                        {/* Top Right Image - spans 2 columns */}
                        <div className="col-span-2">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=300&fit=crop"
                                alt="Whiteboard planning"
                                className="w-full md:h-64 h-32 object-cover rounded-2xl"
                            />
                        </div>

                        {/* Bottom Left Image - spans 1 column */}
                        <div className="col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                                alt="Handshake"
                                className="w-full md:h-48 h-28 object-cover rounded-2xl"
                            />
                        </div>

                        {/* Bottom Right Image - spans 2 columns */}
                        <div className="col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=300&fit=crop"
                                alt="Team meeting"
                                className="w-full md:h-48 h-28 object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                </motion.header>
            </div>
            {/*second section*/}
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={divParentVariants}
                className="space-y-12">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={divChildHeaderVariants}

                    className="flex flex-col lg:w-1/3  md:w-3/4 mx-auto  gap-4 justify-center items-center">
                    <div className="md:text-heading-2 text-heading-4 leading-none text-center">
                        <p>Software</p>
                        <p> Development Service</p>
                    </div>
                    <span className="text-[18px] text-center text-stone-900 ">We design and develop powerful digital solutions that help businesses operate smarter and scale faster</span>
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={divChildHeroVariants}
                    className="lg:w-10/12 xl:w-8/12 w-full mx-auto">
                    {/*services*/}
                    <div className="grid grid-cols-2 gap-18 lg:gap-32">
                        {/*website dev*/}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Website Development</p>
                            </div>
                            <span className="text-center flex">We build modern, responsive and high performance websites tailored to your business goals.</span>
                        </motion.div>
                        {/*    mobile apps*/}

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Mobile App Development</p>
                            </div>
                            <span className="text-center flex">We design and develop scalable mobile applications for Android and iOS</span>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Web Applications</p>
                            </div>
                            <span className="text-center flex">Custom web-based systems built for performance and scalability, enabling efficient operations, seamless user experience, and long-term digital growth.</span>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Business System
                                    Development</p>
                            </div>
                            <span className="text-center flex">We develop digital systems that automate and optimize operations</span>
                        </motion.div>


                        {/*    E- Commerce*/}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">E-Commerce Platforms</p>
                            </div>
                            <span className="text-center flex">Complete online selling solutions built to power digital commerce. We create high-performing  e-commerce platforms that streamline operations, enhance customer engagement and maximize sales opportunities</span>
                        </motion.div>

                        {/*    UI&UX*/}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildCardVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">UI/UX Design</p>
                            </div>
                            <span className="text-center flex">We craft user-centered interface that combine functionality with aesthetics. Our design process focuses on usability and delivering meaningful digital experience</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
            {/*  third section  */}
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={divParentVariants}
                className="space-y-12">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={divChildHeaderVariants}
                    className="flex flex-col gap-8 justify-center items-center">
                    <p className="lg:text-5xl text-2xl text-center ">Startup Studio & Product Development</p>
                    <div className="tracking-wide leading-6 text-[18px]">
                        <p className="text-center text-stone-900 ">We don't just build for clients - we build with
                            founders. </p>
                        <p className="lg:w-2/3 w-full mx-auto  font-normal text-center">As a startup studio, Gidev
                            Innovations
                            partners with innovators to turn bold ideas into scalable digital products.</p>
                    </div>
                </motion.div>
                <div className="lg:w-10/12  w-full mx-auto">
                    <div className="grid grid-cols-2 gap-18 lg:gap-32">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildHeroVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">MVP Development</p>
                            </div>
                            <span className="text-center flex">We help founders validate their ideas quickly through Minimum Viable Products(MVPs). allowing for rapid testing, early user feedback, and data-driven decision making.</span>
                        </motion.div>
                        <div
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Startup Incubation</p>
                            </div>
                            <span className="text-center flex">Our incubation program support entrepreneurs with end-to-end guidance, including product strategy, technical development, go-to-market planning, and scaling support to ensure sustainable growth.</span>
                        </div>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildHeroVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Product Partnership</p>
                            </div>
                            <span className="text-center flex">We collaborate with innovators to co-create and launch products, combining our technical expertise and strategic insight with the vision of our partners.</span>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            variants={divChildHeroVariants}
                            className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4  lg:space-y-6">
                            <div className="flex flex-col gap-6 lg:gap-8 justify-center items-center">
                                <Microchip size={35}/>
                                <p className="lg:text-3xl text-2xl w-2/3 mx-auto text-center">Revenue-Sharing & Equity
                                    Projects</p>
                            </div>
                            <span className="text-center flex">We partner with high-potential startups through revenue-sharing and equity-based models, fostering long-term collaborations and building products that generate lasting value.</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            {/*    Forth Section Faqs*/}
            <Faqs/>
        </div>
    )
}

export default Services;