/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Play,
  X,
  ArrowUpRight,
  Volume2,
} from "lucide-react";

import styles from "./Experiencia.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experiencia() {
  const [showVideo, setShowVideo] = useState(false);
  const [portalRoot, setPortalRoot] =
    useState<HTMLElement | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.1, 1, 1.1]
  );

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-3%", "3%"]
  );

  useEffect(() => {
    const root = document.createElement("div");
    root.setAttribute("data-video-portal", "true");
    document.body.appendChild(root);

    setPortalRoot(root);

    return () => {
      root.remove();
    };
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    previewRef.current?.pause();

    const frame = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVideo(false);
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(
          '[data-video-modal="true"]'
        );

        if (!modal) return;

        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), video[controls], a[href], [tabindex]:not([tabindex="-1"])'
          )
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();

      previewRef.current?.play().catch(() => {});
    };
  }, [showVideo]);

  const openVideo = () => setShowVideo(true);

  const closeVideo = () => {
    fullVideoRef.current?.pause();
    setShowVideo(false);
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="experiencia"
        className={styles.section}
        aria-label="Conheça o Parque da Fé em vídeo"
      >
        {/* VÍDEO DE FUNDO COM MOVIMENTO SUAVE */}
        <motion.div
          className={styles.videoBackground}
          style={{
            scale: reduceMotion ? 1 : backgroundScale,
            y: reduceMotion ? 0 : backgroundY,
          }}
        >
          <video
            ref={previewRef}
            className={styles.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/fundovideo.png"
          >
            <source
              src="/videos/parque-da-fe.mp4"
              type="video/mp4"
            />
          </video>

          <div className={styles.overlay} />
          <div className={styles.vignette} />
        </motion.div>

        {/* CONTEÚDO CENTRAL */}
        <motion.div
          className={styles.content}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            staggerChildren: reduceMotion ? 0 : 0.18,
          }}
        >
          <motion.div
            className={styles.topDetail}
            variants={fadeUp}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease,
            }}
          >
            <span className={styles.line} />
            <span>UMA EXPERIÊNCIA INESQUECÍVEL</span>
            <span className={styles.line} />
          </motion.div>

          <motion.h2
            className={styles.title}
            variants={fadeUp}
            transition={{
              duration: reduceMotion ? 0 : 1,
              ease,
            }}
          >
            Viva o extraordinário.
            <br />
            <em>Sinta a fé.</em>
          </motion.h2>

          <motion.p
            className={styles.description}
            variants={fadeUp}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease,
            }}
          >
            Uma jornada onde história, espiritualidade,
            cultura e emoção se encontram.
            Descubra um lugar feito para transformar
            momentos em memórias inesquecíveis.
          </motion.p>

          {/* BOTÃO PRINCIPAL */}
          <motion.button
            ref={triggerRef}
            type="button"
            className={styles.watchButton}
            onClick={openVideo}
            aria-label="Assistir ao vídeo completo do Parque da Fé"
            variants={fadeUp}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              ease,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, scale: 1.035 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
          >
            <span className={styles.playIcon}>
              <Play
                size={23}
                fill="currentColor"
                strokeWidth={1.5}
              />
            </span>

            <span className={styles.watchText}>
              <strong>ASSISTA AO FILME</strong>
              <small>Conheça o Parque da Fé</small>
            </span>

            <ArrowUpRight
              className={styles.watchArrow}
              size={19}
            />
          </motion.button>
        </motion.div>

        {/* DETALHES INFERIORES */}
        <motion.div
          className={styles.bottomBar}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.4,
            ease,
          }}
        >
          <div className={styles.bottomLeft}>
            <span className={styles.bottomDot} />
            <span>PARQUE DA FÉ</span>
            <span className={styles.bottomSeparator}>/</span>
            <span>UMA NOVA EXPERIÊNCIA</span>
          </div>

          <div className={styles.bottomRight}>
            <Volume2 size={15} />
            <span>ATIVAR SOM NO FILME</span>
          </div>
        </motion.div>
      </section>

      {/* MODAL COM TRANSIÇÃO CINEMATOGRÁFICA */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {showVideo && (
              <motion.div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Vídeo completo do Parque da Fé"
                data-video-modal="true"
                initial={
                  reduceMotion ? false : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    closeVideo();
                  }
                }}
              >
                <motion.button
                  ref={closeRef}
                  type="button"
                  className={styles.close}
                  onClick={closeVideo}
                  aria-label="Fechar vídeo"
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, rotate: -60 }
                  }
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    ease,
                  }}
                >
                  <X size={25} />
                </motion.button>

                <motion.div
                  className={styles.modalContent}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 35,
                          scale: 0.96,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease,
                  }}
                >
                  <div className={styles.modalHeading}>
                    <span>PARQUE DA FÉ</span>
                    <strong>UMA EXPERIÊNCIA ÚNICA</strong>
                  </div>

                  <div className={styles.videoWrapper}>
                    <video
                      ref={fullVideoRef}
                      className={styles.fullVideo}
                      src="/images/Parque-da-Fé.mp4"
                      poster="/images/hero.png"
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      tabIndex={0}
                    >
                      Seu navegador não suporta reprodução
                      de vídeos.
                    </video>
                  </div>

                  <p className={styles.modalCaption}>
                    Descubra o Parque da Fé.
                    Uma jornada de fé, cultura e experiências.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </>
  );
}
