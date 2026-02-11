export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/contact") {
      try {
        const formData = await request.formData();
        const name = formData.get("name") || "";
        const email = formData.get("email") || "";
        const message = formData.get("message") || "";

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: "All fields are required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Contact Form <onboarding@resend.dev>",
            to: "elijahbit@gmail.com",
            subject: `Message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            reply_to: email,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          console.error("Resend error:", err);
          return new Response(JSON.stringify({ error: "Failed to send message." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        console.error("Contact error:", e);
        return new Response(JSON.stringify({ error: "Something went wrong." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eli Itah</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      background: #000;
      color: #fff;
      line-height: 1.6;
    }

    a { color: #4a9eff; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .container { max-width: 720px; margin: 0 auto; padding: 0 24px; }

    /* Header */
    header {
      padding: 80px 0 40px;
      border-bottom: 1px solid #222;
    }
    header h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.5px; }
    header p.tagline {
      margin-top: 12px;
      font-size: 1.1rem;
      color: #aaa;
    }
    .links {
      margin-top: 20px;
      display: flex;
      gap: 24px;
    }
    .links a {
      color: #fff;
      font-weight: 500;
      border-bottom: 1px solid #555;
      padding-bottom: 2px;
    }
    .links a:hover {
      border-bottom-color: #fff;
      text-decoration: none;
    }

    /* Sections */
    section {
      padding: 48px 0;
      border-bottom: 1px solid #222;
    }
    section:last-of-type { border-bottom: none; }
    section h2 {
      font-size: 1.25rem;
      color: #4a9eff;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }
    section p { color: #ccc; margin-bottom: 12px; }

    /* Experience */
    .role { margin-bottom: 28px; }
    .role h3 { font-size: 1rem; font-weight: 600; color: #fff; }
    .role .meta { font-size: 0.875rem; color: #888; margin: 4px 0 8px; }
    .role ul { list-style: none; padding: 0; }
    .role li {
      color: #ccc;
      font-size: 0.925rem;
      padding-left: 16px;
      position: relative;
      margin-bottom: 6px;
    }
    .role li::before {
      content: "\\2013";
      position: absolute;
      left: 0;
      color: #555;
    }

    /* Skills */
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skills span {
      background: #111;
      border: 1px solid #333;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
      color: #ccc;
    }

    /* Contact form */
    form { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
    input, textarea {
      background: #111;
      border: 1px solid #333;
      color: #fff;
      padding: 10px 12px;
      border-radius: 4px;
      font-family: inherit;
      font-size: 0.95rem;
    }
    input:focus, textarea:focus {
      outline: none;
      border-color: #4a9eff;
    }
    textarea { resize: vertical; min-height: 120px; }
    button {
      background: #4a9eff;
      color: #000;
      border: none;
      padding: 10px 24px;
      border-radius: 4px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      align-self: flex-start;
    }
    button:hover { background: #3a8eef; }
    button:disabled { background: #555; cursor: not-allowed; }
    .form-status {
      padding: 10px 12px;
      border-radius: 4px;
      font-size: 0.9rem;
      display: none;
    }
    .form-status.success { display: block; background: #0a2a0a; border: 1px solid #1a4a1a; color: #4caf50; }
    .form-status.error { display: block; background: #2a0a0a; border: 1px solid #4a1a1a; color: #f44336; }

    /* Footer */
    footer {
      padding: 32px 0;
      text-align: center;
      color: #555;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Eli Itah</h1>
      <p class="tagline">Software &amp; Cloud Systems Engineer &middot; Chicago, IL</p>
      <div class="links">
        <a href="https://github.com/eitah">GitHub</a>
        <a href="https://www.linkedin.com/in/elijahbit/">LinkedIn</a>
        <a href="#contact">Email</a>
      </div>
    </header>

    <section>
      <h2>About</h2>
      <p>
        Six years as a cloud systems engineer, four years as a full-stack engineer, and six years
        as a software engineer with formal training in Golang, Node, React, AngularJS, Python, and
        Java Spring. Twenty years of business experience spanning tech, insurance, biomedical, and
        higher education.
      </p>
      <p>
        I deliver solutions with panache&mdash;finding simple workarounds to complex problems.
        Quick to learn new systems and comfortable explaining technical concepts to any audience.
      </p>
    </section>

    <section>
      <h2>Experience</h2>

      <div class="role">
        <h3>Senior Systems Engineer</h3>
        <div class="meta">Spantree Technology Group &middot; Feb 2024 &ndash; Present</div>
        <ul>
          <li>AWS Cloud and Postgres infrastructure for client engagements</li>
        </ul>
      </div>

      <div class="role">
        <h3>Systems Engineer &mdash; GCP / Terraform / Kubernetes</h3>
        <div class="meta">Spantree Technology Group &middot; Apr 2019 &ndash; Apr 2023</div>
        <ul>
          <li>Golang, Terraform, and Kubernetes for clients in transportation, health care, and finance</li>
          <li>Orchestrated legacy batch architecture (Dagster) into a streaming model, increasing performance</li>
          <li>Built a custom Kubernetes operator for permissions management during a GCP migration</li>
          <li>Mentored junior engineers through first GoLang and Terraform commits</li>
        </ul>
      </div>

      <div class="role">
        <h3>Associate Front End Developer &mdash; Homepage</h3>
        <div class="meta">Cars.com &middot; Feb 2017 &ndash; Feb 2019</div>
        <ul>
          <li>Angular 1.0 and Node.js on mission-critical features: homepage, profiles, comparison API</li>
          <li>Mentored junior developers through paired programming and code reviews</li>
        </ul>
      </div>

      <div class="role">
        <h3>Full-Stack Engineer &mdash; CompoZed</h3>
        <div class="meta">Allstate Insurance &middot; Jun 2016 &ndash; Feb 2017</div>
        <ul>
          <li>React and Java Spring supporting core insurance quoting</li>
          <li>Selected for exclusive bootcamp with Galvanize; voted friendliest by peers</li>
        </ul>
      </div>

      <div class="role">
        <h3>App Dev / Systems Analyst &mdash; Billing &amp; Payments</h3>
        <div class="meta">Allstate Insurance &middot; Nov 2012 &ndash; Jun 2016</div>
        <ul>
          <li>Led development of enterprise payment and billing systems under PCI and SOX compliance</li>
          <li>Built and scaled a globally distributed engineering team of 10 across three continents</li>
          <li>Automated database operations, saving 30&ndash;40 hours per month</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Skills</h2>
      <div class="skills">
        <span>Golang</span>
        <span>Terraform</span>
        <span>Kubernetes</span>
        <span>AWS</span>
        <span>GCP</span>
        <span>PostgreSQL</span>
        <span>Node.js</span>
        <span>React</span>
        <span>AngularJS</span>
        <span>Java Spring</span>
        <span>Python</span>
        <span>SQL Server</span>
        <span>Docker</span>
        <span>CI/CD</span>
      </div>
    </section>

    <section>
      <h2>Volunteering</h2>
      <p>Microsoft TEALS instructor co-teaching AP Computer Science with Java to high school students (2024&ndash;2025). React Chicago member. Founding member of Glenwood Dance Studio in Rogers Park.</p>
    </section>

    <section>
      <h2>Education</h2>
      <p><strong>M.S.Ed., Counseling</strong> &mdash; Northern Illinois University, 2011</p>
      <p><strong>B.A., Biology</strong> &mdash; Reed College, Portland, OR, 2005</p>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p style="margin-bottom: 16px;">Send me a message and I'll get back to you.</p>
      <form id="contact-form">
        <input type="text" name="name" placeholder="Your name" required>
        <input type="email" name="email" placeholder="Your email" required>
        <textarea name="message" placeholder="Your message" required></textarea>
        <button type="submit">Send</button>
        <div id="form-status" class="form-status"></div>
      </form>
      <script>
        document.getElementById("contact-form").addEventListener("submit", async function(e) {
          e.preventDefault();
          const btn = this.querySelector("button");
          const status = document.getElementById("form-status");
          btn.disabled = true;
          btn.textContent = "Sending...";
          status.className = "form-status";
          status.style.display = "none";

          try {
            const res = await fetch("/contact", { method: "POST", body: new FormData(this) });
            const data = await res.json();
            if (res.ok) {
              status.textContent = "Message sent. Thanks!";
              status.className = "form-status success";
              this.reset();
            } else {
              status.textContent = data.error || "Failed to send.";
              status.className = "form-status error";
            }
          } catch {
            status.textContent = "Something went wrong.";
            status.className = "form-status error";
          }
          btn.disabled = false;
          btn.textContent = "Send";
        });
      </script>
    </section>
  </div>

  <footer>
    <div class="container">&copy; ${new Date().getFullYear()} Eli Itah</div>
  </footer>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  },
};
