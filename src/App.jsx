import { useState, useEffect, useRef } from "react";

const COLORS = {
  coolWhite: "#F7F9FA",
  white: "#FFFFFF",
  slate: "#1C2B33",
  slateLight: "#4A5B65",
  gray: "#627680",
  grayText: "#627680",
  grayLight: "#8A969E",
  grayDeep: "#4A5B65",
  orange: "#FF7A2F",
  orangeText: "#E86A20",
  orangeLight: "#FF9A5C",
  orangeMuted: "#FFB580",
  teal: "#0AADA0",
  tealLight: "#2CBFB3",
  tealText: "#089A8E",
  lime: "#7ACC29",
  mist: "#DAE0E3",
  mint: "#E8F5F3",
};

const FONTS = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {}, className = "" }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 32px" : "22px 32px",
        background: scrolled ? "rgba(247,249,250,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.mist}` : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.teal})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "14px", fontWeight: 700, color: "#fff", fontFamily: FONTS.sans,
        }}>E</div>
        <span style={{
          fontFamily: FONTS.serif, fontSize: "18px", fontWeight: 600,
          color: COLORS.slate, letterSpacing: "-0.01em",
        }}>
          Emotional Fitness Lab
        </span>
      </div>
      <a
        href="#contact"
        style={{
          fontFamily: FONTS.sans, fontSize: "13px", fontWeight: 500,
          color: COLORS.white, background: COLORS.slate,
          padding: "10px 22px", borderRadius: "100px", textDecoration: "none",
          letterSpacing: "0.03em", textTransform: "uppercase",
          transition: "background 0.3s",
        }}
        onMouseEnter={e => e.target.style.background = COLORS.teal}
        onMouseLeave={e => e.target.style.background = COLORS.slate}
      >
        Get in Touch
      </a>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "140px 24px 80px", position: "relative", overflow: "hidden",
      background: COLORS.coolWhite,
    }}>
      {/* Subtle decorative elements */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%", width: "400px", height: "400px",
        borderRadius: "50%", border: `1px solid ${COLORS.mist}`,
        opacity: 0.5, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "-8%", width: "300px", height: "300px",
        borderRadius: "50%", background: COLORS.mint,
        opacity: 0.4, pointerEvents: "none", filter: "blur(60px)",
      }} />

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.2s",
      }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
          color: COLORS.tealText, letterSpacing: "0.18em", textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          A new category of wellness programming
        </div>
      </div>

      <h1 style={{
        fontFamily: FONTS.serif, fontSize: "clamp(42px, 7vw, 86px)",
        fontWeight: 500, color: COLORS.slate, lineHeight: 1.05,
        maxWidth: "900px", margin: "0 auto 32px",
        letterSpacing: "-0.02em",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s ease 0.4s",
      }}>
        There&apos;s a gym for{" "}
        <span style={{ color: COLORS.orangeText, fontStyle: "italic" }}>every</span>{" "}
        muscle — except the ones that matter most.
      </h1>

      <p style={{
        fontFamily: FONTS.sans, fontSize: "clamp(16px, 2vw, 20px)",
        color: COLORS.slateLight, lineHeight: 1.65, maxWidth: "580px",
        margin: "0 auto 20px", fontWeight: 400,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.6s",
      }}>
        Emotional fitness classes — facilitated group sessions where people practice real emotional intelligence skills. Not therapy. Not a lecture. A practice.
      </p>

      <p style={{
        fontFamily: FONTS.sans, fontSize: "clamp(14px, 1.5vw, 16px)",
        color: COLORS.orangeText, lineHeight: 1.6, maxWidth: "480px",
        margin: "0 auto 44px", fontWeight: 400,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.7s",
      }}>
        Bring a science-backed emotional fitness experience to your venue, studio, or workplace.
      </p>

      <div style={{
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.85s",
      }}>
        <a
          href="#contact"
          style={{
            fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 500,
            color: COLORS.white, background: COLORS.teal,
            padding: "16px 40px", borderRadius: "100px", textDecoration: "none",
            letterSpacing: "0.05em", textTransform: "uppercase",
            display: "inline-block", transition: "all 0.3s",
            boxShadow: `0 4px 24px rgba(10,173,160,0.3)`,
          }}
          onMouseEnter={e => {
            e.target.style.background = COLORS.slate;
            e.target.style.boxShadow = `0 4px 24px rgba(28,43,51,0.3)`;
          }}
          onMouseLeave={e => {
            e.target.style.background = COLORS.teal;
            e.target.style.boxShadow = `0 4px 24px rgba(10,173,160,0.3)`;
          }}
        >
          Bring It To Your Space
        </a>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section style={{
      padding: "100px 24px", background: COLORS.white,
      borderTop: `1px solid ${COLORS.mist}`,
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
            color: COLORS.orangeText, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>The gap</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.serif, fontSize: "clamp(28px, 4.5vw, 46px)",
            fontWeight: 500, color: COLORS.slate, lineHeight: 1.15,
            maxWidth: "750px", marginBottom: "48px", letterSpacing: "-0.01em",
          }}>
            Your members invest in physical fitness. But emotional fitness? There&apos;s no class for that.
          </h2>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
        }}>
          {[
            {
              label: "For Venues & Social Clubs",
              text: "Your members want programming that's deeper than another happy hour and more accessible than therapy. Emotional fitness classes create the kind of transformational experiences that build loyalty and word-of-mouth.",
            },
            {
              label: "For Employers",
              text: "Emotional intelligence is the #1 predictor of workplace performance and leadership effectiveness. Your team needs more than a meditation app — they need a real, facilitated practice.",
            },
            {
              label: "For Studios & Wellness Spaces",
              text: "You already offer yoga, breathwork, and sound baths. Emotional fitness is the missing piece — a structured EQ practice that fills a need nothing else on your schedule addresses.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <div style={{
                padding: "36px 32px", background: COLORS.coolWhite, borderRadius: "16px",
                border: `1px solid ${COLORS.mist}`, height: "100%",
              }}>
                <div style={{
                  fontFamily: FONTS.sans, fontSize: "11px", fontWeight: 600,
                  color: COLORS.tealText, letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "16px",
                }}>{item.label}</div>
                <p style={{
                  fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.slateLight,
                  lineHeight: 1.7, margin: 0,
                }}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIs() {
  const topics = [
    "Deep Goal Setting",
    "Approaching & Being Approachable",
    "Gratitude & Grievances",
    "Using Emotions as Data",
    "Recognizing Negative Self-Talk",
    "Positivity",
  ];

  return (
    <section style={{
      padding: "100px 24px", background: COLORS.slate, color: COLORS.coolWhite,
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle texture */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(ellipse at 20% 50%, rgba(255,122,47,0.08) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
            color: COLORS.orange, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>The format</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.serif, fontSize: "clamp(28px, 4.5vw, 46px)",
            fontWeight: 500, lineHeight: 1.15, maxWidth: "700px",
            marginBottom: "20px", letterSpacing: "-0.01em",
          }}>
            What is an emotional fitness class?
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.sans, fontSize: "17px", lineHeight: 1.7,
            maxWidth: "600px", marginBottom: "56px", color: COLORS.mint,
            fontWeight: 400,
          }}>
            A 2-hour facilitated group session — designed for 6 to 24 participants — where people practice emotional intelligence through guided exercises, structured reflection, and real conversation. Each session focuses on a different theme from a tested, science-backed curriculum.
          </p>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px", marginBottom: "64px",
        }}>
          {[
            { num: "2 hr", label: "Per session" },
            { num: "6–24", label: "Participants" },
            { num: "15+", label: "Months of testing" },
            { num: "300+", label: "Attendees and counting" },
            { num: "Drop-in", label: "Each session stands alone" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.08}>
              <div style={{
                padding: "28px 24px",
                borderLeft: `2px solid ${COLORS.lime}`,
              }}>
                <div style={{
                  fontFamily: FONTS.serif, fontSize: "32px", fontWeight: 500,
                  color: COLORS.coolWhite, marginBottom: "4px",
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: FONTS.sans, fontSize: "13px", color: COLORS.orangeLight,
                  letterSpacing: "0.04em",
                }}>{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "11px", fontWeight: 600,
            color: COLORS.tealLight, letterSpacing: "0.12em", textTransform: "uppercase",
            marginBottom: "24px",
          }}>Sample topics from the catalog</div>
        </FadeIn>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "12px",
        }}>
          {topics.map((t, i) => (
            <FadeIn key={i} delay={0.35 + i * 0.05}>
              <span style={{
                fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 400,
                color: COLORS.coolWhite, padding: "10px 20px",
                borderRadius: "100px", border: `1px solid rgba(255,255,255,0.15)`,
                background: "rgba(255,255,255,0.04)",
                display: "inline-block", whiteSpace: "nowrap",
              }}>{t}</span>
            </FadeIn>
          ))}
          <FadeIn delay={0.65}>
            <span style={{
              fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 400,
              fontStyle: "italic", color: COLORS.orangeLight, padding: "10px 20px",
              display: "inline-block",
            }}>+ many more</span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section style={{
      padding: "100px 24px", background: COLORS.coolWhite,
      borderTop: `1px solid ${COLORS.mist}`,
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
            color: COLORS.orangeText, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>Proven demand</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.serif, fontSize: "clamp(28px, 4.5vw, 46px)",
            fontWeight: 500, color: COLORS.slate, lineHeight: 1.15,
            maxWidth: "700px", marginBottom: "24px", letterSpacing: "-0.01em",
          }}>
            Built at a sold-out private club. Ready for yours.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.sans, fontSize: "17px", lineHeight: 1.7,
            maxWidth: "580px", marginBottom: "56px", color: COLORS.slateLight,
          }}>
            This format was developed and refined over 15 months of live workshops at an exclusive Denver social club. What started as an experiment became the most in-demand class on the calendar — regularly selling out with a growing waitlist.
          </p>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {[
            { quote: "This class is unlike anything else I've experienced. It gave me tools I actually use in my daily life — not just concepts, but real skills I practice.", name: "Attendee testimonial", note: "Placeholder — real quotes coming soon" },
            { quote: "I came for curiosity and kept coming back because every session genuinely shifted something. The group dynamic makes it so much more powerful than doing this work alone.", name: "Attendee testimonial", note: "Placeholder — real quotes coming soon" },
            { quote: "I've done therapy, meditation, retreats — this fills a completely different need. It's the only place I go to actively practice emotional skills with other people.", name: "Attendee testimonial", note: "Placeholder — real quotes coming soon" },
          ].map((t, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div style={{
                padding: "36px 32px", background: COLORS.white,
                borderRadius: "16px", border: `1px solid ${COLORS.mist}`,
                display: "flex", flexDirection: "column", height: "100%",
              }}>
                <div style={{
                  fontFamily: FONTS.serif, fontSize: "36px", color: COLORS.lime,
                  lineHeight: 1, marginBottom: "16px",
                }}>&ldquo;</div>
                <p style={{
                  fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.slateLight,
                  lineHeight: 1.7, margin: "0 0 20px", flex: 1, fontStyle: "italic",
                }}>{t.quote}</p>
                <div style={{
                  fontFamily: FONTS.sans, fontSize: "13px", color: COLORS.orangeText,
                }}>— {t.note}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "You provide the space and the people",
      desc: "A room, a group, and a schedule. That's all you need. Whether it's a members' lounge, a conference room, or a studio, we work with what you have.",
    },
    {
      num: "02",
      title: "We bring the experience",
      desc: "A trained facilitator, a proven curriculum, and everything needed to run a powerful session. Each workshop is a standalone experience selected from a catalog of tested topics.",
    },
    {
      num: "03",
      title: "Your community gets hooked",
      desc: "Attendees leave with real skills they use immediately — and they come back. This is the kind of programming that builds loyalty, generates word-of-mouth, and fills a gap nothing else on your calendar addresses.",
    },
  ];

  return (
    <section style={{
      padding: "100px 24px", background: COLORS.mint,
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
            color: COLORS.orangeText, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "20px",
          }}>For partners</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.serif, fontSize: "clamp(28px, 4.5vw, 46px)",
            fontWeight: 500, color: COLORS.slate, lineHeight: 1.15,
            maxWidth: "650px", marginBottom: "56px", letterSpacing: "-0.01em",
          }}>
            Bringing emotional fitness to your space is simple.
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <div style={{
                display: "grid", gridTemplateColumns: "60px 1fr",
                gap: "24px", padding: "40px 0",
                borderTop: i === 0 ? `1px solid ${COLORS.mist}` : "none",
                borderBottom: `1px solid ${COLORS.mist}`,
                alignItems: "start",
              }}>
                <div style={{
                  fontFamily: FONTS.serif, fontSize: "28px", fontWeight: 400,
                  color: COLORS.lime,
                }}>{s.num}</div>
                <div>
                  <h3 style={{
                    fontFamily: FONTS.serif, fontSize: "24px", fontWeight: 500,
                    color: COLORS.slate, marginBottom: "12px", lineHeight: 1.25,
                  }}>{s.title}</h3>
                  <p style={{
                    fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.slateLight,
                    lineHeight: 1.7, margin: 0, maxWidth: "520px",
                  }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section style={{
      padding: "100px 24px", background: COLORS.white,
      borderTop: `1px solid ${COLORS.mist}`,
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "56px", alignItems: "center",
        }}>
          <FadeIn>
            <div style={{
              width: "100%", aspectRatio: "4/5", borderRadius: "20px",
              background: `linear-gradient(145deg, ${COLORS.mist}, ${COLORS.mint})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(circle at 30% 40%, ${COLORS.orange}15, transparent 60%)`,
              }} />
              <div style={{ textAlign: "center", position: "relative" }}>
                <div style={{
                  fontFamily: FONTS.serif, fontSize: "64px", color: COLORS.orange,
                  opacity: 0.4, marginBottom: "8px",
                }}>M</div>
                <div style={{
                  fontFamily: FONTS.sans, fontSize: "12px", color: COLORS.slateLight,
                  opacity: 0.5, letterSpacing: "0.08em",
                }}>Photo placeholder</div>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <div style={{
                fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
                color: COLORS.orangeText, letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: "20px",
              }}>The facilitator</div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 style={{
                fontFamily: FONTS.serif, fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500, color: COLORS.slate, lineHeight: 1.2,
                marginBottom: "24px",
              }}>
                Marina Foerster
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{
                fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.slateLight,
                lineHeight: 1.75, marginBottom: "20px",
              }}>
                Marina is a coach with advanced training in neuroscience-based and experiential methods. Her work integrates Polyvagal Theory, Internal Family Systems, EMDR, Emotionally Focused Therapy, and mindfulness-based approaches — drawing from the most effective elements across disciplines rather than relying on a single model.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p style={{
                fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.slateLight,
                lineHeight: 1.75, marginBottom: "20px",
              }}>
                After years of helping individuals transform through 1:1 coaching, she developed the EQ &amp; You format to make deep emotional intelligence work accessible to groups. What started as an experiment at a private Denver social club became a consistently sold-out class with a waitlist — and the realization that she&apos;d created something entirely new: an emotional fitness practice.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p style={{
                fontFamily: FONTS.serif, fontSize: "19px", color: COLORS.orangeText,
                lineHeight: 1.5, fontStyle: "italic",
              }}>
                &ldquo;I wanted to create the thing that didn&apos;t exist — a place where people could practice emotional skills the way they practice physical ones. Regularly. In community. Without needing a diagnosis or a three-month commitment.&rdquo;
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", org: "", role: "", type: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.org) {
      setSubmitted(true);
    }
  };

  const inputStyle = (field) => ({
    fontFamily: FONTS.sans, fontSize: "15px", padding: "14px 18px",
    border: `1px solid ${focused === field ? COLORS.teal : COLORS.mist}`,
    borderRadius: "12px", outline: "none", width: "100%",
    background: COLORS.white, color: COLORS.slate,
    transition: "border-color 0.3s",
    boxSizing: "border-box",
  });

  const labelStyle = {
    fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
    color: COLORS.slateLight, letterSpacing: "0.04em",
    marginBottom: "8px", display: "block",
  };

  return (
    <section id="contact" style={{
      padding: "100px 24px", background: COLORS.slate,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px",
        borderRadius: "50%", background: `radial-gradient(circle, rgba(10,173,160,0.06), transparent)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 500,
            color: COLORS.tealLight, letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "20px", textAlign: "center",
          }}>Get started</div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.serif, fontSize: "clamp(28px, 4.5vw, 42px)",
            fontWeight: 500, color: COLORS.coolWhite, lineHeight: 1.15,
            marginBottom: "16px", textAlign: "center",
          }}>
            Bring emotional fitness to your space
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.sans, fontSize: "16px", color: COLORS.mint,
            lineHeight: 1.65, marginBottom: "48px", textAlign: "center",
            opacity: 0.8,
          }}>
            Interested in offering EQ &amp; You at your venue, studio, or workplace? Leave your details and we&apos;ll be in touch.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          {submitted ? (
            <div style={{
              textAlign: "center", padding: "60px 32px",
              background: "rgba(255,255,255,0.04)", borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: COLORS.orange, margin: "0 auto 24px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", color: "#fff",
              }}>✓</div>
              <h3 style={{
                fontFamily: FONTS.serif, fontSize: "28px", color: COLORS.coolWhite,
                marginBottom: "12px",
              }}>Thank you!</h3>
              <p style={{
                fontFamily: FONTS.sans, fontSize: "15px", color: COLORS.mint,
                lineHeight: 1.6,
              }}>
                We&apos;ve received your information and will be in touch soon to explore how EQ &amp; You can work in your space.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(255,255,255,0.03)", borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.06)", padding: "40px 36px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>
                    <span style={{ color: COLORS.mint }}>Full Name</span>
                    <span style={{ color: COLORS.teal }}> *</span>
                  </label>
                  <input
                    style={inputStyle("name")}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ color: COLORS.mint }}>Email</span>
                    <span style={{ color: COLORS.teal }}> *</span>
                  </label>
                  <input
                    type="email"
                    style={inputStyle("email")}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    <span style={{ color: COLORS.mint }}>Organization / Venue</span>
                    <span style={{ color: COLORS.teal }}> *</span>
                  </label>
                  <input
                    style={inputStyle("org")}
                    value={form.org}
                    onChange={e => setForm({ ...form, org: e.target.value })}
                    onFocus={() => setFocused("org")}
                    onBlur={() => setFocused(null)}
                    placeholder="Company or venue name"
                  />
                </div>

                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px",
                }}>
                  <div>
                    <label style={labelStyle}>
                      <span style={{ color: COLORS.mint }}>Role</span>
                      <span style={{ color: COLORS.orangeLight, fontWeight: 400 }}> (optional)</span>
                    </label>
                    <input
                      style={inputStyle("role")}
                      value={form.role}
                      onChange={e => setForm({ ...form, role: e.target.value })}
                      onFocus={() => setFocused("role")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your role"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      <span style={{ color: COLORS.mint }}>Type</span>
                      <span style={{ color: COLORS.orangeLight, fontWeight: 400 }}> (optional)</span>
                    </label>
                    <select
                      style={{
                        ...inputStyle("type"),
                        appearance: "none",
                        cursor: "pointer",
                        color: form.type ? COLORS.slate : "#999",
                      }}
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      onFocus={() => setFocused("type")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Select...</option>
                      <option value="venue">Venue / Social Club</option>
                      <option value="studio">Studio / Wellness Space</option>
                      <option value="corporate">Corporate / Workplace</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.org}
                  style={{
                    fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 500,
                    color: COLORS.white,
                    background: (!form.name || !form.email || !form.org)
                      ? COLORS.slateLight : COLORS.teal,
                    padding: "16px 40px", borderRadius: "100px", border: "none",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    cursor: (!form.name || !form.email || !form.org)
                      ? "not-allowed" : "pointer",
                    transition: "all 0.3s", marginTop: "8px", width: "100%",
                    opacity: (!form.name || !form.email || !form.org) ? 0.5 : 1,
                  }}
                  onMouseEnter={e => {
                    if (form.name && form.email && form.org)
                      e.target.style.background = COLORS.tealLight;
                  }}
                  onMouseLeave={e => {
                    if (form.name && form.email && form.org)
                      e.target.style.background = COLORS.teal;
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "40px 24px", background: COLORS.slate,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      textAlign: "center",
    }}>
      <p style={{
        fontFamily: FONTS.sans, fontSize: "13px", color: "rgba(255,255,255,0.3)",
        margin: 0,
      }}>
        © {new Date().getFullYear()} Emotional Fitness Lab. All rights reserved.
      </p>
    </footer>
  );
}

export default function EmotionalFitnessLab() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.coolWhite}; overflow-x: hidden; }
        ::selection { background: ${COLORS.orange}35; }
        input::placeholder, select { font-family: ${FONTS.sans}; }
      `}</style>
      <Nav />
      <Hero />
      <Problem />
      <WhatIs />
      <Proof />
      <HowItWorks />
      <About />
      <ContactForm />
      <Footer />
    </>
  );
}
