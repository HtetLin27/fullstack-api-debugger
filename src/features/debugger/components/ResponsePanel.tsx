export interface ResponseState {
  status: number | null;
  timeMs: number | null;
  sizeKb: number | null;
  data: unknown | null;
}

interface ResponsePanelProps {
  response: ResponseState;
  isLoading: boolean;
}

export function ResponsePanel({ response, isLoading }: ResponsePanelProps) {
  const hasResponse = response.data !== null;
  const responseBody = hasResponse ? JSON.stringify(response.data, null, 2) : "";
  const statusLabel =
    response.status === null ? "--" : response.status < 400 ? `${response.status} OK` : `${response.status} Error`;
  const timeLabel = response.timeMs === null ? "-- ms" : `${response.timeMs} ms`;
  const sizeLabel = response.sizeKb === null ? "-- KB" : `${response.sizeKb} KB`;
  const responseTag = isLoading ? "Loading..." : hasResponse ? "Mock response" : "No response";

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Response</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Inspect metadata and payload from the API output.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
          {responseTag}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Status</p>
          <div className="mt-1">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {statusLabel}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Time</p>
          <p className="mt-1 font-semibold text-zinc-900">{timeLabel}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Size</p>
          <p className="mt-1 font-semibold text-zinc-900">{sizeLabel}</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-2">
          <p className="text-sm font-medium text-zinc-700">Response Body</p>
          <span className="rounded-md border border-zinc-300 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600">
            JSON
          </span>
        </div>
        {isLoading ? (
          <div className="min-h-64 bg-zinc-50 p-4">
            <div className="flex h-full min-h-56 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
              Sending request...
            </div>
          </div>
        ) : hasResponse ? (
          <pre className="min-h-64 overflow-x-auto bg-zinc-950 p-4 font-mono text-sm leading-6 text-zinc-100">
            {responseBody}
          </pre>
        ) : (
          <div className="min-h-64 bg-zinc-50 p-4">
            <div className="flex h-full min-h-56 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
              Send a request to see the response body.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
