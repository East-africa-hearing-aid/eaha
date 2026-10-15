import Footer from "@/components/layout/Footer";
import Hero from "./components/Hero";
import OurTeam from "./components/OurTeam";
import OurPartners from "./components/OurPartners";
import OurCoreServices from "./components/OurCoreServices";
import SectionIndicator from "./components/SectionIndicator";

export default function AboutContent() {
    return (
        <div className="bg-background min-h-screen">
            <SectionIndicator />
            <div className="px-4 md:px-0">
                <Hero />
                <OurTeam />
                <OurPartners />
                <OurCoreServices />
            </div>
            <div className="pt-12 md:pt-16 pb-1">
                <Footer solidBrand />
            </div>
        </div>
    );
}
