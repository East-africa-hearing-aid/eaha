"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaPhoneAlt } from "react-icons/fa";
import SectionChip from "@/components/ui/SectionChip";
import { WEB3FORMS_KEY, submitWeb3Form } from "@/lib/web3forms";

const BookShader = dynamic(() => import("./components/BookShader"), { ssr: false });

type FormStatus = "idle" | "loading" | "success" | "error";

const CONTACT_EMAIL = "info@eahac.com";

const PHONE_NUMBERS = [
    { label: "+251 911 523 444", href: "tel:+251911523444" },
    { label: "+251 912 501 599", href: "tel:+251912501599" },
    { label: "+251 114 552 941", href: "tel:+251114552941" },
];

const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Lydia Plaza, Wello Sefer, Addis Ababa, Ethiopia");

// Same profiles the site footer links to.
const SOCIAL_LINKS = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/posts/east-africa-hearing-and-speech-center_eastafrica-eastafricahearingandspeechcenter-activity-7298966821225807872-2kSI/",
    },
    { label: "Instagram", href: "https://www.instagram.com/eahasc/" },
];

const infoLink = "w-fit hover:text-black transition-colors";

const EMPTY_FORM = {
    name: "",
    age: "",
    phone: "",
    gender: "",
    message: "",
};

const fieldLabel = "font-suisse-regular text-[16.7px] tracking-[-0.03em] text-[#4d4d4d]";
const fieldBase =
    "w-full h-[34px] rounded-lg border border-[#4d4d4d] bg-transparent px-2.5 font-suisse-regular text-[13.6px] tracking-[-0.02em] placeholder:text-[#9a9a9a] outline-none focus:border-primary transition-colors";
const fieldBox = `${fieldBase} text-black`;

