"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ContactForm from "../ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen max-w-6xl mx-auto pt-24 pb-10">
      {/* HEADING */}
      <Link href={"#contact"}>
        <h2
          className={cn(
            "text-4xl md:text-7xl text-center font-bold tracking-tight",
            "text-[#5FE8FF] drop-shadow-[0_0_25px_#00E5FF90]",
            "select-none"
          )}
        >
          LET&apos;S WORK <br /> TOGETHER
        </h2>
      </Link>

      {/* CENTER CARD */}
      <div className="w-full flex justify-center mt-14">
        <Card className="w-full max-w-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_#00E5FF30] rounded-2xl p-6">
          <CardHeader>
            <CardTitle className="text-3xl text-white">Contact Form</CardTitle>
            <CardDescription className="text-[#8EEBFF]/70">
              Contact me directly at{" "}
              <a
                href={`mailto:${config.email}`}
                className="text-[#5FE8FF] underline"
                target="_blank"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your message below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
