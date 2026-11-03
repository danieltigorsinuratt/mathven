import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const DARK = "#211A2B";

export function DashboardIcon(props: IconProps) {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="2.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="6" y="6" width="5" height="5" rx="0.6" fill="currentColor" />
      <rect x="13" y="6" width="5" height="5" rx="0.6" fill="currentColor" />
      <rect x="6" y="13" width="5" height="5" rx="0.6" fill="currentColor" />
      <rect x="13" y="13" width="5" height="5" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export function MateriIcon(props: IconProps) {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M1.5 5.5 8 3l8 2.5L22.5 3v15.5L16 21l-8-2.5L1.5 21z" fill="currentColor" />
      <path d="M8 3v15.5M16 5.5V21" stroke={DARK} strokeWidth="1.6" />
    </svg>
  );
}

export function SoalIcon(props: IconProps) {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 2.5h13.5A2.5 2.5 0 0 1 21 5v14a2.5 2.5 0 0 1-2.5 2.5H5z"
        fill="currentColor"
      />
      <path d="M2 4v17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M10 9.2a2.4 2.4 0 1 1 3.7 2c-.9.6-1.5 1.1-1.5 2.2"
        stroke={DARK}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="12.2" cy="16.6" r="1.15" fill={DARK} />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="7" r="4.6" fill="currentColor" />
      <path d="M2.5 22c0-5 4.2-7.8 9.5-7.8s9.5 2.8 9.5 7.8z" fill="currentColor" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none" aria-hidden="true" {...props}>
      <rect x="0" y="0" width="30" height="40" rx="2" fill="#fff" />
      <path d="M14 20h31" stroke="#fff" strokeWidth="4" strokeLinecap="butt" />
      <path d="M14 20h16" stroke={DARK} strokeWidth="4" />
      <path d="M37 12.5 44.5 20 37 27.5" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true" {...props}>
      <rect x="0" y="0" width="28" height="18" rx="2" fill="#6E6B7B" />
      <path d="M1.5 2.2 14 11.2 26.5 2.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg width="22" height="27" viewBox="0 0 22 27" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.2 11.5V8a5.8 5.8 0 0 1 11.6 0v3.5"
        stroke="#6E6B7B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="0.5" y="11" width="21" height="15.5" rx="3.2" fill="#6E6B7B" />
    </svg>
  );
}
