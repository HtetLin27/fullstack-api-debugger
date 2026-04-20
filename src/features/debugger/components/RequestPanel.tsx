"use client";

const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const requestTabs = ["Params", "Headers", "Body", "Auth"] as const;

export type HttpMethod = (typeof httpMethods)[number];
export type RequestTab = (typeof requestTabs)[number];

export interface RequestState {
  method: HttpMethod;
  url: string;
  activeTab: RequestTab;
}

interface RequestPanelProps {
  request: RequestState;
  isLoading: boolean;
  onMethodChange: (method: HttpMethod) => void;
  onUrlChange: (url: string) => void;
  onTabChange: (tab: RequestTab) => void;
  onSend: () => void;
}

const tabRows: Record<RequestTab, Array<[string, string, string]>> = {
  Params: [
    ["page", "1", "Pagination example"],
    ["limit", "20", "Items per page"],
  ],
  Headers: [
    ["Content-Type", "application/json", "JSON payload"],
    ["Authorization", "Bearer <token>", "Private endpoints"],
  ],
  Body: [
    ["type", "raw (JSON)", "Body mode"],
    ["preview", '{"name":"Alice"}', "Example JSON body"],
  ],
  Auth: [
    ["authType", "Bearer Token", "Common API auth"],
    ["token", "********", "Add real token later"],
  ],
};

export function RequestPanel({
  request,
  isLoading,
  onMethodChange,
  onUrlChange,
  onTabChange,
  onSend,
}: RequestPanelProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Request</h2>
      <p className="mt-1 text-sm text-zinc-600">Build your request before execution.</p>

      <div className="mt-4 grid gap-4">
        <div className="grid gap-3 lg:grid-cols-[140px_1fr_auto] lg:items-end">
          <label className="grid gap-1">
            <span className="text-sm font-medium text-zinc-700">Method</span>
            <select
              value={request.method}
              onChange={(event) => onMethodChange(event.target.value as HttpMethod)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            >
              {httpMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-zinc-700">URL</span>
            <input
              type="text"
              value={request.url}
              onChange={(event) => onUrlChange(event.target.value)}
              placeholder="https://api.example.com/users"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400"
            />
          </label>

          <button
            type="button"
            disabled={isLoading}
            onClick={onSend}
            className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-white ${
              isLoading
                ? "cursor-not-allowed bg-zinc-500"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <div
            role="tablist"
            aria-label="Request options"
            className="flex flex-wrap gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2"
          >
            {requestTabs.map((tab) => {
              const isActive = request.activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition ${
                    isActive
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span className="col-span-4">Key</span>
            <span className="col-span-4">Value</span>
            <span className="col-span-4">Notes</span>
          </div>

          <div className="divide-y divide-zinc-100">
            {tabRows[request.activeTab].map(([key, value, notes]) => (
              <div key={key} className="grid grid-cols-12 px-3 py-2 text-sm">
                <span className="col-span-4 font-mono text-zinc-700">{key}</span>
                <span className="col-span-4 text-zinc-900">{value}</span>
                <span className="col-span-4 text-zinc-500">{notes}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
