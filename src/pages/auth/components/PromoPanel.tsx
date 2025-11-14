function PromoPanel() {
  return (
    <aside className="hidden min-h-screen w-[520px] flex-col justify-between bg-primary px-12 pb-12 pt-16 text-white lg:flex">
      <div className="flex items-center gap-4 text-3xl font-black tracking-wide">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-primary">
          T
        </div>
        TODO
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-12">
        <div className="inline-flex flex-col items-center gap-3 rounded-3xl bg-white/15 px-10 py-8 text-center text-xl font-semibold leading-relaxed">
          <span>The Haunted ToDo List</span>
          <span className="text-base font-normal">Tasks That Won&apos;t Stay Buried!</span>
        </div>
        <div className="h-32 w-32 rounded-full bg-white/20" />
        <div className="h-24 w-24 rounded-full bg-white/25" />
      </div>

      <div className="space-y-1 text-sm uppercase tracking-[0.4em] text-white/80">
        <p>IZETCH VALLY</p>
        <p>IZETCH VALLY</p>
      </div>
    </aside>
  )
}

export default PromoPanel

