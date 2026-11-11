"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";

import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  readonly links: ReadonlyArray<{ readonly href: string; readonly label: string }>;
  readonly whatsappHref: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Menu em tela cheia para celular: diálogo acessível com foco preso, Esc e bloqueio de rolagem. */
export function MobileMenu({ links, whatsappHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  /** Devolve o foco ao botão só quando o menu fecha por Esc/botão (não ao seguir um link). */
  const restoreFocus = useRef(true);

  const close = (returnFocus: boolean) => {
    restoreFocus.current = returnFocus;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const toggle = toggleRef.current;
    root.classList.add("menu-open");
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocus.current = true;
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 761px)");
    const onBreakpoint = () => {
      if (desktop.matches) {
        restoreFocus.current = false;
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      root.classList.remove("menu-open");
      if (restoreFocus.current) toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Abrir menu"
        onClick={() => {
          restoreFocus.current = true;
          setOpen(true);
        }}
      >
        <Icon name="menu" />
      </button>

      <div
        id={panelId}
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className={styles.top}>
          <Logo />
          <button
            type="button"
            className={styles.toggle}
            aria-label="Fechar menu"
            onClick={() => close(true)}
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Menu principal">
          <ul className={styles.list}>
            {links.map((link, index) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={() => close(false)}>
                  <span className={styles.num} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href={whatsappHref} external icon="whatsapp" className={styles.cta}>
          Agendar pelo WhatsApp
        </ButtonLink>
      </div>
    </>
  );
}
