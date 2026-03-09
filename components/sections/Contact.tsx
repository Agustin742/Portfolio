"use client";

import emailjs from "@emailjs/browser";

import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import { useLanguage } from "@/hooks";

type FormData = {
  asunto: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    asunto: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [lastSent, setLastSent] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {

    if (!formData.email || !formData.asunto || !formData.message) {
      alert("Completa todos los campos");
      return;
    }

    const now = Date.now();

    if (lastSent && now - lastSent < 60000) {
      alert("Espera 1 minuto antes de enviar otro mensaje");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          email: formData.email,
          asunto: formData.asunto,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setLastSent(now);

      setFormData({
        email: "",
        asunto: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <span className="flex grow h-0.5 bg-[#6E9B8A] rounded-full"></span>
      <h2 className="text-4xl mt-20 mb-10 md:mb-0">
        <strong>{t('contact.title')}</strong>
      </h2>

      <div className="flex flex-col md:flex-row md:items-center gap-12 lg:gap-20">

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 w-full md:flex-3"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#D3E9E7] dark:bg-[#244A42] text-black dark:text-white rounded-md px-4 py-2"
            required
          />

          <input
            type="text"
            name="asunto"
            placeholder={t('contact.pHolderSubject')}
            value={formData.asunto}
            onChange={handleChange}
            className="bg-[#D3E9E7] dark:bg-[#244A42] text-black dark:text-white rounded-md px-4 py-2"
            required
          />

          <textarea
            name="message"
            placeholder={t('contact.pHolderMessage')}
            value={formData.message}
            onChange={handleChange}
            className="bg-[#D3E9E7] dark:bg-[#244A42] text-black dark:text-white rounded-md px-4 py-2"
            rows={4}
            required
          />

          <Button onClick={handleSubmit} variant="primary" text={loading ? t('contact.loadButton') : t('contact.button')}
          />
        </form>

        {/* IMAGEN */}
        <div className="hidden md:flex md:flex-2 justify-center mb-20">
          <div className="h-72 w-72 lg:h-91 lg:w-91 border-6 border-white dark:border-black/20 rounded-full shadow-2xl overflow-hidden">
            <Image
              src="/imgs/contact/contactImage.png"
              height={365}
              width={365}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <span className="flex grow h-0.5 bg-[#6E9B8A] rounded-full"></span>
    </div>
  );
}