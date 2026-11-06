import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { formEndpoint, profile } from "../data";
import { Reveal } from "./Reveal";
import { Float, SplitText } from "./Motion";
import { Asterisk, SectionLabel, XIcon } from "./Shared";

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const field =
  "w-full border border-black/15 bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-mute/70 focus:border-brand disabled:opacity-60";
const fieldError = "border-red-600 focus:border-red-600";

// Practical email check: something@domain.tld with no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.subject.trim()) e.subject = "Please enter a subject.";
  if (!v.message.trim()) e.message = "Please write a message.";
  else if (v.message.trim().length < 10) e.message = "Your message is a little short. Please add a few more words.";
  return e;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorText, setErrorText] = useState("");
  const submitting = useRef(false); // blocks double clicks and double Enter presses
  const lastSent = useRef(""); // blocks re-sending the exact same message

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never fill this hidden field, bots usually do.
    if (data.get("_gotcha")) return;

    const values: Fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const payload = JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    });
    if (payload === lastSent.current) {
      setErrorText("You have already sent this exact message. Thank you!");
      setStatus("error");
      return;
    }

    submitting.current = true;
    setStatus("sending");
    setErrorText("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...JSON.parse(payload),
          _subject: `Portfolio contact: ${values.subject.trim()}`,
          _replyto: values.email.trim(),
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let detail = "";
        try {
          const body = await res.json();
          detail = body?.errors?.map((x: { message?: string }) => x.message).filter(Boolean).join(" ") ?? "";
        } catch {
          /* response had no JSON body */
        }
        throw new Error(detail || `Request failed (${res.status})`);
      }

      lastSent.current = payload;
      form.reset();
      setErrors({});
      setStatus("sent");
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setErrorText(
        aborted
          ? "The request took too long. Please check your connection and try again."
          : err instanceof TypeError
            ? "Could not reach the server. Please check your connection and try again."
            : `Your message could not be sent. ${err instanceof Error ? err.message : ""} Please try again, or reach out on LinkedIn.`,
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  const sending = status === "sending";
  const hasEmail = profile.email && profile.email !== "your.email@example.com";
  const clear = (k: keyof Fields) => () => errors[k] && setErrors((p) => ({ ...p, [k]: undefined }));

  return (
    <section id="contact" className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <Float className="pointer-events-none absolute -top-2 right-2 hidden text-brand md:block" distance={12} duration={7}>
            <Asterisk className="h-14 w-14" />
          </Float>
          <SectionLabel>CONTACT</SectionLabel>
          <h2
            aria-label="Have An Idea? Let's Connect."
            className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            <SplitText parts={["Have", "An", "Idea?", "\n", "Let's", "Connect."]} />
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-mute">
            I'm always open to exploring new technologies, collaborating on interesting projects, and
            connecting with people who share a passion for innovation.
          </p>

          <ul className="mt-10 space-y-4">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 hover:text-brand"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand">
                  <Linkedin size={18} />
                </span>
                <span className="text-sm font-medium">LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 hover:text-brand"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand">
                  <Github size={18} />
                </span>
                <span className="text-sm font-medium">GitHub</span>
                <ArrowUpRight size={14} />
              </a>
            </li>
            <li>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 hover:text-brand"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand">
                  <XIcon size={16} />
                </span>
                <span className="text-sm font-medium">X (Twitter)</span>
                <ArrowUpRight size={14} />
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
                <Mail size={18} />
              </span>
              {hasEmail ? (
                <a href={`mailto:${profile.email}`} className="text-sm font-medium hover:text-brand">
                  {profile.email}
                </a>
              ) : (
                <span className="text-sm italic text-mute">Email address to be added</span>
              )}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120} tilt={2}>
          <form onSubmit={onSubmit} noValidate aria-busy={sending} className="bg-white p-7 md:p-9">
            <fieldset disabled={sending} className="space-y-4 border-0 p-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Name</span>
                  <input
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                    aria-invalid={!!errors.name}
                    onChange={clear("name")}
                    className={`${field} ${errors.name ? fieldError : ""}`}
                  />
                  {errors.name && <span className="mt-1.5 block text-xs text-red-700">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    autoComplete="email"
                    maxLength={150}
                    aria-invalid={!!errors.email}
                    onChange={clear("email")}
                    className={`${field} ${errors.email ? fieldError : ""}`}
                  />
                  {errors.email && <span className="mt-1.5 block text-xs text-red-700">{errors.email}</span>}
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Subject</span>
                <input
                  name="subject"
                  placeholder="Subject"
                  maxLength={150}
                  aria-invalid={!!errors.subject}
                  onChange={clear("subject")}
                  className={`${field} ${errors.subject ? fieldError : ""}`}
                />
                {errors.subject && <span className="mt-1.5 block text-xs text-red-700">{errors.subject}</span>}
              </label>
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  maxLength={3000}
                  aria-invalid={!!errors.message}
                  onChange={clear("message")}
                  className={`${field} resize-none ${errors.message ? fieldError : ""}`}
                />
                {errors.message && <span className="mt-1.5 block text-xs text-red-700">{errors.message}</span>}
              </label>

              {/* Honeypot for bots. Hidden from people and screen readers. */}
              <input
                name="_gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <button type="submit" disabled={sending} className="btn bg-brand text-white hover:bg-ink disabled:opacity-60">
                {sending ? "SENDING…" : "SEND MESSAGE"} <ArrowUpRight size={14} />
              </button>
            </fieldset>

            <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
              {status === "sent" && (
                <span className="text-green-700">Thank you! Your message has been sent. I'll get back to you soon.</span>
              )}
              {status === "error" && <span className="text-red-700">{errorText}</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
