"use client";

import { FormEvent, useEffect, useState } from "react";

const benefitsClinic = [
  "Aumentá el ticket promedio por paciente",
  "Diferenciá la propuesta de tu centro",
  "Integralo como upselling en el circuito actual",
  "Sin inversión en nuevo equipamiento médico",
  "Elevá la experiencia percibida por las familias",
  "Gestioná órdenes y resultados desde un panel web",
];

const faqs = [
  ["¿VEO reemplaza una ecografía médica?", "No. VEO no realiza estudios médicos ni diagnósticos. Trabaja sobre una imagen 5D ya obtenida y genera una recreación visual e ilustrativa."],
  ["¿La imagen muestra exactamente cómo será el bebé?", "No. La imagen es una interpretación recreativa generada mediante IA. Puede estar inspirada en la ecografía, pero no debe entenderse como una predicción exacta."],
  ["¿Qué tipo de imagen se necesita?", "Una ecografía 5D en formato de imagen digital. La calidad del resultado depende de la calidad de la imagen original."],
  ["¿Todas las ecografías sirven?", "No necesariamente. Algunas imágenes pueden no ser aptas por baja resolución, sombras, posición del bebé, obstrucciones o artefactos visuales."],
  ["¿Cuánto tarda el procesamiento?", "El tiempo puede variar según la operación del centro y el flujo de revisión. El sistema está diseñado para facilitar una entrega digital ágil."],
  ["¿La clínica necesita equipamiento adicional?", "No. El sistema está pensado para integrarse al flujo actual, sin requerir nuevo hardware médico."],
];

const comparisonCases = [
  { original: "/ecografia-caso-01.jpeg", processed: "/ecografia-caso-01-procesada.jpeg", label: "Caso 1" },
  { original: "/ecografia-caso-02.jpeg", processed: "/ecografia-caso-02-procesada.jpeg", label: "Caso 2" },
];

