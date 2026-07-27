import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo VEO recopila, utiliza, protege y elimina los datos personales vinculados con sus consultas y servicios.",
  alternates: { canonical: "/privacidad" },
};

const sections = [
  {
    id: "alcance",
    title: "1. Alcance de esta política",
    content: (
      <>
        <p>
          Esta Política de Privacidad explica cómo VEO trata datos personales
          cuando una persona utiliza esta web, envía una consulta o participa
          del servicio de creación de imágenes hiperrealistas a partir de una
          ecografía 5D.
        </p>
        <p>
          VEO es un servicio recreativo e ilustrativo. No realiza diagnósticos,
          no evalúa la salud del bebé y no reemplaza la atención ni la
          documentación médica de la clínica.
        </p>
      </>
    ),
  },
  {
    id: "responsables",
    title: "2. Quién trata los datos",
    content: (
      <>
        <p>
          En las consultas realizadas desde esta web, VEO decide para qué y
          cómo se utilizan los datos necesarios para responderlas.
        </p>
        <p>
          Cuando el servicio se contrata a través de una clínica o centro, esa
          institución mantiene la relación con la familia, obtiene la
          autorización correspondiente y administra la orden. VEO interviene
          como proveedor tecnológico para procesar la imagen, permitir su
          revisión y registrar la entrega, de acuerdo con las instrucciones y
          condiciones acordadas con la clínica.
        </p>
      </>
    ),
  },
  {
    id: "datos",
    title: "3. Qué datos podemos tratar",
    content: (
      <>
        <ul>
          <li>
            <strong>Consultas:</strong> nombre y apellido, correo electrónico,
            teléfono o WhatsApp, tipo de consulta, clínica y contenido del
            mensaje.
          </li>
          <li>
            <strong>Órdenes del servicio:</strong> datos mínimos de la persona
            o familia necesarios para identificar y gestionar una orden.
          </li>
          <li>
            <strong>Imágenes:</strong> ecografía 5D original, versiones
            generadas y resultado seleccionado.
          </li>
          <li>
            <strong>Consentimiento y entrega:</strong> aceptación, fecha,
            estado de la orden, revisión y modalidad de entrega.
          </li>
          <li>
            <strong>Datos técnicos y de seguridad:</strong> usuario de la
            clínica, registros de actividad, fecha y hora, errores y, cuando
            resulte necesario, dirección IP.
          </li>
        </ul>
        <div className="privacy-note">
          Una ecografía está vinculada a un contexto de salud y embarazo. Por
          eso la tratamos con medidas reforzadas, aunque VEO no la utilice para
          realizar una evaluación médica.
        </div>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "4. Para qué utilizamos los datos",
    content: (
      <ul>
        <li>Responder consultas y coordinar demostraciones.</li>
        <li>Crear, procesar, revisar y entregar una orden de VEO.</li>
        <li>Verificar que exista una aceptación previa al procesamiento.</li>
        <li>Brindar soporte a clínicas y familias.</li>
        <li>Prevenir accesos indebidos y mantener trazabilidad operativa.</li>
        <li>Cumplir obligaciones legales o contractuales aplicables.</li>
      </ul>
    ),
  },
  {
    id: "consentimiento",
    title: "5. Consentimiento y uso de las imágenes",
    content: (
      <>
        <p>
          El procesamiento de una ecografía para crear el resultado VEO
          requiere una aceptación previa, libre e informada de la persona
          habilitada para otorgarla. Si la imagen o los datos corresponden a
          una persona menor de edad, la autorización debe ser otorgada por su
          madre, padre o representante legal.
        </p>
        <p>
          Las imágenes se utilizan para prestar el servicio solicitado. No se
          destinan a publicidad ni al entrenamiento de modelos de uso general
          sin una autorización adicional, específica y separada.
        </p>
      </>
    ),
  },
  {
    id: "proveedores",
    title: "6. Proveedores y destinatarios",
    content: (
      <>
        <p>
          Para operar la web y el servicio podemos utilizar proveedores de
          formularios, alojamiento, base de datos, almacenamiento y
          procesamiento. Actualmente, el ecosistema técnico puede incluir
          Formspree, Vercel, Render y Supabase, además del entorno privado de
          procesamiento utilizado por VEO.
        </p>
        <p>
          Estos proveedores reciben únicamente los datos necesarios para
          cumplir su función y pueden operar infraestructura situada fuera de
          Argentina. VEO no vende datos personales ni los cede con fines
          publicitarios.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "7. Conservación y eliminación",
    content: (
      <>
        <p>
          Los datos de contacto se conservan durante el tiempo necesario para
          responder la consulta, continuar una relación solicitada o atender
          obligaciones aplicables.
        </p>
        <p>
          Las ecografías originales, las versiones generadas y el resultado
          seleccionado se eliminan automáticamente dentro de los treinta (30)
          días posteriores a la entrega. La familia puede solicitar su
          eliminación anticipada escribiendo a nuestro canal de privacidad o
          contactando a la clínica que gestionó la orden.
        </p>
        <p>
          Los consentimientos y registros operativos se conservan de manera
          separada durante el tiempo necesario para acreditar la autorización,
          mantener la trazabilidad o cumplir obligaciones aplicables. Estos
          registros no requieren conservar las ecografías ni los resultados.
        </p>
        <p>
          Una persona puede solicitar la supresión de sus datos. La eliminación
          puede quedar limitada si existe una obligación legal o un interés
          legítimo debidamente justificado para conservar una parte del
          registro.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "8. Seguridad y confidencialidad",
    content: (
      <p>
        Aplicamos controles de acceso por usuario y rol, autenticación,
        revisión humana antes de la entrega, registros de acciones relevantes
        y medidas técnicas y organizativas orientadas a evitar accesos,
        modificaciones o divulgaciones no autorizadas. Ningún sistema es
        completamente infalible; ante un incidente relevante se aplicarán las
        medidas de contención y comunicación que correspondan.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "9. Tus derechos",
    content: (
      <>
        <p>
          De acuerdo con la Ley argentina 25.326, podés solicitar información,
          acceso, rectificación, actualización o supresión de tus datos
          personales. Para proteger la información, podremos pedirte que
          acredites tu identidad y, cuando corresponda, tu representación.
        </p>
        <p>
          El derecho de acceso debe responderse dentro de los diez días
          corridos. Las solicitudes de rectificación, actualización o supresión
          deben atenderse dentro de los cinco días hábiles, con las excepciones
          previstas legalmente.
        </p>
        <p>
          Si la información fue aportada a través de una clínica, también podés
          dirigirte directamente a esa institución. Para ejercer tus derechos
          ante VEO, escribinos a{" "}
          <a href="mailto:veobaby.hiperrealismo@gmail.com">
            veobaby.hiperrealismo@gmail.com
          </a>{" "}
          con el asunto “Privacidad”.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, autoridad de control
          de la Ley 25.326, recibe denuncias y reclamos por incumplimiento de
          las normas de protección de datos personales.
        </p>
      </>
    ),
  },
  {
    id: "cambios",
    title: "10. Cambios y contacto",
    content: (
      <>
        <p>
          Podemos actualizar esta política cuando cambie el servicio, sus
          proveedores o la normativa. La versión vigente y su fecha estarán
          siempre publicadas en esta página.
        </p>
        <p>
          Para consultas o solicitudes sobre privacidad, escribinos a{" "}
          <a href="mailto:veobaby.hiperrealismo@gmail.com">
            veobaby.hiperrealismo@gmail.com
          </a>
          . También podés utilizar el{" "}
          <Link href="/#contacto">formulario de contacto</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
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
          <span>Información y transparencia</span>
          <h1>Política de <em>privacidad.</em></h1>
          <p>
            Queremos que sepas qué información interviene en VEO, para qué la
            utilizamos y cómo podés ejercer tus derechos.
          </p>
          <small>Versión 1.0 · Vigente desde el 27 de julio de 2026</small>
        </div>
      </section>

      <div className="privacy-layout">
        <aside aria-label="Contenido de la política">
          <strong>En esta página</strong>
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title.replace(/^\d+\.\s/, "")}
            </a>
          ))}
        </aside>

        <article className="privacy-content">
          <div className="privacy-summary">
            <span aria-hidden="true">✓</span>
            <p>
              VEO utiliza los datos para responder consultas y prestar el
              servicio solicitado. No vende información personal y no utiliza
              ecografías con fines publicitarios sin una autorización
              específica.
            </p>
          </div>
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
          <div className="privacy-authority">
            <strong>Autoridad de control</strong>
            <p>
              Podés consultar tus derechos o presentar un reclamo ante la
              Agencia de Acceso a la Información Pública.
            </p>
            <a
              href="https://www.argentina.gob.ar/aaip/datospersonales/derechos"
              target="_blank"
              rel="noreferrer"
            >
              Consultar información oficial ↗
            </a>
          </div>
        </article>
      </div>

      <footer className="privacy-footer">
        <span>© 2026 VEO. Todos los derechos reservados.</span>
        <div>
          <Link href="/terminos">Términos del servicio</Link>
          <Link href="/">Volver a VEO</Link>
        </div>
      </footer>
    </main>
  );
}
