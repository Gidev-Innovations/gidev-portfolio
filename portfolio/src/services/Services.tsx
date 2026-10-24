import Faqs from './Faqs'
import PageHero from "../components/PageHero";
import {ArrowUpRight} from "lucide-react";
import Reveal from "../components/Reveal";
import {Link} from "react-router-dom";
import {serviceGroups, services, capabilities, type Service} from "../data/services";
import {imagery} from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";
import JsonLd from "../seo/JsonLd";
import {breadcrumbSchema} from "../seo/schema";

const sectionHeading = "text-heading-5 md:text-heading-3 font-medium tracking-tight text-gray-950 leading-tight";
const sectionIntro = "text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto";

function ServiceGrid({ items }: { items: Service[] }) {
    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {items.map((service, index) => (
                <Reveal key={service.slug} delay={(index % 2) * 90}>
                    <Link viewTransition
                        to={`/services/${service.slug}`}
                        className="group block h-full overflow-hidden rounded-3xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_20px_60px_rgba(17,17,17,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
                    >
                        <div className="overflow-hidden rounded-[1.25rem] aspect-[16/9] bg-brand-light">
                            <ResponsiveImage
                                name={service.image.name}
                                alt={service.image.alt}
                                sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 90vw"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                            />
                        </div>
                        <div className="flex min-h-36 items-start justify-between gap-6 px-4 py-5 lg:px-5">
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
                                    {service.group}
                                </p>
                                <h3 className="text-xl font-semibold tracking-tight text-gray-950 transition-colors group-hover:text-brand-dark sm:text-2xl">
                                    {service.title}
                                </h3>
                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
                                    {service.shortDescription}
                                </p>
                            </div>
                            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-900 transition-all duration-300 group-hover:border-brand-dark group-hover:bg-brand-dark group-hover:text-white">
                                <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
                            </span>
                        </div>
                    </Link>
                </Reveal>
            ))}
        </div>
    )
}

const Services = () => {
    return (
        <div className="min-h-screen bg-white mt-4 md:mt-12 pb-8">
            <JsonLd data={breadcrumbSchema([{name: "Home", path: "/"}, {name: "Services", path: "/services"}])} />

            <PageHero
                eyebrow="Services"
                title="Digital, creative and AI services"
                breadcrumb={[{label: "Home", to: "/"}, {label: "Services"}]}
                intro="One connected team for digital products, brand experiences and practical growth. Explore software, AI, design, marketing and ongoing support, all shaped around your goals."
            />

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
                        <h2 className={sectionHeading}>{serviceGroups[0]}</h2>
                        <p className={sectionIntro}>
                            From custom applications and online stores to mobile
                            products, websites and AI-powered workflows, we build
                            useful digital foundations for your business.
                        </p>
                    </Reveal>

                    <ServiceGrid items={services.filter((service) => service.group === serviceGroups[0])} />

                    <Reveal className="mb-10 mt-24 space-y-4 text-center md:mb-12">
                        <h2 className={sectionHeading}>{serviceGroups[1]}</h2>
                        <p className={sectionIntro}>
                            Grow your visibility, strengthen your brand and keep
                            your digital presence working well with practical
                            support tailored to your goals.
                        </p>
                    </Reveal>
                    <ServiceGrid items={services.filter((service) => service.group === serviceGroups[1])} />

                    <div className="mt-12 md:mt-16">
                        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-5 text-center">
                            How we work
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

                <div className="max-w-6xl mx-auto">
                    <Faqs/>
                </div>
            </div>
        </div>
    )
}

export default Services;
