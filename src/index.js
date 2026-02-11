import css from "./styles.css";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/styles.css") {
      return new Response(css, {
        headers: { "Content-Type": "text/css; charset=UTF-8" },
      });
    }

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
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Itah.me website <contact@contact.itah.me>",
            to: "elijahbit+resend@gmail.com",
            subject: `Itah.me website contact form: Message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            reply_to: email,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(JSON.stringify({ error: `Resend: ${err}` }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: `Worker error: ${e.message}` }), {
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
  <link rel="stylesheet" href="/styles.css">
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
        Software and cloud systems engineer with 16 years of hands-on engineering experience
        across the full stack: from Kubernetes and Terraform to React and Golang.
        Twenty years in the tech industry spanning insurance, finance, biomedical, and transportation.
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
        <li>Built and maintained GCP and AWS Cloud and Postgres infrastructure for clients in transportation and health care</li>
        <li>Migrated Dagster pipelines to streaming architecture from a batch model, reducing processing latency by 50%</li>
        <li>Co-authored AI Fluency Course for a technical audience, including prompt engineering and subagent architecture</li>
        <li>Mentored junior engineers through first Postgres, GoLang and Terraform commits</li>
        </ul>
      </div>

      <div class="role">
        <h3>Systems Engineer &mdash; GCP / Terraform / Kubernetes</h3>
        <div class="meta">Spantree Technology Group &middot; Apr 2019 &ndash; Apr 2023</div>
        <ul>
          <li>Golang, Terraform, and Kubernetes for clients in health care and finance</li>
          <li>Instantiated and maintained a client-hosted Github Actions Runner to enable GPU-accelerated CI/CD pipelines for a client in the health care industry</li>
          <li>Built a custom Kubernetes operator in GoLang for permissions management across GCP Accounts. The highly privileged agent performed AI management tasks related to PubSub, ensuring IAM Permissions were accurately and securely managed.</li>
          <li>Wrote plugins for an in-house developed self-service Kubernetes password manager, enabling technical users to set and manage their own passwords securely and easily. This imrpoved provisioning time for new infrastructure (databases, microservices, SaaS Integrations) from a few weeks to a few hours.</li>
          <li>Routinely paired with other technical users to troubleshoot issues and improve the overall developer experience.</li>
        </ul>
      </div>

      <div class="role">
        <h3>Associate Front End Developer &mdash; Homepage</h3>
        <div class="meta">Cars.com &middot; Feb 2017 &ndash; Feb 2019</div>
        <ul>
          <li>Angular 1.0, React, and Node.js on mission-critical features: homepage, profiles, comparison API</li>
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
          <li>Contributed to development of enterprise payment and billing systems under PCI and SOX compliance</li>
          <li>Routinely collaborated with a distributed engineering team of 10 across three continents</li>
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
      <h2>Email Contact</h2>
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
          status.textContent = "";

          try {
            const res = await fetch("/contact", { method: "POST", body: new FormData(this) });
            const data = await res.json();
            if (res.ok) {
              this.reset();
              status.textContent = "Message sent. Thanks!";
              status.className = "form-status success";
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
