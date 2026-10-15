
"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import styles from "./Footer.module.css";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "O Parque", href: "#sobre" },
  { label: "Atrações", href: "#atracoes" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Mapa", href: "#mapa" },
  { label: "Contato", href: "#contato" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const revealTransition = {
    duration: reduceMotion ? 0 : 0.75,
    ease,
  };

  return (
    <footer id="contato" className={styles.footer}>
      {/* ÁREA PRINCIPAL */}
      <div className={styles.main}>
        <div className={styles.container}>
          <motion.div
            className={styles.top}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              staggerChildren: reduceMotion ? 0 : 0.13,
            }}
          >
            {/* MARCA */}
            <motion.div
              className={styles.brand}
              variants={reveal}
              transition={revealTransition}
            >
              <motion.a
                href="#inicio"
                className={styles.logoLink}
                aria-label="Parque da Fé - Início"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, scale: 1.02 }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.98 }
                }
              >
                <Image
                  src="/images/logo.png"
                  alt="Parque da Fé"
                  width={300}
                  height={230}
                  className={styles.logo}
                />
              </motion.a>

              <p className={styles.brandDescription}>
                Um lugar onde a fé, a cultura e a
                convivência se encontram para criar
                experiências inesquecíveis.
              </p>
            </motion.div>

            {/* NAVEGAÇÃO */}
            <motion.nav
              className={styles.links}
              aria-label="Navegação do rodapé"
              variants={reveal}
              transition={revealTransition}
            >
              <h3 className={styles.columnTitle}>
                Explore
              </h3>

              <span className={styles.titleLine} />

              <div className={styles.linksList}>
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className={styles.navLink}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, x: -12 }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.5,
                      delay: reduceMotion
                        ? 0
                        : 0.15 + index * 0.065,
                      ease,
                    }}
                  >
                    {item.label}
                    <ChevronRight size={14} />
                  </motion.a>
                ))}
              </div>
            </motion.nav>

            {/* CONTATO */}
            <motion.div
              className={styles.contact}
              variants={reveal}
              transition={revealTransition}
            >
              <h3 className={styles.columnTitle}>
                Contato
              </h3>

              <span className={styles.titleLine} />

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Mail size={20} />
                  <span>Informações em breve</span>
                </div>

                <div className={styles.contactItem}>
                  <MapPin size={21} />
                  <span>Rio de Janeiro, RJ</span>
                </div>
              </div>

              {/* REDES SOCIAIS */}
              <div className={styles.socialSection}>
                <h3 className={styles.columnTitle}>
                  Nos siga
                </h3>

                <span className={styles.titleLine} />

                <div className={styles.social}>
                  <motion.a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className={styles.socialLink}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -4, scale: 1.08 }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : { scale: 0.95 }
                    }
                  >
                    <FaInstagram size={20} />
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className={styles.socialLink}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -4, scale: 1.08 }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : { scale: 0.95 }
                    }
                  >
                    <FaFacebookF size={19} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* CHAMADA FINAL */}
            <motion.div
              className={styles.news}
              variants={reveal}
              transition={revealTransition}
            >
              <h3 className={styles.columnTitle}>
                Viva essa experiência
              </h3>

              <span className={styles.titleLine} />

              <p>
                Descubra um destino feito para
                toda a família.
              </p>

              <motion.a
                href="#inicio"
                className={styles.button}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, scale: 1.025 }
                }
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.97 }
                }
              >
                Voltar ao início
                <ArrowUpRight size={19} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===================================
          REALIZAÇÃO E APOIO
      =================================== */}
      <div className={styles.partnersSection}>
        <div className={styles.partnersContainer}>
          <motion.div
            className={styles.partners}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 35 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease,
            }}
          >
            {/* REALIZAÇÃO */}
            <div className={styles.partner}>
              <h3 className={styles.partnerTitle}>
                Realização
              </h3>

              <span className={styles.partnerTitleLine} />

              <div className={styles.partnerLogo}>
                <Image
                  src="/images/logoproducao.png"
                  alt="Logo da realização"
                  width={700}
                  height={350}
                  className={styles.partnerImage}
                />
              </div>
            </div>

            {/* APOIO */}
            <div className={styles.partner}>
              <h3 className={styles.partnerTitle}>
                Apoio
              </h3>

              <span className={styles.partnerTitleLine} />

              <div className={styles.partnerLogo}>
                <Image
                  src="/images/logoapio.png"
                  alt="Logo do apoio"
                  width={700}
                  height={350}
                  className={styles.partnerImage}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===================================
          COPYRIGHT
      =================================== */}
      <div className={styles.bottom}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            <span className={styles.goldDot} />
            © 2026 Parque da Fé. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
