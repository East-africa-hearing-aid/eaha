import Footer from "@/components/layout/Footer";
import EmptySection from "@/components/sections/EmptySection";
import FAQ from "@/components/sections/FAQ";
import HearingSection from "@/components/sections/HearingSection";
import Landing from "@/components/sections/Landing";
import Testimonials from "@/components/sections/Testimonials";
import TeamSection from "@/components/sections/TeamSection";
import WhatWeDo from "@/components/sections/WhatWeDo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
  description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
  keywords: "hearing aid center Ethiopia, hearing test Addis Ababa, audiology services East Africa, hearing aids Ethiopia, speech therapy Addis Ababa, cochlear implants Ethiopia, hearing loss treatment East Africa",
  openGraph: {
    title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
    description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
    url: 'https://eaha.et',
    siteName: 'East African Hearing and Speech Center',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "East African Hearing and Speech Center | Expert Hearing Care in Addis Ababa, Ethiopia",
    description: "Ethiopia's leading hearing care specialists. Professional hearing tests, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa. Restore your hearing today.",
  },
};

export default function Home() {
  return (
    <>
      <section id="home" aria-labelledby="hero-section">
        <h2 id="hero-section" className="sr-only">Welcome to East African Hearing and Speech Center</h2>
        <span className="sr-only">
          Hearing care specialists Ethiopia, audiology clinic Addis Ababa, hearing test East Africa,
          hearing aids Ethiopia, speech therapy Addis Ababa, cochlear implants Ethiopia,
          hearing loss treatment East Africa, hearing care specialists Ethiopia.
        </span>
        <Landing key="landing-component" />
      </section>

      <section id="hearing-test" aria-labelledby="hearing-test-section">
        <h2 id="hearing-test-section" className="sr-only">Hearing Test Experience</h2>
        <span className="sr-only">
          Hearing test Ethiopia, online hearing assessment Addis Ababa, hearing evaluation East Africa,
          hearing loss diagnosis Ethiopia, hearing test appointment Addis Ababa, audiology testing Ethiopia.
        </span>
        <HearingSection key="hearing-section" />
      </section>

      <section id="services" aria-labelledby="services-section">
        <h2 id="services-section" className="sr-only">Our Hearing Care Services</h2>
        <span className="sr-only">
          Hearing services Ethiopia, audiology clinic Addis Ababa, hearing test East Africa,
          hearing aids Ethiopia, speech therapy Addis Ababa, cochlear implants Ethiopia,
          hearing loss treatment East Africa, hearing care specialists Ethiopia.
        </span>
        <WhatWeDo key="what-we-do" />
      </section>


      <section id="testimonials" aria-labelledby="testimonials-section">
        <h2 id="testimonials-section" className="sr-only">Patient Testimonials</h2>
        <span className="sr-only">
          Hearing aid reviews Ethiopia, patient testimonials Addis Ababa, hearing care success stories East Africa,
          satisfied hearing patients Ethiopia, hearing improvement testimonials Addis Ababa.
        </span>
        <TeamSection key="team" />
        <Testimonials key="testimonials" />
      </section>

      <section id="faq" aria-labelledby="faq-section">
        <h2 id="faq-section" className="sr-only">Frequently Asked Questions</h2>
        <span className="sr-only">
          Hearing aid questions Ethiopia, hearing test FAQ Addis Ababa, audiology FAQ East Africa,
          hearing loss questions Ethiopia, hearing aid cost Addis Ababa, hearing care FAQ Ethiopia.
        </span>
        <FAQ key="faq" />
      </section>

      <EmptySection />

      <footer role="contentinfo">
        <Footer />
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "East African Hearing and Speech Center",
            "description": "Ethiopia's leading hearing care specialists providing comprehensive audiology services, advanced hearing aids, speech therapy, and cochlear implants in Addis Ababa.",
            "url": "https://eaha.et",
            "logo": "https://eaha.et/Images/logo.png",
            "telephone": "+251-911-523-444",
            "email": "info@eahac.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kirkos Subcity Wereda 03, Lydia Plaza 1st Floor, Ethio-China Friendship Road, Wello Sefer",
              "addressLocality": "Addis Ababa",
              "addressRegion": "Addis Ababa",
              "postalCode": "5784",
              "addressCountry": "ET"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 9.0192,
              "longitude": 38.7525
            },
            "openingHours": [
              "Mo-Fr 08:00-17:00",
              "Sa 09:00-14:00"
            ],
            "medicalSpecialty": "Audiology",
            "availableService": [
              {
                "@type": "MedicalTest",
                "name": "Hearing Assessment",
                "description": "Comprehensive hearing evaluations using advanced audiometry equipment"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Hearing Aid Fitting",
                "description": "Professional hearing aid selection, fitting, and adjustment services"
              },
              {
                "@type": "MedicalTherapy",
                "name": "Speech Therapy",
                "description": "Specialized speech and language therapy for all ages"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Cochlear Implant",
                "description": "Surgical and rehabilitation services for cochlear implants"
              }
            ],
            "priceRange": "$$",
            "sameAs": [
              "https://www.facebook.com/eastafricahearing",
              "https://www.instagram.com/eastafricahearing",
              "https://www.linkedin.com/company/eastafricahearing"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Hearing Aid Products",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "RIC Hearing Aids",
                  "description": "Receiver-in-canal hearing aids with advanced features"
                },
                {
                  "@type": "Product",
                  "name": "BTE Hearing Aids",
                  "description": "Behind-the-ear hearing aids for various hearing loss levels"
                },
                {
                  "@type": "Product",
                  "name": "CIC Hearing Aids",
                  "description": "Completely-in-canal hearing aids for discreet hearing support"
                }
              ]
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I know if I need a hearing aid?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you experience difficulty hearing conversations, need to turn up the TV volume, or ask people to repeat themselves frequently, you may benefit from a hearing test and potentially hearing aids."
                }
              },
              {
                "@type": "Question",
                "name": "What is the cost of hearing aids in Ethiopia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hearing aid costs vary depending on the type, features, and technology level. Basic hearing aids start from 50,000 ETB, while advanced models can range from 150,000 to 500,000 ETB or more."
                }
              },
              {
                "@type": "Question",
                "name": "How long does a hearing test take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A comprehensive hearing test typically takes 30-45 minutes and includes various assessments to determine the type and degree of hearing loss."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide warranty on hearing aids?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide manufacturer warranties on all hearing aids, typically ranging from 1-3 years depending on the model. We also offer our own service warranty for repairs and adjustments."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
