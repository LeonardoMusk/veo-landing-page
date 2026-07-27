import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos del servicio",
  description:
    "Condiciones de uso del servicio VEO para clínicas, centros y familias.",
  alternates: { canonical: "/terminos" },
};

const sections = [
  {
    id: "servicio",
    title: "1. Qué es VEO",
    content: (
      <>
        <p>
          VEO es un servicio recreativo e ilustrativo que crea imágenes
          hiperrealistas a partir de ecografías 5D previamente realizadas en
          una clínica o centro especializado.
        </p>
        <p>
          El resultado busca ofrecer una experiencia emocional para la familia.
          No es una imagen médica, no constituye un diagnóstico, no evalúa la
          salud del bebé y no reemplaza la opinión de profesionales de la salud.
        </p>
      </>
    ),
  },
  {
    id: "aceptacion",
    title: "2. Aceptación y autorización",
    content: (
      <p>
        Antes del procesamiento, la persona habilitada debe aceptar el carácter
        recreativo del servicio y autorizar el uso de la ecografía para generar
        el resultado solicitado. Cuando corresponda, la autorización debe ser
        otorgada por la madre, el padre o el representante legal.
      </p>
    ),
  },
  {
    id: "clinica",
    title: "3. Responsabilidades de la clínica",
    content: (
      <ul>
        <li>Obtener la ecografía mediante su circuito profesional habitual.</li>
        <li>
          Informar claramente a la familia el alcance recreativo e ilustrativo
          de VEO.
        </li>
        <li>
          Verificar la identidad y la autorización de quien solicita el
          servicio.
        </li>
        <li>
          Cargar únicamente imágenes para las que cuenta con una autorización
          válida.
        </li>
        <li>
          Revisar el resultado disponible antes de aprobarlo y entregarlo.
        </li>
        <li>
          Proteger sus credenciales y limitar el acceso a usuarios autorizados.
        </li>
      </ul>
    ),
  },
  {
    id: "familia",
    title: "4. Responsabilidades de la familia",
    content: (
      <p>
        La familia debe brindar información correcta, confirmar que está
        habilitada para autorizar el procesamiento y comprender que el
        resultado es una interpretación artística. La imagen se entrega para
        uso personal y familiar. Su publicación o utilización por terceros
        deberá respetar la privacidad y los derechos de las personas
        involucradas.
      </p>
    ),
  },
  {
    id: "calidad",
    title: "5. Calidad de la ecografía y variación del resultado",
    content: (
      <>
        <p>
          La calidad del resultado depende, entre otros factores, de la
          resolución, el encuadre, la posición del bebé, las sombras, las
          obstrucciones y los artefactos presentes en la ecografía original.
          Algunas imágenes pueden ser aptas, aptas con limitaciones o no
          recomendables para el procesamiento.
        </p>
        <p>
          VEO no garantiza que la imagen represente con exactitud la apariencia
          real del bebé al nacer ni que todos los intentos produzcan un
          resultado utilizable.
        </p>
      </>
    ),
  },
  {
    id: "revision",
    title: "6. Procesamiento y revisión humana",
    content: (
      <p>
        El sistema puede generar una o más variantes. Antes de la entrega, una
        persona autorizada revisa visualmente el material y selecciona, rechaza
        o solicita reprocesar el resultado. Esta revisión controla la calidad
        estética; no es una evaluación médica.
      </p>
    ),
  },
  {
    id: "plazos",
    title: "7. Plazos y disponibilidad",
    content: (
      <p>
        Los tiempos informados son estimativos y pueden variar por la calidad
        de la imagen, la cantidad de órdenes, la necesidad de revisión o
        reprocesamiento y la disponibilidad de los servicios tecnológicos. Si
        no pudiera obtenerse un resultado adecuado, la clínica comunicará las
        alternativas disponibles para la orden.
      </p>
    ),
  },
  {
    id: "entrega",
    title: "8. Entrega y eliminación de imágenes",
    content: (
      <>
        <p>
          El resultado se entrega por el medio habilitado por la clínica. La
          familia es responsable de descargarlo y conservar su propia copia.
        </p>
        <p>
          La ecografía original, las variantes y el resultado se eliminan
          automáticamente dentro de los treinta (30) días posteriores a la
          entrega. La familia puede pedir su eliminación anticipada. Los
          consentimientos y registros operativos pueden conservarse por
          separado, sin mantener las imágenes.
        </p>
      </>
    ),
  },
  {
    id: "limites",
    title: "9. Límites del servicio",
    content: (
      <ul>
        <li>VEO no presta servicios médicos ni interpreta ecografías.</li>
        <li>No predice rasgos físicos ni la apariencia exacta al nacer.</li>
        <li>No reemplaza estudios, controles ni indicaciones profesionales.</li>
        <li>
          No responde por decisiones médicas o personales tomadas a partir de
          una imagen recreativa.
        </li>
        <li>
          No puede garantizar disponibilidad ininterrumpida de proveedores
          externos o infraestructura tecnológica.
        </li>
      </ul>
    ),
  },
  {
    id: "privacidad",
    title: "10. Privacidad",
    content: (
      <p>
        El tratamiento de datos personales e imágenes se encuentra explicado
        en nuestra <Link href="/privacidad">Política de Privacidad</Link>, que
        forma parte de estas condiciones.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "11. Cambios y contacto",
    content: (
      <>
        <p>
          Podemos actualizar estos términos cuando cambien el servicio, su
          operación o la normativa aplicable. La versión vigente será la
          publicada en esta página.
        </p>
        <p>
          Para consultas escribinos a{" "}
          <a href="mailto:veobaby.hiperrealismo@gmail.com">
            veobaby.hiperrealismo@gmail.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="privacy-page terms-page">
      <header className="privacy-header">
        <Link className="privacy-brand" href="/" aria-label="Volver a VEO">
          <img src="/logo-veo-principal.webp" alt="" />
          <strong>VEO</strong>
        </Link>
        <Link className="privacy-back" href="/">
          ← Volver al inicio
        </Link>
      </header>

      <section className="privacy-hero">
        <div>
          <span>Uso claro y responsable</span>
          <h1>Términos del <em>servicio.</em></h1>
          <p>
            Estas condiciones explican el alcance de VEO, las responsabilidades
            de cada parte y las limitaciones propias de una recreación visual.
          </p>
          <small>Versión 1.0 · Vigente desde el 27 de julio de 2026</small>
        </div>
      </section>

      <div className="privacy-layout">
        <aside aria-label="Contenido de los términos">
          <strong>En esta página</strong>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title.replace(/^\d+\.\s/, "")}
            </a>
          ))}
        </aside>

        <article className="privacy-content">
          <div className="privacy-summary">
            <span aria-hidden="true">i</span>
            <p>
              VEO crea una interpretación recreativa a partir de una ecografía
              5D. El resultado no es diagnóstico ni una predicción exacta de la
              apariencia del bebé.
            </p>
          </div>
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </article>
      </div>

      <footer className="privacy-footer">
        <span>© 2026 VEO. Todos los derechos reservados.</span>
        <div>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/">Volver a VEO</Link>
        </div>
      </footer>
    </main>
  );
}
