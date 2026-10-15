/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

import styles from "./Mapa.module.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

const ease = [0.22, 1, 0.36, 1] as const;

export default function Mapa() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [portalRoot, setPortalRoot] =
    useState<HTMLElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const reduceMotion = useReducedMotion();

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const dragRef = useRef({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    const root = document.createElement("div");
    root.setAttribute("data-mapa-portal", "true");
    document.body.appendChild(root);

    setPortalRoot(root);

    return () => root.remove();
  }, []);

  const openMap = () => {
    triggerRef.current =
      document.activeElement instanceof HTMLButtonElement
        ? document.activeElement
        : null;

    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsFullscreen(true);
  };

  const closeMap = () => {
    setIsFullscreen(false);
    setIsDragging(false);
  };

  const resetMap = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(current + ZOOM_STEP, MAX_ZOOM)
    );
  };

  const zoomOut = () => {
    setZoom((current) => {
      const next = Math.max(
        current - ZOOM_STEP,
        MIN_ZOOM
      );

      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return next;
    });
  };

  const handleWheel = (
    event: ReactWheelEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (zoom <= 1) return;

    event.preventDefault();

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    setIsDragging(true);

    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      startX: position.x,
      startY: position.y,
    };
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging || zoom <= 1) return;

    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;

    setPosition({
      x: dragRef.current.startX + deltaX,
      y: dragRef.current.startY + deltaY,
    });
  };

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    setIsDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        setIsDragging(false);
      }

      if (event.key === "+" || event.key === "=") {
        setZoom((current) =>
          Math.min(current + ZOOM_STEP, MAX_ZOOM)
        );
      }

      if (event.key === "-") {
        setZoom((current) =>
          Math.max(current - ZOOM_STEP, MIN_ZOOM)
        );
      }

      if (event.key === "0") {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(
          '[data-mapa-modal="true"]'
        );

        if (!modal) return;

        const focusable = Array.from(
          modal.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isFullscreen]);

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <>
      <section id="mapa" className={styles.section}>
        <div className={styles.container}>
          {/* IMAGEM DO MAPA */}
          <motion.div
            className={styles.mapArea}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, scale: 1.05 }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.1,
              ease,
            }}
          >
            <img
              src="/images/mapa.png"
              alt="Vista aérea do Parque da Fé com suas atrações e espaços de convivência"
              className={styles.mapImage}
            />

            <motion.button
              type="button"
              className={styles.expandButton}
              onClick={openMap}
              aria-label="Visualizar mapa em tela cheia"
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3, scale: 1.03 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.96 }
              }
            >
              <Maximize2 size={18} />
              <span>VER MAPA COMPLETO</span>
            </motion.button>

            <div className={styles.mapHint}>
              <Maximize2 size={15} />
              Explore todos os detalhes do parque
            </div>
          </motion.div>

          {/* CONTEÚDO À DIREITA */}
          <motion.div
            className={styles.content}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              staggerChildren: reduceMotion ? 0 : 0.14,
            }}
          >
            <div className={styles.contentInner}>
              <motion.span
                className={styles.eyebrow}
                variants={contentVariants}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease,
                }}
              >
                EXPLORE
              </motion.span>

              <motion.h2
                className={styles.title}
                variants={contentVariants}
                transition={{
                  duration: reduceMotion ? 0 : 0.85,
                  ease,
                }}
              >
                Um parque
                <br />
                com propósito
              </motion.h2>

              <motion.p
                className={styles.description}
                variants={contentVariants}
                transition={{
                  duration: reduceMotion ? 0 : 0.85,
                  ease,
                }}
              >
                O Parque da Fé é um espaço de
                aproximadamente 180.000 m²,
                projetado para proporcionar
                momentos inesquecíveis de fé,
                cultura, lazer e conhecimento
                para toda a família.
              </motion.p>

              <motion.a
                href="#atracoes"
                className={styles.button}
                variants={contentVariants}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  ease,
                }}
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
                <span>CONHEÇA CADA ATRATIVO</span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                />
              </motion.a>

              <motion.button
                type="button"
                className={styles.secondaryButton}
                onClick={openMap}
                variants={contentVariants}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { x: 5 }
                }
              >
                <Maximize2 size={17} />
                Explorar mapa em tela cheia
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL EM TELA CHEIA */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                className={styles.fullscreen}
                role="dialog"
                aria-modal="true"
                aria-label="Mapa completo do Parque da Fé"
                data-mapa-modal="true"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                }}
              >
                {/* BARRA SUPERIOR */}
                <motion.div
                  className={styles.fullscreenHeader}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: -30 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease,
                  }}
                >
                  <div className={styles.fullscreenHeading}>
                    <span className={styles.fullscreenEyebrow}>
                      PARQUE DA FÉ
                    </span>

                    <h3>Explore nosso mapa</h3>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.closeButton}
                    onClick={closeMap}
                    aria-label="Fechar mapa"
                  >
                    <X size={23} />
                  </button>
                </motion.div>

                {/* ÁREA INTERATIVA */}
                <div
                  className={`${styles.fullscreenMap} ${
                    zoom > 1 ? styles.zoomed : ""
                  } ${
                    isDragging ? styles.dragging : ""
                  }`}
                  onWheel={handleWheel}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <motion.img
                    src="/images/mapa.png"
                    alt="Mapa completo do Parque da Fé"
                    className={styles.fullscreenImage}
                    draggable={false}
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: zoom,
                    }}
                    transition={
                      isDragging || reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 260,
                            damping: 32,
                            mass: 0.8,
                          }
                    }
                  />
                </div>

                {/* CONTROLES */}
                <motion.div
                  className={styles.mapControls}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 20 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : 0.15,
                    ease,
                  }}
                >
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="Diminuir zoom"
                    title="Diminuir zoom"
                  >
                    <ZoomOut size={20} />
                  </button>

                  <span className={styles.zoomValue}>
                    {Math.round(zoom * 100)}%
                  </span>

                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label="Aumentar zoom"
                    title="Aumentar zoom"
                  >
                    <ZoomIn size={20} />
                  </button>

                  <span className={styles.controlDivider} />

                  <button
                    type="button"
                    onClick={resetMap}
                    aria-label="Restaurar mapa"
                    title="Restaurar mapa"
                  >
                    <RotateCcw size={19} />
                  </button>
                </motion.div>

                {/* INSTRUÇÃO */}
                <div className={styles.fullscreenHint}>
                  Use o zoom para ampliar e arraste
                  para explorar o mapa.
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </>
  );
}
