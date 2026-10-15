
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

import styles from "./Hero.module.css";

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "18%"]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "85px"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.8, 0]
  );

  return (
    <section
      ref={heroRef}
      id="inicio"
      className={styles.hero}
    >
      {/* Imagem de fundo com zoom e parallax */}
      <motion.div
        className={styles.background}
        aria-hidden="true"
        style={{
          y: reduceMotion ? 0 : backgroundY,
        }}
        initial={reduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.2,
          ease: cinematicEase,
        }}
      />

      {/* Camada escura para leitura */}
      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      {/* Conteúdo principal */}
      <motion.div
        className={styles.content}
        style={{
          y: reduceMotion ? 0 : contentY,
          opacity: reduceMotion ? 1 : contentOpacity,
        }}
      >
        <h1 className={styles.title}>
          <motion.span
            className={styles.titleTop}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -35,
                    filter: "blur(8px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: cinematicEase,
            }}
          >
            PARQUE DA
          </motion.span>

          <motion.span
            className={styles.titleMain}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                    filter: "blur(12px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: cinematicEase,
            }}
          >
            FÉ
          </motion.span>
        </h1>

        {/* Subtítulo */}
        <motion.p
          className={styles.subtitle}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 1.05,
            ease: cinematicEase,
          }}
        >
          UM LUGAR PARA VIVER HISTÓRIAS
          <br />
          QUE TRANSFORMAM.
        </motion.p>

        {/* Botão principal */}
        <motion.a
          href="#sobre"
          className={styles.primary}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                  scale: 0.95,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            delay: 1.3,
            ease: cinematicEase,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -4,
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
          <span>CONHEÇA O PROJETO</span>
          <ArrowRight size={19} strokeWidth={2.2} />
        </motion.a>
      </motion.div>

      {/* Indicador de rolagem */}
      <motion.a
        href="#atracoes"
        className={styles.scroll}
        aria-label="Role para explorar o parque"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
              }
        }
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.8,
        }}
      >
        <span className={styles.mouse}>
          <span className={styles.mouseWheel} />
        </span>

        <span className={styles.scrollText}>
          ROLE PARA EXPLORAR
        </span>

        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className={styles.scrollArrow}
        />
      </motion.a>
    </section>
  );
}
