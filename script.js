document.documentElement.classList.add("js");

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const parent = question.closest(".faq-item");
    parent.classList.toggle("open");
  });
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

document.querySelectorAll(".logo").forEach((logo) => {
  logo.innerHTML = '<img src="assets/logo-devology-main.png" alt="Devology System" class="logo-image" />';
  logo.setAttribute("aria-label", "Devology System");
});

window.requestAnimationFrame(() => {
  document.body.classList.add("page-ready");
});

const WHATSAPP_NUMBER = "393793833583";

function buildContactWhatsAppMessage(form) {
  const get = (name) => {
    const field = form.elements.namedItem(name);
    return field && "value" in field ? String(field.value).trim() : "";
  };

  const lines = [
    "Nuova richiesta — Devology Studio",
    "",
    `Nome: ${get("nome")}`,
    `Email: ${get("email")}`,
    `Telefono: ${get("telefono") || "—"}`,
    `Azienda: ${get("azienda") || "—"}`,
    `Tipo di progetto: ${get("tipo-progetto") || "—"}`,
    "",
    "Messaggio:",
    get("messaggio"),
  ];

  return lines.join("\n");
}

document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const text = buildContactWhatsAppMessage(form);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
});
