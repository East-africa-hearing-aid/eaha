import Hero from "./components/Hero";
import OurTeam from "./components/OurTeam";
import OurPartners from "./components/OurPartners";
import OurCoreServices from "./components/OurCoreServices";

export default function AboutContent() {
    return (
        <main className="bg-background min-h-screen px-4">
            <Hero />
            <OurTeam />
            <OurPartners />
            <OurCoreServices />
        </main>
    );
}
