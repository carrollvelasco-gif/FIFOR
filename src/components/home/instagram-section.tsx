"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const instagramPosts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  image: "/placeholder.svg",
  likes: Math.floor(Math.random() * 500) + 100,
}));

export function InstagramSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Redes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
            Síguenos en Instagram
          </h2>
          <p className="mt-2 text-muted-foreground">
            Comparte tus looks con{" "}
            <span className="font-semibold text-[#2D5A3D]">#FIFORstyle</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square bg-[#F5F0EB] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8D5BA]/20 to-[#D4C5A9]/20" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] text-white/70 bg-black/30 px-1.5 py-0.5 rounded">
                ❤ {post.likes}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2D5A3D] hover:text-[#1E3D29] transition-colors"
          >
            <ExternalLink size={18} />
            @fifor.moda
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
