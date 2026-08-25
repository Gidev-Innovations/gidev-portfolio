import Faqs from './Faqs'
import {ArrowUpRight} from "lucide-react";
import {motion, type Variants} from "framer-motion";
import {Link} from "react-router-dom";
import {services, studioOfferings, capabilities} from "../data/services";
import {imagery} from "../data/imagery";


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
                        className="bg-linear-to-r from-clay-600 to-ochre-500 bg-clip-text  text-transparent">Transformations</span> Across
                        Africa
                    </h1>
                </motion.header>

                {/* Right Section - Image Grid */}
                <motion.header className="flex-1"
                               initial="hidden"
                               whileInView="show"
                               variants={headerContainerVariantRight}
                >
                    {/*
                      TODO [NEEDS REAL CONTENT]: Unsplash stock of urban and
                      product-work contexts, not Gidev's own photography.
                      Replace with screenshots of shipped work.
                    */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-4 aspect-[16/10] min-h-[220px] md:min-h-[380px]">
                        {/* Top Left Image - spans 1 column, 2 rows */}
                        <div className="col-span-1 row-span-2 min-h-0">
                            <img
                                src={imagery.collaboration.src}
                                alt={imagery.collaboration.alt}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Top Right Image - spans 2 columns */}
                        <div className="col-span-2 min-h-0">
                            <img
                                src={imagery.laptopWork.src}
                                alt={imagery.laptopWork.alt}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Bottom Left Image */}
                        <div className="min-h-0">
                            <img
                                src={imagery.nairobiStreet.src}
                                alt={imagery.nairobiStreet.alt}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Bottom Right Image */}
                        <div className="min-h-0">
                            <img
                                src={imagery.planning.src}
                                alt={imagery.planning.alt}
                                loading="lazy"
                                className="w-full h-full object-cover rounded-2xl"
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
                    {/*services — sourced from src/data/services.ts, each card links to its own page*/}
                    <div className="grid grid-cols-2 gap-18 lg:gap-32">
                        {services.map((service) => (
                            <motion.div
                                key={service.slug}
                                initial="hidden"
                                whileInView="show"
                                variants={divChildCardVariants}
                                className="col-span-2 md:col-span-1">
                                <Link
                                    to={`/services/${service.slug}`}
                                    className="group block h-full bg-spring-wood-50 rounded-2xl p-6 lg:p-8 space-y-5 lg:space-y-6 transition-colors duration-200 hover:bg-white">
                                    <div className="overflow-hidden rounded-xl aspect-[16/10]">
                                        <img
                                            src={service.image.src}
                                            alt={service.image.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <p className="lg:text-3xl text-2xl font-semibold tracking-tight">{service.name}</p>
                                        <span className="block text-stone-800 leading-relaxed">{service.summary}</span>
                                    </div>
                                    <span className="flex items-center gap-1 text-[15px] text-teal-600 font-medium">
                                        Explore this service
                                        <ArrowUpRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/*capabilities included across every engagement*/}
                    <div className="mt-16 lg:mt-24">
                        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-6 text-center">
                            Included across every engagement
                        </p>
                        <ul className="flex flex-wrap justify-center gap-3">
                            {capabilities.map((capability) => (
                                <li
                                    key={capability}
                                    className="rounded-full px-5 py-2 text-[14px] text-gray-600 bg-spring-wood-50 border border-spring-wood-100">
                                    {capability}
                                </li>
                            ))}
                        </ul>
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
                        {studioOfferings.map((offering, index) => (
                            <motion.div
                                key={offering.name}
                                initial="hidden"
                                whileInView="show"
                                variants={divChildHeroVariants}
                                className="col-span-2 md:col-span-1 bg-spring-wood-50 rounded-2xl p-8 lg:p-10 space-y-4 lg:space-y-5">
                                <p className="text-xs font-mono text-gray-500 tracking-widest">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <p className="lg:text-3xl text-2xl font-semibold tracking-tight">{offering.name}</p>
                                <span className="block text-stone-800 leading-relaxed">{offering.summary}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
            {/*    Forth Section Faqs*/}
            <Faqs/>
        </div>
    )
}

export default Services;