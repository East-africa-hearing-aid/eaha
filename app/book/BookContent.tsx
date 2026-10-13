"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const BookShader = dynamic(() => import("./components/BookShader"), { ssr: false });

type FormStatus = "idle" | "loading" | "success" | "error";

// Web3Forms access keys are public by design and must be set at build time
// (NEXT_PUBLIC_* vars are inlined by Next.js). See .env.example.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const CONTACT_EMAIL = "info@eahac.com";

const EMPTY_FORM = {
    name: "",
    age: "",
    phone: "",
    gender: "",
    message: "",
};

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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!WEB3FORMS_KEY) {
            console.error(
                "NEXT_PUBLIC_WEB3FORMS_KEY is not set. Add it to the hosting environment and redeploy."
            );
            setErrorMessage("The online form is not available right now.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: "New Appointment Request – EAHAC",
                    from_name: form.name,
                    name: form.name,
                    age: form.age,
                    phone: form.phone,
                    gender: form.gender,
                    message: form.message,
                }),
            });
            const data: { success?: boolean; message?: string } | null = await res
                .json()
                .catch(() => null);

            if (res.ok && data?.success) {
                setStatus("success");
                setForm(EMPTY_FORM);
            } else {
                console.error("Web3Forms rejected the submission:", res.status, data);
                setErrorMessage(data?.message ?? `Request failed (${res.status}).`);
                setStatus("error");
            }
        } catch (err) {
            console.error("Form submission failed:", err);
            setErrorMessage("Could not reach the server. Check your connection.");
            setStatus("error");
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* ── Left panel ────────────────────────────────────────── */}
            <div className="flex flex-col w-full lg:w-1/2 bg-white px-8 md:px-14 pt-28 pb-12 overflow-y-auto">
                {/* Heading */}
                <h1 className="font-suisse-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
                    <span className="text-black">Book an </span>
                    <span className="text-primary">Appointment</span>
                </h1>

                <p className="font-suisse-regular text-gray-500 text-sm md:text-base mb-8 max-w-md">
                    You can book a visit by calling one of the numbers below or by
                    filling the form below.
                </p>

                {/* Phone number boxes */}
                <div className="flex gap-4 mb-8">
                    {["+251 911 523 444", "+251 912 501 599", "+251 114 552 941"].map((num, i) => (
                        <div key={i} className="px-5 py-3">
                            <span className="font-suisse-mono text-sm text-gray-700 tracking-wide">
                                {num}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Section label */}
                <p className="font-suisse-regular text-sm text-gray-600 mb-6">
                    Fill the form below.{" "}
                    <span className="border-b-2 border-primary pb-0.5 text-black font-suisse-bold">
                        Or send us a message
                    </span>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
                    {/* Row 1: Name + Age */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 flex flex-col gap-1">
                            <label className="font-suisse-mono text-[10px] tracking-widest uppercase text-gray-400">
                                Name
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your full name"
                                className="border-b border-gray-300 bg-transparent pb-2 font-suisse-regular text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="w-20 flex flex-col gap-1">
                            <label className="font-suisse-mono text-[10px] tracking-widest uppercase text-gray-400">
                                Age
                            </label>
                            <input
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="xx"
                                maxLength={3}
                                className="border border-gray-300 rounded-md px-2 py-2 bg-transparent font-suisse-regular text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-primary transition-colors text-center"
                            />
                        </div>
                    </div>

                    {/* Row 2: Phone + Gender */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 flex flex-col gap-1">
                            <label className="font-suisse-mono text-[10px] tracking-widest uppercase text-gray-400">
                                Phone Number
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="+251 000 000 000"
                                className="border-b border-gray-300 bg-transparent pb-2 font-suisse-regular text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="w-20 flex flex-col gap-1">
                            <label className="font-suisse-mono text-[10px] tracking-widest uppercase text-gray-400">
                                Gender
                            </label>
                            <input
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                placeholder="m/f"
                                maxLength={1}
                                className="border border-gray-300 rounded-md px-2 py-2 bg-transparent font-suisse-regular text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-primary transition-colors text-center"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                        <label className="font-suisse-mono text-[10px] tracking-widest uppercase text-gray-400">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us more about yourself and how we can help"
                            className="border border-gray-300 rounded-xl px-4 py-3 bg-transparent font-suisse-regular text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-primary transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="submit"
                            variant="lg"
                            mode="default"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Sending…" : "Inquire"}
                        </Button>
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
                                    <a
                                        href={mailtoHref}
                                        className="text-black border-b border-primary"
                                    >
                                        send this by email
                                    </a>
                                    .
                                </span>
                            </div>
                        )}
                    </div>
                </form>

                {/* Footer info */}
                <div className="mt-12 pt-6 border-t border-gray-100 grid grid-cols-3 gap-y-1 text-[11px] font-suisse-regular text-gray-400">
                    <span>Lydia Plaza 1st Floor, Wello Sefer</span>
                    <span>info@eahac.com</span>
                    <span>LinkedIn</span>
                    <span>Kirkos Subcity, Addis Ababa</span>
                    <span>+251 911 523 444</span>
                    <span>Instagram</span>
                </div>
            </div>

            {/* ── Right panel — shader ───────────────────────────────── */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
                <BookShader />
            </div>
        </div>
    );
}
