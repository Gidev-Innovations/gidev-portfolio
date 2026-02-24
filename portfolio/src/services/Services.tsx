import ServiceImage1 from './images/service2.png'
import Faqs from './Faqs'
import {Microchip} from "lucide-react";

const Services = () => {


    return (
        <div className="min-h-screen w-10/12 mx-auto space-y-12">
            <div className="flex gap-2 pt-44">
                <div className="">
                    <div className="w-1/3">
                        <p className="text-6xl">Powering Digital Transformation Across Africa</p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="flex flex-col gap-8">
                            <img src={ServiceImage1} className=" rounded-2xl rotate-6"/>
                            <img src={ServiceImage1} className="rounded-2xl -skew-x-3  "/>
                        </div>
                        <div className="flex flex-col gap-8">
                            <img src={ServiceImage1} className="rounded-2xl -rotate-8"/>
                            <img src={ServiceImage1} className="rounded-2xl skew-x-8 "/>
                        </div>
                    </div>
                </div>
            </div>
            {/*second section*/}
            <div className="space-y-12">
                <div className="flex flex-col w-1/3 mx-auto  gap-4 justify-center items-center">
                    <p className="text-5xl text-center">Software Development Service</p>
                    <span className="text-[18px] text-center text-stone-900 ">We design and develop powerful digital solutions that help businesses operate smarter and scale faster</span>
                </div>
                <div className="w-8/12 mx-auto">
                    {/*services*/}
                    <div className="grid grid-cols-2 gap-32">
                        {/*website dev*/}
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl w-2/3 mx-auto text-center">Website Development</p>
                            </div>
                            <span className="text-center flex">We build modern, responsive and high performance websites tailored to your business goals.</span>
                        </div>
                        {/*    mobile apps*/}

                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl w-2/3 mx-auto text-center">Mobile App Development</p>
                            </div>
                            <span className="text-center flex">We design and develop scalable mobile applications for Android and iOS</span>
                        </div>

                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl w-2/3 mx-auto text-center">Web Applications</p>
                            </div>
                            <span className="text-center flex">Custom web-based systems built for performance and scalability, enabling efficient operations, seamless user experience, and long-term digital growth.</span>
                        </div>

                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl w-2/3 mx-auto text-center">Business System Development</p>
                            </div>
                            <span className="text-center flex">We develop digital systems that automate and optimize operations</span>
                        </div>


                        {/*    E- Commerce*/}
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p  className="text-3xl w-2/3 mx-auto text-center">E-Commerce Platforms</p>
                            </div>
                            <span className="text-center flex">Complete online selling solutions built to power digital commerce. We create high-performing  e-commerce platforms that streamline operations, enhance customer engagement and maximize sales opportunities</span>
                        </div>

                        {/*    UI&UX*/}
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p  className="text-3xl w-2/3 mx-auto text-center">UI/UX Design</p>
                            </div>
                            <span className="text-center flex">We craft user-centered interface that combine functionality with aesthetics. Our design process focuses on usability and delivering meaningful digital experience</span>
                        </div>
                    </div>
                </div>

            </div>
            {/*  third section  */}
            <div className="space-y-12" >
                <div className="flex flex-col gap-8 justify-center items-center">
                    <p className="text-5xl">Startup Studio & Product Development</p>
                    <div className="tracking-wide leading-6 text-[18px]">
                        <p className="text-center text-stone-900 ">We don't just build for clients - we build with founders. </p>
                        <p className=" w-2/3 mx-auto  font-normal text-center">As a startup studio, Gidev Innovations
                            partners with innovators to turn bold ideas into scalable digital products.</p>
                    </div>
                </div>
                <div className="w-10/12 mx-auto">
                    <div className="grid grid-cols-2 gap-32">
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl">Startup Incubation</p>
                            </div>
                            <span className="text-center flex">We help founders validate their ideas quickly through Minimum Viable Products(MVPs). allowing for rapid testing, early user feedback, and data-driven decision making.</span>
                        </div>
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl">Startup Incubation</p>
                            </div>
                            <span className="text-center flex">Our incubation program support entrepreneurs with end-to-end guidance, including product strategy, technical development, go-to-market planning, and scaling support to ensure sustainable growth.</span>
                        </div>
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center" >
                                <Microchip  size={35} />
                                <p className="text-3xl">Product Partnership</p>
                            </div>

                            <span className="text-center flex text-stone-900 ">We collaborate with innovators to co-create and launch products, combining our technical expertise and strategic insight with the vision of our partners.</span>
                        </div>
                        <div className="bg-spring-wood-50 rounded-2xl p-10 space-y-6">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <Microchip  size={35} />
                                <p className="text-3xl w-2/3 mx-auto text-center">Revenue-Sharing & Equity Projects</p>
                            </div>
                            <span className="text-center flex">We partner with high-potential startups through revenue-sharing and equity-based models, fostering long-term collaborations and building products that generate lasting value.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*    Forth Section Faqs*/}
            <Faqs/>
        </div>
    )
}

export default Services;