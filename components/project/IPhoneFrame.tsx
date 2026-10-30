/** iPhone bezel at 402×874 (dynamic island, status bar, home indicator). Scale it from the outside. */
export function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[874px] w-[402px] overflow-hidden rounded-[48px] bg-black shadow-[0_40px_80px_rgba(0,0,0,.18),0_0_0_1px_rgba(0,0,0,.12)]">
      <div className="absolute top-[11px] left-1/2 z-50 h-[37px] w-[126px] -translate-x-1/2 rounded-3xl bg-black" />
      <StatusBar />
      <div className="h-full">{children}</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[60] flex h-[34px] items-end justify-center pb-2">
        <div className="h-[5px] w-[139px] rounded-full bg-white/70" />
      </div>
    </div>
  );
}

function StatusBar() {
  const c = "#fff";
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-[154px] px-6 pt-[21px] pb-[19px]">
      <div className="flex h-[22px] flex-1 items-center justify-center pt-[1.5px]">
        <span className="text-[17px] leading-[22px] font-semibold text-white [font-family:-apple-system,'SF_Pro',system-ui]">9:41</span>
      </div>
      <div className="flex h-[22px] flex-1 items-center justify-center gap-[7px] pt-px pr-px">
        <svg width="19" height="12" viewBox="0 0 19 12" aria-hidden>
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden>
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c} />
          <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill={c} />
          <circle cx="8.5" cy="10.5" r="1.5" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden>
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
