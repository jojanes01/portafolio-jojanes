"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certificates, Certificate } from "app/data/certificates";
import Image from "next/image";
import { useMediaQuery } from "app/hooks/useMediaQuery";
import { useTranslations } from "next-intl";

// --- MAPA DE ICONOS ---
const categoryIcons: Record<string, string> = {
  Frontend: "icon-[tabler--brand-html5]",
  Backend: "icon-[tabler--server]",
  "Product & Business": "icon-[tabler--chart-line]",
  "DevOps & Tools": "icon-[tabler--automation]",
  Languages: "icon-[tabler--book]",
  "Soft Skills": "icon-[tabler--users]",
};

// --- SUB-COMPONENTE: MODAL ---
const CertificateModal = ({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-jojanes-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-jojanes-dark border-2 border-jojanes-border rounded-lg p-6 max-w-4xl w-full shadow-2xl shadow-jojanes-green/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-jojanes-green mb-4">
          {certificate.title}
        </h3>
        <p className="text-jojanes-subtitle mb-4">
          {certificate.issuer} - {certificate.year}
        </p>
        <div className="relative w-full h-[40vh] sm:h-[50vh] rounded-md overflow-hidden bg-jojanes-gray">
          <Image
            src={certificate.imageUrl}
            alt={certificate.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-jojanes-white hover:text-jojanes-green transition-colors"
        >
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- SUB-COMPONENTE: NODO DE LA GALAXIA (ESCRITORIO) ---
const CertificateNode = ({
  certificate,
  onClick,
  onHover,
  hoveredCategory,
  activeFilter,
}: {
  certificate: Certificate;
  onClick: () => void;
  onHover: (category: string | null) => void;
  hoveredCategory: string | null;
  activeFilter: string | null;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const position = useMemo(
    () => ({
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
    }),
    []
  );

  const sizeClasses = {
    1: "w-24 h-24 md:w-32 md:h-32",
    2: "w-16 h-16 md:w-20 md:h-20",
    3: "w-10 h-10 md:w-12 md:h-12",
  };
  const iconSizeClasses = { 1: "text-5xl", 2: "text-3xl", 3: "text-xl" };
  const isDimmed =
    (activeFilter && activeFilter !== certificate.category) ||
    (hoveredCategory && hoveredCategory !== certificate.category);

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 1.5 }}
      onHoverStart={() => {
        setIsHovered(true);
        onHover(certificate.category);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        onHover(null);
      }}
      onClick={onClick}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-jojanes-green text-jojanes-black text-xs font-bold px-3 py-1.5 rounded-md z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {certificate.title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={`rounded-full bg-jojanes-gray/80 backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-300 ${sizeClasses[certificate.importance]} ${certificate.importance === 1 ? "border-jojanes-green/50" : "border-jojanes-border"}`}
        animate={{
          y: isHovered ? "0%" : [`0%`, `${Math.random() * 15 - 7.5}%`, `0%`],
          opacity: isDimmed ? 0.2 : 1,
          scale: isHovered ? 1.15 : 1,
          boxShadow: isHovered
            ? `0 0 35px 8px rgba(42, 233, 141, ${0.25 * (4 - certificate.importance)})`
            : "0 0 0px 0px rgba(42, 233, 141, 0)",
        }}
        transition={{
          y: {
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
          default: { duration: 0.4, ease: "easeOut" },
        }}
      >
        <span
          className={`${categoryIcons[certificate.category]} ${iconSizeClasses[certificate.importance]} text-jojanes-white/70 group-hover:text-jojanes-green transition-colors duration-300`}
        />
      </motion.div>
    </motion.div>
  );
};

// --- CONTENEDOR VISTA ESCRITORIO ---
const CertificateGalaxy = ({
  onNodeClick,
  activeFilter,
  hoveredCategory,
  setHoveredCategory,
}: any) => (
  <motion.div
    className="relative w-full h-[120vh] rounded-lg border-2 border-jojanes-border overflow-hidden p-4 starry-background"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.4 }}
  >
    <div className="stars-layer1"></div>
    <div className="stars-layer2"></div>
    <div className="stars-layer3"></div>
    {certificates.map((cert) => (
      <CertificateNode
        key={`node-${cert.id}`}
        certificate={cert}
        onClick={() => onNodeClick(cert)}
        onHover={setHoveredCategory}
        hoveredCategory={hoveredCategory}
        activeFilter={activeFilter}
      />
    ))}
  </motion.div>
);

// --- CONTENEDOR VISTA MÓVIL ---
const CertificateList = ({ onNodeClick, activeFilter }: any) => {
  const filteredCertificates = useMemo(
    () =>
      activeFilter
        ? certificates.filter((c) => c.category === activeFilter)
        : certificates,
    [activeFilter]
  );
  const groupedCertificates = filteredCertificates.reduce(
    (acc, cert) => {
      (acc[cert.category] = acc[cert.category] || []).push(cert);
      return acc;
    },
    {} as Record<string, Certificate[]>
  );
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full">
      {Object.entries(groupedCertificates).map(([category, certs]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold text-jojanes-green mb-4 text-left">
            {category}
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-4"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {certs.map((cert) => (
              <motion.div
                key={`list-${cert.id}`}
                className="bg-jojanes-gray border border-jojanes-border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-jojanes-gray-dark transition-colors"
                variants={itemVariants}
                onClick={() => onNodeClick(cert)}
              >
                <span
                  className={`${categoryIcons[cert.category]} text-3xl text-jojanes-green flex-shrink-0`}
                />
                <div className="text-left">
                  <h3 className="font-bold text-jojanes-white">{cert.title}</h3>
                  <p className="text-sm text-jojanes-subtitle">
                    {cert.issuer} - {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function LearningPage() {
  const t = useTranslations("Learning");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const categories = useMemo(
    () => Array.from(new Set(certificates.map((c) => c.category))),
    []
  );

  return (
    <section className="w-full min-h-screen bg-jojanes-dark text-jojanes-white py-20">
      <div className="container mx-auto text-center px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {t.rich("title", {
            p: (chunks) => <span className="text-jojanes-green">{chunks}</span>,
          })}
        </motion.h1>
        <motion.p
          className="text-lg text-jojanes-subtitle max-w-2xl mx-auto mb-12"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Una constelación de mis logros y estudios. Filtra por categoría o
          explora el universo completo.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-4 py-2 text-sm rounded-full border-2 transition-colors ${!activeFilter ? "bg-jojanes-green text-jojanes-black border-jojanes-green" : "bg-transparent border-jojanes-border hover:border-jojanes-green-dark"}`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === category ? "bg-jojanes-green text-jojanes-black border-jojanes-green" : "bg-transparent border-jojanes-border hover:border-jojanes-green-dark"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {isMobile ? (
            <CertificateList
              onNodeClick={setSelectedCertificate}
              activeFilter={activeFilter}
            />
          ) : (
            <CertificateGalaxy
              onNodeClick={setSelectedCertificate}
              activeFilter={activeFilter}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
            />
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
