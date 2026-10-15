
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  LandPlot,
  Users,
  Trees,
} from "lucide-react";

import styles from "./Sobre.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  {
    icon: LandPlot,
    title: "180 mil m²",
    description: "Área planejada do projeto",
  },
  {
    icon: Users,
    title: "Toda a família",
    description: "Experiências para todas as idades",
  },
  {
    icon: Trees,
    title: "Natureza e fé",
    description: "Espaços de contemplação",
  },
];

export default function Sobre() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1.08, 1, 1.04]
  );

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={styles.section}
    >
      {/* ===================================
          BANNER PRINCIPAL
      =================================== */}

      <div className={styles.banner}>
        {/* IMAGEM RESPONSIVA COM PARALLAX */}

        <motion.div
          className={styles.imageWrapper}
          style={{
            y: reduceMotion ? 0 : imageY,
            scale: reduceMotion ? 1 : imageScale,
          }}
        >
          <picture className={styles.picture}>
            {/* IMAGEM MOBILE / TABLET */}
            <source
              media="(max-width: 850px)"
              srcSet="/images/img2.png"
            />

            {/* IMAGEM DESKTOP */}
            <img
              src="/images/img1.png"
              alt="Visitantes caminhando em direção a um grande arco de pedra no Parque da Fé"
              className={styles.backgroundImage}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>

        {/* DEGRADÊ SOBRE A IMAGEM */}

        <div className={styles.overlay} />

        {/* CONTEÚDO */}

        <div className={styles.container}>
          <motion.div
            className={styles.content}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              staggerChildren: reduceMotion ? 0 : 0.16,
            }}
          >
            {/* TEXTO SUPERIOR */}

            <motion.span
              className={styles.eyebrow}
              variants={fadeUp}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                ease,
              }}
            >
              UM DESTINO ÚNICO
            </motion.span>

            {/* TÍTULO */}

            <motion.h2
              className={styles.title}
              variants={fadeUp}
              transition={{
                duration: reduceMotion ? 0 : 0.95,
                ease,
              }}
            >
              Fé, cultura, lazer
              <br />
              e experiências
              <br />
              <em>em um só lugar.</em>
            </motion.h2>

            {/* DESCRIÇÃO */}

            <motion.p
              className={styles.description}
              variants={fadeUp}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease,
              }}
            >
              O Parque da Fé foi idealizado para receber
              visitantes de todas as partes, em um ambiente
              inspirador, seguro e com uma infraestrutura
              completa.
            </motion.p>

            {/* BOTÃO */}

            <motion.a
              href="#atracoes"
              className={styles.button}
              variants={fadeUp}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.035,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
            >
              SAIBA MAIS

              <ArrowRight
                size={17}
                strokeWidth={2}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ===================================
          FAIXA DE INFORMAÇÕES
      =================================== */}

      <div className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className={styles.stat}
                key={item.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                        scale: 0.96,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  delay: reduceMotion
                    ? 0
                    : index * 0.14,
                  ease,
                }}
              >
                {/* ÍCONE */}

                <motion.div
                  className={styles.statIcon}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.12,
                          rotate: 5,
                        }
                  }
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <Icon
                    size={25}
                    strokeWidth={1.6}
                  />
                </motion.div>

                {/* TEXTO */}

                <div className={styles.statText}>
                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