export default function BookContent() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Fallback that works without any third-party service: opens the
    // visitor's mail app with the form contents pre-filled.
    const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Appointment Request – EAHAC"
    )}&body=${encodeURIComponent(
        `Name: ${form.name}\nAge: ${form.age}\nPhone: ${form.phone}\nGender: ${form.gender}\n\n${form.message}`
    )}`;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!WEB3FORMS_KEY) {
            setErrorMessage("The online form is not available right now.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        try {
            const result = await submitWeb3Form({
                subject: "New Appointment Request – EAHAC",
                from_name: form.name,
                name: form.name,
                age: form.age,
                phone: form.phone,
                gender: form.gender,
                message: form.message,
            });

            if (result.ok) {
                setStatus("success");
                setForm(EMPTY_FORM);
            } else {
                console.error("Web3Forms rejected the submission:", result.status, result.message);
                setErrorMessage(result.message ?? `Request failed (${result.status}).`);
                setStatus("error");
            }
        } catch (err) {
            console.error("Form submission failed:", err);
            setErrorMessage("Could not reach the server. Check your connection.");
            setStatus("error");
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* ── Left panel ────────────────────────────────────────── */}
            <div className="flex flex-col w-full lg:w-[48.4%] bg-white px-6 md:px-[4.3rem] pt-28 md:pt-[8.75rem] pb-16">
                <SectionChip tone="brand" className="mb-5 self-start">Appointment</SectionChip>

                <h1 className="font-suisse-medium text-[2.8rem] md:text-[3.55rem] leading-[1] tracking-[-0.055em] mb-5">
                    <span className="text-black">Book a </span>
                    <span className="text-[#e85e29]">Visit</span>
                </h1>

                <p className="font-suisse-regular text-black text-lg md:text-[1.375rem] leading-[1.23] tracking-[-0.04em] max-w-[560px] mb-8">
                    Call us directly or fill out the form below, We&apos;ll confirm your visit within 24 hours
                </p>

                {/* Phone numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-3 w-full mb-12">
                    {PHONE_NUMBERS.map((num) => (
                        <a
                            key={num.href}
                            href={num.href}
                            className="flex items-center gap-2.5 h-[46px] pl-2.5 pr-4 rounded-[10px] border border-[#333] hover:border-primary transition-colors"
                        >
                            <span className="flex items-center justify-center size-8 rounded-md bg-[#e85e29] text-white">
                                <FaPhoneAlt className="size-3.5 -scale-x-100" aria-hidden />
                            </span>
                            <span className="font-suisse-regular text-[17px] tracking-[-0.04em] text-black">{num.label}</span>
                        </a>
                    ))}
                </div>

                <SectionChip className="mb-6 self-start">Patient Information</SectionChip>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col w-full">
                    <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-7">
                        <label className="flex flex-col gap-2.5">
                            <span className={fieldLabel}>Full Name</span>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                                autoComplete="name"
                                className={fieldBox}
                            />
                        </label>
                        <label className="flex flex-col gap-2.5">
                            <span className={fieldLabel}>Age</span>
                            <input
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="e.g. 28"
                                inputMode="numeric"
                                maxLength={3}
                                className={fieldBox}
                            />
                        </label>
                        <label className="flex flex-col gap-2.5">
                            <span className={fieldLabel}>Phone Number</span>
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="+251"
                                autoComplete="tel"
                                className={fieldBox}
                            />
                        </label>
                        <label className="flex flex-col gap-2.5">
                            <span className={fieldLabel}>Gender</span>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className={`${fieldBase} appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22><path d=%22M1 1l4 4 4-4%22 fill=%22none%22 stroke=%22%234d4d4d%22/></svg>')] bg-no-repeat bg-[right_10px_center] ${form.gender ? "text-black" : "text-[#9a9a9a]"}`}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                    </div>

                    <div className="h-px w-full bg-[#808080] mt-7 mb-4" />

                    <label className="flex flex-col gap-3">
                        <span className={fieldLabel}>How can we help</span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Tell us more about yourself and the reason for your visit......"
                            className="w-full h-[160px] rounded-[10px] border border-[#4d4d4d] bg-transparent px-3 py-2.5 font-suisse-regular text-[13.6px] tracking-[-0.02em] text-black placeholder:text-[#9a9a9a] outline-none focus:border-primary transition-colors resize-none"
                        />
                    </label>

                    {/* Submit row */}
                    <div className="flex items-center justify-between gap-4 mt-6">
                        <span className="font-suisse-regular text-[13.6px] tracking-[-0.02em] text-[#808080]">
                            We&apos;ll Reply within 24 hrs
                        </span>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="h-[31px] px-5 rounded-md bg-[#e85e29] text-white font-suisse-regular text-[15.3px] tracking-[-0.03em] cursor-pointer hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Sending…" : "Send Inquiry"}
                        </button>
                    </div>

                    <div aria-live="polite" className="mt-4 min-h-5">
                        {status === "success" && (
                            <span className="font-suisse-regular text-sm text-green-600">
                                Sent! We&apos;ll be in touch soon.
                            </span>
                        )}
                        {status === "error" && (
                            <div className="flex flex-col gap-1 font-suisse-regular text-sm">
                                <span className="text-red-500">
                                    Something went wrong.{errorMessage ? ` ${errorMessage}` : ""}
                                </span>
                                <span className="text-gray-500">
                                    Please try again, call us, or{" "}
                                    <a href={mailtoHref} className="text-black border-b border-primary">
                                        send this by email
                                    </a>
                                    .
                                </span>
                            </div>
                        )}
                    </div>
                </form>

                {/* Contact info */}
                <div className="mt-14 pt-7 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_0.7fr] gap-x-5 gap-y-3 font-suisse-regular text-sm xl:text-[15px] text-[#9a9db0]">
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={`${infoLink} flex flex-col gap-3`}>
                        <span>Lydia Plaza 1st Floor, Wello Sefer</span>
                        <span>Kirkos Subcity, Addis Ababa</span>
                    </a>
                    <div className="flex flex-col gap-3">
                        <a href={`mailto:${CONTACT_EMAIL}`} className={infoLink}>{CONTACT_EMAIL}</a>
                        <a href="tel:+251911523444" className={infoLink}>+251 911 523 444</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        {SOCIAL_LINKS.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={infoLink}>
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right panel — shader ───────────────────────────────── */}
            <div className="hidden lg:block lg:w-[51.6%] relative overflow-hidden">
                <BookShader />
            </div>
        </div>
    );
}
