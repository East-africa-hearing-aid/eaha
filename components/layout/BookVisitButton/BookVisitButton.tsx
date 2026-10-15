"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./BookVisitButton.css";

interface BookVisitButtonProps {
  /** Hide while the full-screen menu is open. */
  hidden?: boolean;
}

/** "• Book a Visit" pill that sits to the left of the Menu button. */
const BookVisitButton = ({ hidden = false }: BookVisitButtonProps) => {
  const pathname = usePathname();
  // Already on the booking page — nothing to link to.
  if (pathname === "/book") return null;

  return (
    <Link
      href="/book"
      className={`book-visit font-suisse-mono ${hidden ? "is-hidden" : ""}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      {/* orange fill that grows out of the dot (right side) on hover */}
      <span className="book-visit__fill" aria-hidden />
      {/* label rolls up to a second copy on hover */}
      <span className="book-visit__label">
        <span className="book-visit__text">Book a Visit</span>
        <span className="book-visit__text book-visit__text--next" aria-hidden>
          Book a Visit
        </span>
      </span>
      <span className="book-visit__dot" aria-hidden />
    </Link>
  );
};

export default BookVisitButton;
