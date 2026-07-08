import Image from "next/image";
import { Mail } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

/* Social links are placeholders (#) until the client provides real URLs. */
const socials = [
  { href: "#", label: "GitHub", Icon: FaGithub },
  { href: "#", label: "X (Twitter)", Icon: FaXTwitter },
  { href: "#", label: "LinkedIn", Icon: FaLinkedin },
  { href: "mailto:theagenticbros@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-alt py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Image
          src="/logo.png"
          alt="The Agentic Bros"
          width={1614}
          height={377}
          className="h-9 w-auto"
        />

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="clay-sm clay-press flex h-10 w-10 items-center justify-center text-body transition-colors hover:text-accent-ink"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <span className="text-sm text-muted">© 2026 The Agentic Bros. All rights reserved.</span>
      </div>
    </footer>
  );
}