const familyVoices = [
  {
    quote: "Cuando vimos la imagen, sentimos que la espera se volvió un poquito más real. Fue un momento muy nuestro.",
    signature: "Una futura mamá",
    moment: "Esperando su primer encuentro",
  },
  {
    quote: "Se la compartimos a los abuelos y fue imposible contener la emoción. Todos empezamos a imaginar su carita.",
    signature: "Mamá y papá",
    moment: "Compartiendo la ilusión en familia",
  },
  {
    quote: "Queremos guardarla junto a sus primeras ecografías para contarle algún día cómo lo imaginábamos antes de conocerlo.",
    signature: "Una familia en la espera",
    moment: "Creando recuerdos desde el comienzo",
  },
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

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [type, setType] = useState("Clínica");
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
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
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
        ".section-label, h2, .section-head>p, .intro-grid>div, .step, .pill-row>.trait-card, .audience-visual, .audience-copy, .check-grid>span, .family-list>li, .experience-clinic, .voice-card, .platform-grid>article, .framework-card>div, .faq-list>details, .contact-copy, .form-card"
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
          <a href="#como-funciona" onClick={() => setMenu(false)}>Cómo funciona</a>
          <a href="#clinicas" onClick={() => setMenu(false)}>Para clínicas</a>
          <a href="#familias" onClick={() => setMenu(false)}>Para familias</a>
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
          <p className="lead">VEO transforma ecografías 5D en retratos recreativos del bebé mediante inteligencia artificial, convirtiendo un momento de emoción en un recuerdo único.</p>
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

      <section className="steps-section section" id="como-funciona">
        <div className="section-head"><div><div className="section-label">Cómo funciona</div><h2>De la ecografía a un recuerdo, <em>en cuatro pasos.</em></h2></div><p>Un flujo simple que se integra a la operación actual de tu centro.</p></div>
        <div className="steps">
          {[
            ["01", "La clínica carga la ecografía 5D", "El profesional o usuario autorizado sube la imagen desde el sistema."],
            ["02", "VEO crea la imagen hiperrealista", "El sistema interpreta la ecografía y genera distintas versiones para seleccionar el mejor resultado."],
            ["03", "Se revisa el resultado", "El equipo selecciona la mejor variante disponible."],
            ["04", "Se entrega a la familia", "La imagen final se descarga o envía digitalmente."],
          ].map(([n, title, text]) => <article className="step" key={n}><span className="step-num">{n}</span><div className="step-icon">{n === "01" ? "↥" : n === "02" ? "✦" : n === "03" ? "◎" : "♡"}</div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="quality-note"><span>✓</span> Cada resultado pasa por un control de calidad visual antes de ser entregado.</div>
      </section>

      <section className="audience audience-clinic section" id="clinicas">
        <div className="audience-visual">
          <div className="dashboard">
            <div className="dash-head"><Logo /><span>Panel de órdenes</span></div>
            <div className="dash-stats"><div><small>Órdenes activas</small><strong>24</strong><i>+12% este mes</i></div><div><small>Listas para entregar</small><strong>08</strong><i>Hoy</i></div></div>
            {["Orden #1048", "Orden #1047", "Orden #1046"].map((x, i) => <div className="dash-row" key={x}><span className="tiny-avatar"/><div><strong>{x}</strong><small>Ecografía 5D · {i ? "En revisión" : "Lista"}</small></div><b className={i ? "waiting" : ""}>{i ? "En proceso" : "Completada"}</b></div>)}
          </div>
        </div>
        <div className="audience-copy">
          <div className="section-label">Para clínicas</div>
          <h2>Un adicional premium para una experiencia que ya eligieron.</h2>
          <p>VEO está pensado para clínicas y centros que ofrecen ecografías 5D y quieren sumar una propuesta diferencial sin complejizar su operación.</p>
          <div className="check-grid">{benefitsClinic.map(x => <span key={x}><b>✓</b>{x}</span>)}</div>
          <a className="button primary" href="#contacto" data-analytics="clinic_cta">Quiero implementar VEO <Arrow /></a>
        </div>
      </section>

      <section className="audience audience-family section" id="familias">
        <div className="audience-copy">
          <div className="section-label">Para madres y padres</div>
          <h2>Ya elegiste verlo. Ahora podés imaginar <em>su primer retrato.</em></h2>
          <p>VEO acompaña ese momento de emoción y espera. A partir de una ecografía 5D, genera una imagen recreativa pensada para guardar, compartir y recordar.</p>
          <ul className="family-list"><li><span>♡</span><div><strong>Un recuerdo único</strong><small>de una etapa que pasa volando</small></div></li><li><span>⌁</span><div><strong>Sentirlo un poco más cerca</strong><small>durante la espera</small></div></li><li><span>✦</span><div><strong>Una imagen especial</strong><small>para compartir con quienes querés</small></div></li></ul>
          <a className="button secondary dark" href="#contacto" data-analytics="family_cta">Consultar disponibilidad <Arrow /></a>
          <p className="availability">La disponibilidad puede depender de la clínica donde se realice la ecografía.</p>
        </div>
        <div className="family-visual"><div className="rings"><span/><span/><span/></div><div className="quote">“Una forma nueva<br/>de imaginar todo<br/>lo que viene.”<b>VEO</b></div></div>
        <div className="family-voices">
          <div className="voices-header">
            <div>
              <span>El corazón de la experiencia</span>
              <h3>Mensajes que reflejan lo que queremos despertar.</h3>
            </div>
          </div>
          <div className="voices-grid">
            {familyVoices.map((voice, index) => (
              <article className={`voice-card voice-${index + 1}`} key={voice.signature}>
                <div className="voice-mark" aria-hidden="true">“</div>
                <blockquote>{voice.quote}</blockquote>
                <div className="voice-signature">
                  <span aria-hidden="true">♡</span>
                  <div><strong>{voice.signature}</strong><small>{voice.moment}</small></div>
                </div>
              </article>
            ))}
          </div>
        </div>
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

      <section className="platform section">
        <div className="section-head"><div><div className="section-label">La plataforma</div><h2>Simple de gestionar.<br/><em>Fácil de integrar.</em></h2></div><p>Un sistema funcional para acompañar cada orden desde la carga inicial hasta la entrega final.</p></div>
        <div className="platform-grid">{[["▤","Panel de órdenes","Todo el flujo, en un solo lugar."],["↥","Carga de ecografía","Carga simple y segura de imágenes."],["✦","Ecografía hiperrealista","Una nueva forma de imaginar su rostro, en minutos."],["◎","Revisión de variantes","Control visual antes de la entrega."],["◴","Estados de seguimiento","Visibilidad en cada etapa."],["✓","Registro de entregas","Historial claro y organizado."]].map(([icon,title,text])=><article key={title}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="framework section">
        <div className="framework-card">
          <div><div className="section-label light-label">Marco del servicio</div><h2>Emocional, recreativo <em>e ilustrativo.</em></h2><p className="framework-lead">VEO no realiza diagnósticos, no analiza la salud del bebé y no reemplaza la evaluación médica.</p></div>
          <div className="framework-list">{["No constituye diagnóstico médico.", "No predice la apariencia exacta al nacer.", "No requiere realizar una ecografía adicional.", "Utiliza imágenes del circuito de la clínica.", "Requiere aceptación del carácter recreativo."].map(x=><span key={x}><b>✓</b>{x}</span>)}</div>
        </div>
      </section>

      <section className="faq section" id="preguntas">
        <div className="section-label">Preguntas frecuentes</div>
        <div className="faq-grid"><div><h2>Lo importante,<br/><em>con claridad.</em></h2><p>Todo lo que necesitás saber antes de sumar VEO o pedir el servicio.</p></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy"><div className="section-label">Contacto</div><h2>Sumá una nueva experiencia emocional a la ecografía 5D.</h2><p>Contanos si representás a una clínica o si querés saber dónde encontrar VEO. Estamos para acompañarte.</p><a className="contact-email" href="mailto:veobaby.hiperrealismo@gmail.com">veobaby.hiperrealismo@gmail.com</a><div className="contact-trust"><span>✓ Respuesta personalizada</span><span>✓ Demo para clínicas</span><span>✓ Información para familias</span></div></div>
        <div className="form-card"><ContactForm /></div>
      </section>

      <footer>
        <div className="footer-top"><div className="footer-brand"><Logo light/><p>La ilusión de conocer su rostro antes de nacer.</p></div><div className="footer-links"><div><strong>Explorar</strong><a href="#como-funciona">Cómo funciona</a><a href="#clinicas">Para clínicas</a><a href="#familias">Para familias</a></div><div><strong>Información</strong><a href="#preguntas">Preguntas frecuentes</a><a href="#contacto">Contacto</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos del servicio</a></div><div><strong>VEO</strong><a href="#contacto">Solicitar demo</a><a href="#contacto">Consultar disponibilidad</a><a className="footer-email" href="mailto:veobaby.hiperrealismo@gmail.com">Escribir por email</a></div></div></div>
        <div className="footer-bottom"><span>© 2026 VEO. Todos los derechos reservados.</span><span>Servicio recreativo e ilustrativo. No constituye diagnóstico médico.</span></div>
      </footer>
    </main>
  );
}
