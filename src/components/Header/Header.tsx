
"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import styles from "./Header.module.css";

const leftLinks = [
  { label: "O Parque", href: "#sobre" },
  { label: "Atrações", href: "#atracoes" },
];

const rightLinks = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Mapa", href: "#mapa" },
  { label: "Contato", href: "#contato" },
];

const allLinks = [...leftLinks, ...rightLinks];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const reduceMotion = useReducedMotion();

  // Detecta a rolagem da página
  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  // Fecha o menu com ESC
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Fecha o menu ao voltar para o desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 851px)"
    );

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleResize
      );
    };
  }, []);

  // Navegação para o início exato de cada seção
  const navigateTo = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const id = href.replace("#", "");

    const section =
      id === "inicio"
        ? null
        : document.getElementById(id);

    if (id !== "inicio" && !section) {
      console.warn(
        `A seção com id="${id}" não foi encontrada.`
      );

      setOpen(false);
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Não desconta a altura do Header
    const targetTop =
      id === "inicio"
        ? 0
        : section!.getBoundingClientRect().top +
          window.scrollY;

    // Atualiza a URL
    window.history.replaceState(null, "", href);

    // Fecha o menu mobile
    setOpen(false);

    // Executa a rolagem após atualizar o menu
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: targetTop,
          behavior: prefersReducedMotion
            ? "instant"
            : "smooth",
        });
      });
    });
  };

  const navAnimation = {
    initial: reduceMotion
      ? false
      : { opacity: 0, y: -18 },

    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.header
      className={`${styles.header} ${
        scrolled ? styles.scrolled : ""
      }`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: -25 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        ease,
      }}
    >
      <div className={styles.container}>
        {/* LINKS ESQUERDA */}
        <nav
          className={`${styles.nav} ${styles.navLeft}`}
          aria-label="Navegação esquerda"
        >
          {leftLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                navigateTo(event, link.href)
              }
              initial={navAnimation.initial}
              animate={navAnimation.animate}
              transition={{
                duration: 0.7,
                delay: 0.35 + index * 0.1,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -2 }
              }
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* LOGO CENTRAL */}
        <motion.a
          href="#inicio"
          className={styles.logo}
          aria-label="Parque da Fé - Início"
          onClick={(event) =>
            navigateTo(event, "#inicio")
          }
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: -20,
                  scale: 0.94,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.035 }
          }
        >
          <Image
            src="/images/logo.png"
            alt="Parque da Fé"
            width={360}
            height={360}
            priority
            className={styles.logoImage}
          />
        </motion.a>

        {/* LINKS DIREITA */}
        <nav
          className={`${styles.nav} ${styles.navRight}`}
          aria-label="Navegação direita"
        >
          {rightLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                navigateTo(event, link.href)
              }
              initial={navAnimation.initial}
              animate={navAnimation.animate}
              transition={{
                duration: 0.7,
                delay: 0.55 + index * 0.1,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -2 }
              }
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* BOTÃO PRINCIPAL */}
        <motion.a
          href="#contato"
          className={styles.cta}
          onClick={(event) =>
            navigateTo(event, "#contato")
          }
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 18 }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.9,
            ease,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.045 }
          }
          whileTap={
            reduceMotion
              ? undefined
              : { scale: 0.97 }
          }
        >
          <span>PLANEJE SUA VISITA</span>
          <ArrowUpRight
            size={18}
            strokeWidth={2.2}
          />
        </motion.a>

        {/* BOTÃO HAMBÚRGUER */}
        <motion.button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={
            open ? "Fechar menu" : "Abrir menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
          whileTap={
            reduceMotion
              ? undefined
              : { scale: 0.9 }
          }
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={open ? "close" : "menu"}
              className={styles.menuIcon}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }
              }
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }
              }
              transition={{
                duration: 0.2,
              }}
            >
              {open ? (
                <X size={27} />
              ) : (
                <Menu size={27} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className={styles.mobileNav}
            aria-label="Navegação mobile"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -15,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -10,
                    height: 0,
                  }
            }
            transition={{
              duration: reduceMotion
                ? 0
                : 0.4,
              ease,
            }}
          >
            {allLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(event) =>
                  navigateTo(event, link.href)
                }
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -12,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        x: -8,
                      }
                }
                transition={{
                  duration: 0.35,
                  delay: reduceMotion
                    ? 0
                    : 0.08 + index * 0.055,
                }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* CTA MOBILE */}
            <motion.a
              href="#contato"
              className={styles.mobileCta}
              onClick={(event) =>
                navigateTo(event, "#contato")
              }
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.4,
                delay: reduceMotion
                  ? 0
                  : 0.4,
                ease,
              }}
            >
              PLANEJE SUA VISITA
              <ArrowUpRight size={18} />
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
