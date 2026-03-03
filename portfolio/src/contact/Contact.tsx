import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email.";
    if (!formData.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    //console.log("Submitted:", formData);
    setFormData({ fullName: "", email: "", message: "" });
    setErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <>
      <section className="bg-white px-6 mt-22 md:mt-34">
        <h1 className="text-center text-heading-4 md:text-heading-2 font-OutfitMedium text-black mb-8 md:mb-14">
          Get in touch
        </h1>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          {/* Left sticky — desktop */}
          <div className="hidden md:block md:w-5/12 sticky top-32 self-start">
            <h2 className="text-3xl font-OutfitSemiBold text-black leading-snug">
              Let's Create an unforgettable Brand together
            </h2>
          </div>

          {/* Left text — mobile */}
          <h2 className="md:hidden text-2xl font-bold text-black text-center mb-2">
            Let's Create an unforgettable Brand together
          </h2>

          {/* Form */}
          <div className="w-full md:w-7/12 bg-[#f5f4ee] rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-base font-OutfitMedium text-black mb-2">
                Full Name *
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full rounded-full px-4 py-3 bg-white text-base outline-none border-2 border-transparent focus:border-[#2EC4C7]"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-base font-OutfitMedium text-black mb-2">
                Enter Your Mail *
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full rounded-full px-4 py-3 bg-white text-base outline-none border-2 border-transparent focus:border-[#2EC4C7]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 pl-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-base font-OutfitMedium text-black mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={10}
                className="w-full rounded-2xl px-4 py-3 bg-white text-base outline-none border-2 border-transparent focus:border-[#2EC4C7] resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 pl-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-full bg-[#0f172a] hover:bg-[#2EC4C7] text-white font-semibold text-base transition-colors duration-300"
            >
              Submit Now
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2EC4C7] text-white px-6 py-4 rounded-2xl text-base font-semibold shadow-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              ✓ Message sent! We'll be in touch soon.
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
