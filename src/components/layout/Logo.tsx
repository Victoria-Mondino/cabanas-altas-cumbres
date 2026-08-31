export function Logo({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? '#14201A' : '#F3F4EE'
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="16" stroke={stroke} strokeOpacity="0.55" />
      <path
        d="M9 22.5 14.5 11l3 6.4 2-3.6 5.5 8.7"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
