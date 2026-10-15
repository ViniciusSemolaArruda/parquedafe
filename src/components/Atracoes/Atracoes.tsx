"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronRight,
  X,
  MapPin,
} from "lucide-react";
import styles from "./Atracoes.module.css";

type Atracao = {
  nome: string;
  descricao: string;
  descricaoCompleta: string;
  imagem: string;
  slug: string;
};

const atracoes: Atracao[] = [
  {
    nome: "Arena da Fé",
    descricao: "Grandes eventos e espetáculos.",
    descricaoCompleta:
      "A Arena da Fé é um espaço planejado para receber grandes encontros, celebrações, apresentações culturais e eventos especiais. Um ambiente de convivência e emoção, onde visitantes poderão compartilhar experiências marcantes em um cenário inspirado na espiritualidade e na união entre as pessoas.",
    imagem: "/images/arena.png",
    slug: "arena-da-fe",
  },
  {
  nome: "Rua Principal",
  descricao: "Lojas, restaurantes, experiências e desfiles religiosos.",
  descricaoCompleta:
    "A Rua Principal será um dos principais espaços de circulação e convivência do Parque da Fé. Um ambiente pensado para conectar as atrações e reunir lojas, restaurantes e experiências para os visitantes. Além disso, será palco de desfiles e celebrações religiosas, como o tradicional Encontro de Folia de Reis, valorizando a fé, a cultura e as tradições populares. Um espaço onde espiritualidade, entretenimento e convivência se encontram, proporcionando momentos únicos e inesquecíveis para toda a família.",
  imagem: "/images/rua.png",
  slug: "rua-principal",
},
  {
    nome: "Monte das Oliveiras",
    descricao: "Um lugar de reflexão e contemplação.",
    descricaoCompleta:
      "Inspirado em um dos lugares mais conhecidos da história bíblica, o Monte das Oliveiras será um ambiente dedicado à contemplação, à tranquilidade e ao contato com a natureza. Sua proposta é oferecer aos visitantes uma experiência de reflexão em meio a uma paisagem cuidadosamente planejada.",
    imagem: "/images/monte.png",
    slug: "monte-das-oliveiras",
  },
  {
    nome: "Rio Jordão",
    descricao: "Uma experiência temática em meio à natureza.",
    descricaoCompleta:
      "Inspirado no Rio Jordão, conhecido por sua importância histórica e religiosa, este espaço busca proporcionar uma experiência temática e contemplativa. A presença da água e o paisagismo criam um ambiente especial para conhecer referências da tradição bíblica e apreciar a beleza do parque.",
    imagem: "/images/rio.png",
    slug: "rio-jordao",
  },
  {
    nome: "Área Kids",
    descricao: "Diversão e aprendizado para as crianças.",
    descricaoCompleta:
      "Um espaço pensado para os pequenos visitantes, onde a diversão e as descobertas fazem parte da experiência. A Área Kids tem como proposta reunir atividades recreativas e oportunidades de convivência para que as famílias possam compartilhar momentos especiais.",
    imagem: "/images/kids.png",
    slug: "area-kids",
  },
  {
    nome: "Praça de Alimentação",
    descricao: "Gastronomia para toda a família.",
    descricaoCompleta:
      "A Praça de Alimentação será um ambiente dedicado à gastronomia, ao descanso e à convivência. Planejada para receber visitantes e famílias, oferecerá um espaço confortável para fazer uma pausa durante o passeio e aproveitar momentos agradáveis ao redor da mesa.",
    imagem: "/images/praca.png",
    slug: "praca-de-alimentacao",
  },
  {
    nome: "Hotel",
    descricao: "Conforto para sua experiência ser completa.",
    descricaoCompleta:
      "O hotel integra a proposta de transformar o Parque da Fé em um destino de visitação e permanência. Pensado para oferecer acolhimento, conforto e praticidade, permitirá que os visitantes aproveitem a experiência do parque com mais tranquilidade.",
    imagem: "/images/hotel.png",
    slug: "hotel",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Atracoes() {
  const reduceMotion = useReducedMotion();

  const [atracaoAtiva, setAtracaoAtiva] =
    useState<Atracao | null>(null);

  const [portalRoot, setPortalRoot] =
    useState<HTMLElement | null>(null);

  const fecharRef = useRef<HTMLButtonElement>(null);
  const focoAnteriorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.createElement("div");
    root.setAttribute("data-atracoes-portal", "true");
    document.body.appendChild(root);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalRoot(root);

    return () => root.remove();
  }, []);

  useEffect(() => {
    if (!atracaoAtiva) return;

    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      fecharRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAtracaoAtiva(null);
      }

      if (event.key === "Tab") {
        const modal = document.querySelector<HTMLElement>(
          '[data-atracoes-modal="true"]'
        );

        if (!modal) return;

        const elementos = Array.from(
          modal.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );

        if (!elementos.length) return;

        const primeiro = elementos[0];
        const ultimo = elementos[elementos.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === primeiro
        ) {
          event.preventDefault();
          ultimo.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === ultimo
        ) {
          event.preventDefault();
          primeiro.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflowOriginal;
      focoAnteriorRef.current?.focus();
    };
  }, [atracaoAtiva]);

  const abrirAtracao = (atracao: Atracao) => {
    focoAnteriorRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setAtracaoAtiva(atracao);
  };

  const fecharAtracao = () => {
    setAtracaoAtiva(null);
  };

  return (
    <>
      <section id="atracoes" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <motion.div
              className={styles.headingLeft}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                ease,
              }}
            >
              <span className={styles.eyebrow}>
                <span className={styles.sparkle}>✦</span>
                ATRAÇÕES
              </span>

              <h2 className={styles.title}>
                Experiências que
                <br />
                inspiram em cada detalhe.
              </h2>
            </motion.div>

            <motion.div
              className={styles.headingRight}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 25 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: reduceMotion ? 0 : 0.15,
                ease,
              }}
            >
              <p>
                Do encontro com a espiritualidade à diversão
                em família, cada espaço foi pensado para
                proporcionar momentos inesquecíveis.
              </p>

              <a
                href="#lista-atracoes"
                className={styles.viewAll}
              >
                VER TODAS AS ATRAÇÕES
                <ChevronRight size={15} />
              </a>
            </motion.div>
          </div>

          <div id="lista-atracoes" className={styles.grid}>
            {atracoes.map((atracao, index) => (
              <motion.article
                key={atracao.slug}
                className={styles.card}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 34,
                        scale: 0.97,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion
                    ? 0
                    : (index % 5) * 0.085,
                  ease,
                }}
                whileHover={
                  reduceMotion ? undefined : { y: -7 }
                }
              >
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => abrirAtracao(atracao)}
                  aria-label={`Saiba mais sobre ${atracao.nome}`}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={atracao.imagem}
                      alt={atracao.nome}
                      fill
                      sizes="(max-width: 600px) 85vw, (max-width: 1100px) 40vw, 20vw"
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardText}>
                      <h3>{atracao.nome}</h3>
                      <p>{atracao.descricao}</p>
                    </div>

                    <span className={styles.arrow}>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {portalRoot &&
        createPortal(
          <AnimatePresence mode="wait">
            {atracaoAtiva && (
              <motion.div
                key={atracaoAtiva.slug}
                className={styles.modalBackdrop}
                initial={
                  reduceMotion ? false : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="atracao-modal-titulo"
                data-atracoes-modal="true"
                onMouseDown={(event) => {
                  if (
                    event.target === event.currentTarget
                  ) {
                    fecharAtracao();
                  }
                }}
              >
                <motion.div
                  className={styles.modalCard}
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
                    y: 16,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    ease,
                  }}
                >
                  <button
                    ref={fecharRef}
                    type="button"
                    className={styles.modalClose}
                    onClick={fecharAtracao}
                    aria-label="Fechar atração"
                  >
                    <X size={23} />
                  </button>

                  <div className={styles.modalImage}>
                    <Image
                      src={atracaoAtiva.imagem}
                      alt={atracaoAtiva.nome}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.modalImageContent}
                    />
                  </div>

                  <div className={styles.modalBody}>
                    <span className={styles.modalEyebrow}>
                      <MapPin size={16} />
                      CONHEÇA O PARQUE DA FÉ
                    </span>

                    <h3 id="atracao-modal-titulo">
                      {atracaoAtiva.nome}
                    </h3>

                    <span className={styles.modalDivider} />

                    <p>{atracaoAtiva.descricaoCompleta}</p>

                    <a
                      href="#mapa"
                      className={styles.modalLink}
                      onClick={fecharAtracao}
                    >
                      EXPLORAR NO MAPA
                      <ChevronRight size={18} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </>
  );
}