import Faqs from './Faqs'
import {ArrowUpRight} from "lucide-react";
import Reveal from "../components/Reveal";
import {Link} from "react-router-dom";
import {services, studioOfferings, capabilities} from "../data/services";
import {imagery} from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";
import JsonLd from "../seo/JsonLd";
import {breadcrumbSchema} from "../seo/schema";

const sectionHeading = "text-heading-5 md:text-heading-3 font-medium tracking-tight text-gray-950 leading-tight";
const sectionIntro = "text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto";

const Services = () => {
    return (
        <div className="min-h-screen bg-white mt-4 md:mt-12 pb-8">
            <JsonLd data={breadcrumbSchema([{name: "Home", path: "/"}, {name: "Services", path: "/services"}])} />

            <header className="pt-20 pb-12 text-center px-6">
                <Reveal>
                    <h1 className="text-[30px] sm:text-4xl md:text-heading-2 font-medium tracking-tight text-gray-950 leading-tight max-w-4xl mx-auto mb-4">
                        Software Development Services in <span className="text-brand-dark">Nairobi</span>, Kenya
                    </h1>
                    <p className={sectionIntro}>
                        Powering digital transformation across Africa: web
                        applications, e-commerce with M-Pesa checkout, Android and
                        iOS apps, and business websites, built and maintained by a
                        studio in Nairobi.
                    </p>
                </Reveal>
            </header>

            <div className="gidev-stage space-y-24 md:space-y-32">
                {/* TODO(human): replace with photos of real Gidev work and clients. */}
                <Reveal className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 aspect-[4/3] sm:aspect-[16/9]">
                        <div className="col-span-1 row-span-2 min-h-0 overflow-hidden rounded-2xl">
                            <ResponsiveImage name={imagery.manPortrait.name} alt={imagery.manPortrait.alt} sizes="(min-width: 1024px) 340px, 30vw" className="w-full h-full object-cover" />
                        </div>
                        <div className="col-span-2 min-h-0 overflow-hidden rounded-2xl">
                            <ResponsiveImage name={imagery.shopOwner.name} alt={imagery.shopOwner.alt} sizes="(min-width: 1024px) 680px, 60vw" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-h-0 overflow-hidden rounded-2xl">
                            <ResponsiveImage name={imagery.womanCity.name} alt={imagery.womanCity.alt} sizes="(min-width: 1024px) 340px, 30vw" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-h-0 overflow-hidden rounded-2xl">
                            <ResponsiveImage name={imagery.dashboard.name} alt={imagery.dashboard.alt} sizes="(min-width: 1024px) 340px, 30vw" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </Reveal>

                <section className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-10 md:mb-12 space-y-4">
                        <h2 className={sectionHeading}>What we build</h2>
                        <p className={sectionIntro}>
                            We design and develop powerful digital solutions that help businesses operate smarter and scale faster.
                        </p>
                    </Reveal>

                    {/*services — sourced from src/data/services.ts, each card links to its own page*/}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {services.map((service) => (
                            <Reveal key={service.slug}>
                                <Link
                                    to={`/services/${service.slug}`}
                                    className="group block h-full bg-brand-light rounded-2xl p-6 lg:p-8 space-y-5 transition-colors duration-200 hover:bg-white hover:ring-1 hover:ring-brand-border">
                                    <div className="overflow-hidden rounded-xl aspect-[16/10]">
                                        <ResponsiveImage
                                            name={service.image.name}
                                            alt={service.image.alt}
                                            sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 90vw"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-brand-dark">{service.name}</h3>
                                        <p className="text-gray-600 leading-relaxed">{service.summary}</p>
                                    </div>
                                    <span className="flex items-center gap-1 text-[15px] text-brand-dark font-medium">
                                        Explore this service
                                        <ArrowUpRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    {/*capabilities included across every engagement*/}
                    <div className="mt-12 md:mt-16">
                        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-5 text-center">
                            Included across every engagement
                        </p>
                        <ul className="flex flex-wrap justify-center gap-3">
                            {capabilities.map((capability) => (
                                <li
                                    key={capability}
                                    className="rounded-full px-5 py-2 text-[14px] text-gray-600 bg-brand-light border border-brand-border">
                                    {capability}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-10 md:mb-12 space-y-4">
                        <h2 className={sectionHeading}>Startup Studio &amp; Product Development</h2>
                        <p className={sectionIntro}>
                            We don't just build for clients, we build with founders. As a
                            startup studio, Gidev Innovations partners with innovators to
                            turn bold ideas into scalable digital products.
                        </p>
                    </Reveal>
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {studioOfferings.map((offering, index) => (
                            <Reveal
                                key={offering.name} className="bg-brand-light rounded-2xl p-6 lg:p-8 space-y-3">
                                <p className="text-xs font-mono text-gray-500 tracking-widest">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h3 className="text-2xl font-semibold tracking-tight">{offering.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{offering.summary}</p>
                            </Reveal>
                        ))}
                    </div>
                </section>

                <div className="max-w-6xl mx-auto">
                    <Faqs/>
                </div>
            </div>
        </div>
    )
}

export default Services;
