"use client";

import { FormEvent, useEffect, useState } from "react";

const benefitsClinic = [
  "Se integra sin incorporar nuevo equipamiento médico",
  "Complementa el servicio de ecografías 5D existente",
  "Implementación acompañada por el equipo VEO",
  "Una experiencia diferencial para las familias",
];

const faqs = [
  ["¿VEO reemplaza una ecografía médica?", "No. VEO no realiza estudios médicos ni diagnósticos. Trabaja sobre una imagen 5D ya obtenida y genera una recreación visual e ilustrativa."],
  ["¿Qué tipo de imagen se necesita?", "Una ecografía 5D en formato de imagen digital. La calidad del resultado depende de la calidad de la imagen original."],
  ["¿Todas las ecografías sirven?", "No necesariamente. Algunas imágenes pueden no ser aptas por baja resolución, sombras, posición del bebé, obstrucciones o artefactos visuales."],
  ["¿Cuánto tarda el procesamiento?", "La entrega estimada es dentro de las 24 horas hábiles posteriores a la recepción de una ecografía apta. El plazo contempla el procesamiento y la revisión visual del resultado."],
  ["¿La clínica necesita equipamiento adicional?", "No. El sistema está pensado para integrarse al flujo actual, sin requerir nuevo hardware médico."],
];

