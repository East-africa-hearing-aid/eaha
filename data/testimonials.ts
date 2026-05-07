export interface Testimonial {
    type: "image" | "text";
    src?: string;
    alt?: string;
    name: string;
    text: string;
}

export const testimonials: Testimonial[] = [
    {
        type: "image",
        src: "",
        alt: "Hanna K",
        name: "Hanna K.",
        text: "The staff at EAHAC explained everything clearly and made me feel comfortable from day one. Their follow-up care is excellent, and I always feel supported whenever I need adjustments.",
    },
    {
        type: "image",
        src: "",
        alt: "Selamawit G",
        name: "Selamawit G.",
        text: "I brought my son here for speech therapy, and the progress he has made is incredible. The therapists are kind, professional, and truly care about children's development. I'm so grateful for their support.",
    },
    {
        type: "text",
        src: "/Images/Testimonial/03.jpg",
        alt: "Mahmud",
        name: "Mahmud A.",
        text: "I decided to get hearing aids at EAHAC, and it's been life changing. The staff was professional and patient throughout the entire process. The hearing aids fit perfectly and work amazingly well. I truly appreciate the excellent service and would recommend EAHAC to anyone considering hearing aids.",
    },
    {
        type: "text",
        alt: "Tigist T.",
        name: "Tigist T.",
        text: "Before coming here, I felt isolated because I couldn't follow group conversations. With my new hearing aids, I'm confident again and love being part of family gatherings.",
    },
    {
        type: "text",
        alt: "Dawit A.",
        name: "Dawit A.",
        text: "The audiologists at EAHAC are incredibly thorough. They took the time to run every test and explain my results in detail. For the first time, I truly understand my hearing condition and feel empowered to manage it.",
    },
    {
        type: "text",
        alt: "Meron B.",
        name: "Meron B.",
        text: "My father was reluctant to get hearing aids, but the team at EAHAC was so patient and reassuring. Now he wears them every day and says he wishes he had come sooner. Thank you for giving him back his independence.",
    },
    {
        type: "text",
        alt: "Abebe W.",
        name: "Abebe W.",
        text: "After years of struggling to hear in meetings at work, I finally visited EAHAC. The hearing aids they fitted are discreet and powerful. My colleagues have noticed the difference, and my confidence at work has soared.",
    },
    {
        type: "text",
        alt: "Frehiwot D.",
        name: "Frehiwot D.",
        text: "My daughter was diagnosed with a speech delay, and I was so worried. The speech therapists here created a personalized plan and worked with her patiently every week. Her progress has been remarkable, and she's now thriving at school.",
    },
    {
        type: "text",
        alt: "Yonas H.",
        name: "Yonas H.",
        text: "I've visited hearing clinics before, but none compare to EAHAC. The facility is modern, the staff are welcoming, and the technology they use is world-class. I finally feel like I'm getting the care I deserve.",
    },
    {
        type: "text",
        alt: "Bethlehem S.",
        name: "Bethlehem S.",
        text: "Living with tinnitus was exhausting. The team at EAHAC helped me understand my condition and provided management strategies that have genuinely improved my quality of life. I'm sleeping better and feeling less anxious.",
    },
    {
        src: "/Images/Testimonial/tigist.jpg",
        type: "text",
        alt: "Tigist Tenagne",
        name: "TIGIST TENAGNE",
        text: "Before receiving support from the East Africa Hearing Center, it was very difficult for me to follow lessons in class. My teacher couldn’t always repeat things for me, and I often missed important information. Because of this, I stopped enjoying playing and interacting with others, and I slowly lost my confidence. I felt very lonely. After getting the help I needed, everything began to change. I can now hear better, participate in class, and connect with people again. I’m truly grateful to the East Africa Hearing Center for helping me regain my confidence and feel part of the world again.",
    },
    {
        src: "/Images/Testimonial/afomia.jpg",
        type: "text",
        alt: "Afomiya Daniel",
        name: "AFOMIYA DANIEL",
        text: "Before my cochlear implant, it was very difficult for me to hear clearly and communicate with others. I often struggled to follow conversations and felt shy speaking because my speech was not clear. This made me lose confidence and sometimes feel isolated from others. After receiving my cochlear implant through the support of East Africa Hearing Center, my life began to change. I can now hear sounds more clearly and my speaking ability has improved a lot. I feel more confident expressing myself, participating in conversations, and connecting with people around me. I’m truly grateful for the opportunity that helped me find my voice again.",
    },
    {
        type: "text",

        name: "DANIEL (Father of Afomia)",
        text: "As a father, it was very difficult to watch my daughter Afomia struggle with hearing and communication. She often found it hard to follow conversations, and expressing herself clearly was a challenge. Over time, this affected her confidence and how she interacted with others. After receiving the cochlear implant and support from East Africa Hearing Center, we began to see a remarkable change. Afomia can now hear much better, and her speaking ability has improved significantly. Seeing her communicate more confidently and engage with people again has been an incredible joy for our family. We are truly grateful for the life-changing support they provided.",
    },
    {
        type: "text",
        src: "/Images/Testimonial/kid.jpg",
        alt: "Child with cochlear implant",
        name: "",
        text: "After the cochlear implant, my child can finally hear and respond to sounds. It has truly changed our lives.",
    },

];
