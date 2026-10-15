import { Link } from "react-router-dom";
import { SITE } from "../data/site";

// TODO(human): have this reviewed against the Kenya Data Protection Act 2019
// before relying on it, and update it whenever analytics or new tools are added.
const LAST_UPDATED = "15 October 2026";

export default function Privacy() {
  return (
    <article className="gidev-copy pt-32 md:pt-44 pb-24 text-gray-700 leading-relaxed space-y-6">
      <h1 className="text-4xl md:text-5xl font-semibold text-gray-950 tracking-tight">
        Privacy policy
      </h1>
      <p className="text-gray-500">Last updated {LAST_UPDATED}</p>

      <p>
        This policy explains what personal information {SITE.name} collects
        through gidevtech.com, why, and what you can ask us to do with it.
      </p>

      <h2 className="text-2xl font-semibold text-gray-950 pt-4">What we collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Contact form:</strong> your name, the phone number or email
          you give us, your project description and budget range. The form is
          delivered to our inbox by Web3Forms, which processes it on our
          behalf.
        </li>
        <li>
          <strong>Call bookings:</strong> if you book a call, Calendly collects
          your name, email and any notes under its own privacy policy and
          shares them with us.
        </li>
        <li>
          <strong>Basic server logs:</strong> our hosting provider, Cloudflare,
          processes technical data such as IP address and browser type to
          deliver and protect the site.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-950 pt-4">How we use it</h2>
      <p>
        Only to reply to your enquiry, prepare for and hold the call you
        booked, and, if we work together, to run the project. We do not sell
        your information or add you to marketing lists without asking.
      </p>

      <h2 className="text-2xl font-semibold text-gray-950 pt-4">How long we keep it</h2>
      <p>
        Enquiries that don't lead to a project are deleted within 12 months.
        Project records are kept for as long as needed for the work and for
        legal and tax requirements.
      </p>

      <h2 className="text-2xl font-semibold text-gray-950 pt-4">Your rights</h2>
      <p>
        Under the Kenya Data Protection Act, 2019 you can ask to see, correct
        or delete the personal information we hold about you, or object to how
        we use it. To make a request,{" "}
        <Link to="/contact#message" className="text-brand-dark underline underline-offset-4">
          send us a message
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold text-gray-950 pt-4">Changes</h2>
      <p>
        If we change how we handle personal information, for example by adding
        website analytics, we will update this page and the date above.
      </p>
    </article>
  );
}