const comparisonCases = [
  { original: "/ecografia-caso-01.jpeg", processed: "/ecografia-caso-01-procesada.jpeg", label: "Caso 1" },
  { original: "/ecografia-caso-02.jpeg", processed: "/ecografia-caso-02-procesada.jpeg", label: "Caso 2" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`} aria-label="VEO">
      <img className="brand-mark-image" src="/logo-veo-principal.webp" alt="" />
      <strong>VEO</strong>
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);

  return (
    <figure className="veo-slider">
      <div className="veo-slider-head">
        <Logo />
        <span>Comparación real</span>
      </div>
      <div className="veo-slider-stage">
        <img
          className="veo-slider-image"
          src="/veo-ejemplo-01-procesada.jpeg"
          alt="Resultado hiperrealista creado por VEO"
        />
        <div
          className="veo-slider-original"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <img className="veo-slider-image" src="/veo-ejemplo-01-original.jpeg" alt="" />
        </div>
        <span className="veo-slider-label label-original">Ecografía original</span>
        <span className="veo-slider-label label-result">Resultado VEO</span>
        <div className="veo-slider-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span><b>‹</b><b>›</b></span>
        </div>
        <input
          className="veo-slider-range"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Deslizar para comparar la ecografía original con el resultado VEO"
        />
      </div>
      <figcaption>
        <span>Deslizá para comparar</span>
        <small>El resultado depende de la calidad de la imagen original.</small>
      </figcaption>
    </figure>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [type, setType] = useState("Clínica");
  useEffect(() => {
    const selectContactType = (event: Event) => {
      const requestedType = (event as CustomEvent<string>).detail;
      if (requestedType === "Clínica" || requestedType === "Madre o padre" || requestedType === "Otro") {
        setType(requestedType);
      }
    };
    window.addEventListener("veo:contact-type", selectContactType);
    return () => window.removeEventListener("veo:contact-type", selectContactType);
  }, []);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("_subject", `Nueva consulta VEO · ${type}`);
      formData.append("origen", "Landing page VEO");

      const response = await fetch("https://formspree.io/f/mzdnyqrl", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const message = result?.errors?.[0]?.message;
        throw new Error(message || "No pudimos enviar la consulta.");
      }

      setSent(true);
      window.dispatchEvent(new CustomEvent("veo:lead", { detail: { type } }));
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No pudimos enviar la consulta. Intentá nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };
  if (sent) return (
    <div className="success" role="status">
      <span>✓</span>
      <h3>Gracias por acercarte a VEO.</h3>
      <p>Recibimos tu consulta. Nuestro equipo se pondrá en contacto para conversar sobre el próximo paso.</p>
      <button className="text-button" onClick={() => { setSent(false); setSubmitError(""); }}>Enviar otra consulta</button>
    </div>
  );
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input className="form-honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="field"><label htmlFor="name">Nombre y apellido</label><input id="name" name="name" required autoComplete="name" placeholder="¿Cómo te llamás?" /></div>
      <div className="field"><label htmlFor="type">Quiero consultar como</label><select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}><option>Clínica</option><option>Madre o padre</option><option>Otro</option></select></div>
      {type === "Clínica" && <div className="field full"><label htmlFor="clinic">Nombre de la clínica o centro</label><input id="clinic" name="clinic" required autoComplete="organization" placeholder="Nombre de la institución" /></div>}
      <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" name="email" required autoComplete="email" placeholder="nombre@ejemplo.com" /></div>
      <div className="field"><label htmlFor="phone">Teléfono / WhatsApp</label><input id="phone" type="tel" name="phone" required autoComplete="tel" placeholder="+54 9..." /></div>
      <div className="field full"><label htmlFor="message">Mensaje</label><textarea id="message" name="message" rows={4} placeholder="Contanos cómo podemos ayudarte" /></div>
      <label className="consent full"><input type="checkbox" name="consentimiento" value="Aceptado" required /> <span>Acepto ser contactado por VEO en relación con mi consulta y declaro haber leído la <a href="/privacidad" target="_blank" rel="noreferrer">Política de Privacidad</a>.</span></label>
      {submitError && <p className="form-error full" role="alert">{submitError}</p>}
      <button className="button primary full" type="submit" disabled={submitting} data-analytics="contact_submit">
        {submitting ? "Enviando…" : <>Enviar consulta <Arrow /></>}
      </button>
      <p className="form-note full">Tus datos se utilizarán únicamente para responder esta consulta.</p>
    </form>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [processedCases, setProcessedCases] = useState([false, false]);
  const [pageReady, setPageReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = window.localStorage.getItem("veo-theme");
    const initialTheme = stored === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    const frame = window.requestAnimationFrame(() => setTheme(initialTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("veo-theme", nextTheme);
  };
  useEffect(() => {
    const readyTimer = window.setTimeout(() => setPageReady(true), 90);
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".section"));
    const elements: HTMLElement[] = [];
    sections.forEach((section, sectionIndex) => {
      const items = Array.from(section.querySelectorAll<HTMLElement>(
        ".section-label, h2, .section-head>p, .intro-grid>div, .step, .pill-row>.trait-card, .audience-visual, .audience-copy, .check-grid>span, .family-list>li, .veo-slider, .experience-clinic, .platform-grid>article, .faq-list>details, .contact-copy, .form-card"
      ));
      items.forEach((element, itemIndex) => {
        element.classList.add("reveal");
        if (element.matches(".audience-visual, .contact-copy")) element.classList.add("reveal-left");
        if (element.matches(".audience-copy, .form-card")) element.classList.add("reveal-right");
        if (element.matches(".step, .platform-grid>article, .pill-row>.trait-card")) element.classList.add("reveal-card");
        element.style.setProperty("--reveal-delay", `${Math.min(itemIndex, 7) * 105}ms`);
        elements.push(element);
      });
      section.style.setProperty("--section-index", String(sectionIndex));
    });
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => observer.observe(element));
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll-progress", `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      window.clearTimeout(readyTimer);
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return (
    <main className={`site-shell ${pageReady ? "page-ready" : ""}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="header">
        <a href="#inicio"><Logo /></a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Navegación principal">
          <a href="#familias" onClick={() => setMenu(false)}>Para familias</a>
          <a href="#clinicas" onClick={() => setMenu(false)}>Para clínicas</a>
          <a href="#sistema" onClick={() => setMenu(false)}>El sistema</a>
          <a href="#preguntas" onClick={() => setMenu(false)}>Preguntas frecuentes</a>
          <a href="#contacto" onClick={() => setMenu(false)}>Contacto</a>
        </nav>
        <div className="header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "light" ? "Activar modo noche" : "Activar modo día"} title={theme === "light" ? "Modo noche" : "Modo día"}><span aria-hidden="true">{theme === "light" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>}</span></button><a className="button small primary" href="#contacto" data-analytics="header_demo">Solicitar demo</a></div>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menú" aria-expanded={menu}><span/><span/></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Una nueva experiencia a partir de la ecografía 5D</div>
          <h1>La ilusión de conocer su rostro <em>antes de nacer.</em></h1>
          <p className="lead">VEO transforma ecografías 5D en retratos hiperrealistas del bebé, convirtiendo un momento de emoción en un recuerdo único.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contacto" data-analytics="hero_clinic">Solicitar demo para mi clínica <Arrow /></a>
            <a className="button secondary" href="#familias" data-analytics="hero_family">Consultar por el servicio</a>
          </div>
          <p className="legal-line"><span>i</span> Servicio recreativo e ilustrativo. No constituye diagnóstico médico.</p>
        </div>
        <div className="hero-visual" aria-label="Representación artística del servicio VEO">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="comparison-grid" aria-live="polite">
            {comparisonCases.map((item, index) => {
              const processed = processedCases[index];
              return <article className="comparison-card" key={item.label}>
                <div className="comparison-head"><Logo /><span>{item.label}</span></div>
                <div className="comparison-image">
                  <img className={processed ? "" : "is-visible"} src={item.original} alt={`Ecografía 5D original del ${item.label.toLowerCase()}`} />
                  <img className={processed ? "is-visible" : ""} src={item.processed} alt={`Ecografía hiperrealista del ${item.label.toLowerCase()}`} />
                  <span className={`comparison-status ${processed ? "processed" : ""}`}>{processed ? "Ecografía hiperrealista" : "Ecografía original"}</span>
                </div>
                <button
                  className="comparison-toggle"
                  type="button"
                  aria-pressed={processed}
                  onClick={() => setProcessedCases(current => current.map((value, currentIndex) => currentIndex === index ? !value : value))}
                >
                  <span>{processed ? "←" : "→"}</span>{processed ? "Ver ecografía original" : "Ver resultado VEO"}
                </button>
              </article>;
            })}
          </div>
          <div className="floating-note"><span>♡</span><div><strong>Un recuerdo único</strong><small>para guardar y compartir</small></div></div>
        </div>
      </section>

      <section className="intro section">
        <div className="section-label">Qué es VEO</div>
        <div className="intro-grid">
          <h2>Un retrato emocional a partir de una <em>ecografía 5D.</em></h2>
          <div><p>Las ecografías 5D ya forman parte de una experiencia elegida por madres y padres para ver al bebé antes de su nacimiento.</p><p>VEO suma una nueva capa emocional: una recreación hiperrealista e ilustrativa que permite imaginar su primer rostro.</p></div>
        </div>
        <div className="pill-row">
          {[
            ["Ecografía ya realizada", "Trabajamos sobre la imagen 5D existente."],
            ["Sin nuevo equipamiento", "Se suma al circuito actual de la clínica."],
            ["Integración simple", "Una experiencia digital, clara y acompañada."],
            ["Valor emocional", "Un recuerdo diferencial para cada familia."],
          ].map(([title, text], index) => <article className={`trait-card trait-${index + 1}`} key={title} tabIndex={0}><div className="trait-content"><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="audience audience-family section" id="familias">
        <div className="audience-copy">
          <div className="section-label">Para madres y padres</div>
          <h2>Ya elegiste verlo. Ahora podés imaginar <em>su primer retrato.</em></h2>
          <p>Si ya tenés una ecografía 5D, podés solicitar VEO directamente. Nuestro equipo recibe la imagen, prepara y revisa el hiperrealismo, y te envía el resultado digital para guardar y compartir.</p>
          <ul className="family-list"><li><span className="family-step">Origen</span><div><strong>Tu ecografía 5D</strong><small>trabajamos sobre una imagen que ya tengas</small></div></li><li><span className="family-step">Revisión</span><div><strong>Procesamiento acompañado</strong><small>el equipo VEO prepara y revisa el resultado</small></div></li><li><span className="family-step">Entrega</span><div><strong>Entrega digital</strong><small>dentro de 24 horas hábiles</small></div></li></ul>
          <a className="button secondary dark" href="#contacto" data-analytics="family_cta" onClick={() => window.dispatchEvent(new CustomEvent("veo:contact-type", { detail: "Madre o padre" }))}>Quiero mi imagen VEO <Arrow /></a>
          <p className="availability">Completá el formulario y te explicaremos cómo enviarnos tu ecografía.</p>
        </div>
        <BeforeAfterSlider />
      </section>

      <section className="audience audience-clinic section" id="clinicas">
        <div className="audience-visual">
          <div className="dashboard">
            <div className="dash-head"><Logo /><span>Panel de órdenes</span></div>
            <div className="dash-stats"><div><small>Órdenes activas</small><strong>24</strong><i>Seguimiento centralizado</i></div><div><small>Listas para entregar</small><strong>08</strong><i>Resultado disponible</i></div></div>
            {["Orden #1048", "Orden #1047", "Orden #1046"].map((x, i) => <div className="dash-row" key={x}><span className="tiny-avatar"/><div><strong>{x}</strong><small>Ecografía 5D · {i ? "En revisión" : "Lista"}</small></div><b className={i ? "waiting" : ""}>{i ? "En proceso" : "Completada"}</b></div>)}
          </div>
        </div>
        <div className="audience-copy">
          <div className="section-label">Para clínicas</div>
          <h2>Una nueva propuesta para tu clínica, sin cambiar cómo trabajás.</h2>
          <p>VEO se incorpora como un servicio complementario a la ecografía 5D. Tu centro suma una experiencia de valor para las familias y nuestro equipo acompaña la implementación y cada entrega.</p>
          <div className="check-grid">{benefitsClinic.map(x => <span key={x}><b>✓</b>{x}</span>)}</div>
          <a className="button primary" href="#contacto" data-analytics="clinic_cta" onClick={() => window.dispatchEvent(new CustomEvent("veo:contact-type", { detail: "Clínica" }))}>Quiero implementar VEO <Arrow /></a>
        </div>
      </section>

      <section className="platform section" id="sistema">
        <div className="section-head"><div><div className="section-label">El sistema VEO</div><h2>Todo el recorrido,<br/><em>en un solo lugar.</em></h2></div><p>La plataforma acompaña cada solicitud desde la carga inicial hasta la publicación y entrega del resultado.</p></div>
        <div className="platform-grid">{[["▤","Órdenes centralizadas","Cada solicitud queda identificada y organizada."],["↥","Carga segura","La clínica incorpora la ecografía desde su propia cuenta."],["◴","Seguimiento claro","Los estados muestran en qué etapa se encuentra cada orden."],["✦","Procesamiento y revisión","VEO prepara el hiperrealismo y realiza un control humano."],["✓","Resultado disponible","La clínica puede visualizarlo y descargarlo una vez publicado."],["▥","Historial y trazabilidad","El recorrido y las acciones importantes quedan registrados."]].map(([icon,title,text])=><article key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="experience section" id="experiencias">
        <div className="experience-heading">
          <div>
            <div className="section-label">Experiencias que empiezan a tomar forma</div>
            <h2>Una idea que se convierte en <em>emoción compartida.</em></h2>
          </div>
          <p>VEO comienza a integrarse en espacios de diagnóstico por imágenes para acompañar a las familias con una experiencia nueva, sensible y memorable.</p>
        </div>

        <article className="experience-clinic">
          <div className="clinic-logo-wrap">
            <img src="/gomez-benitez.png" alt="Instituto Privado de Radiología Gómez Benítez" />
          </div>
          <div className="clinic-copy">
            <span className="pilot-badge"><i /> Implementación inicial</span>
            <h3>Un primer espacio para hacer crecer la experiencia VEO.</h3>
            <p>Actualmente estamos realizando una implementación piloto junto al Instituto Privado de Radiología Gómez Benítez, acompañando sus primeros usos y aprendiendo de cada experiencia.</p>
          </div>
          <span className="clinic-detail" aria-hidden="true">VEO · 2026</span>
        </article>
      </section>

      <section className="faq section" id="preguntas">
        <div className="section-label">Preguntas frecuentes</div>
        <div className="faq-grid"><div><h2>Lo importante,<br/><em>con claridad.</em></h2><p>Todo lo que necesitás saber antes de sumar VEO o pedir el servicio.</p></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy"><div className="section-label">Contacto</div><h2>Sumá una nueva experiencia emocional a la ecografía 5D.</h2><p>Contanos si representás a una clínica o si querés solicitar una imagen VEO para tu familia. Estamos para acompañarte.</p><a className="contact-email" href="mailto:veobaby.hiperrealismo@gmail.com">veobaby.hiperrealismo@gmail.com</a><div className="contact-trust"><span>✓ Respuesta personalizada</span><span>✓ Demo para clínicas</span><span>✓ Solicitudes particulares</span></div></div>
        <div className="form-card"><ContactForm /></div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand"><Logo light/><p>La ilusión de conocer su rostro antes de nacer.</p></div>
          <div className="footer-links">
            <div><strong>Explorar</strong><a href="#familias">Para familias</a><a href="#clinicas">Para clínicas</a><a href="#sistema">El sistema</a></div>
            <div><strong>Información</strong><a href="#preguntas">Preguntas frecuentes</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos del servicio</a></div>
            <div><strong>Contacto</strong><a href="#contacto">Formulario de contacto</a><a className="footer-email" href="mailto:veobaby.hiperrealismo@gmail.com">veobaby.hiperrealismo@gmail.com</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 VEO. Todos los derechos reservados.</span><span>Servicio recreativo e ilustrativo. No constituye diagnóstico médico.</span></div>
      </footer>
    </main>
  );
}
