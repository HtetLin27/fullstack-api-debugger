export function AppHeader() {
  return (
    <header className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">MVP Layout</p>
      <h1 className="mt-2 text-2xl font-semibold leading-tight">API Debugger</h1>
      <p className="mt-2 text-sm text-zinc-600">
        A clean workspace for preparing requests and inspecting responses.
      </p>
    </header>
  );
}
