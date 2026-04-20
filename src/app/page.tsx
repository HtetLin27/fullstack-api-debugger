"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  RequestPanel,
  type HttpMethod,
  type RequestState,
  type RequestTab,
} from "@/features/debugger/components/RequestPanel";
import {
  ResponsePanel,
  type ResponseState,
} from "@/features/debugger/components/ResponsePanel";

export default function Home() {
  const [request, setRequest] = useState<RequestState>({
    method: "GET",
    url: "https://api.example.com/users",
    activeTab: "Params",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseState>({
    status: null,
    timeMs: null,
    sizeKb: null,
    data: null,
  });

  const handleMethodChange = (method: HttpMethod) => {
    setRequest((previous) => ({ ...previous, method }));
  };

  const handleUrlChange = (url: string) => {
    setRequest((previous) => ({ ...previous, url }));
  };

  const handleTabChange = (activeTab: RequestTab) => {
    setRequest((previous) => ({ ...previous, activeTab }));
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse({
      status: null,
      timeMs: null,
      sizeKb: null,
      data: null,
    });

    const startedAt = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 800));

    const fakeData = {
      success: true,
      message: "Mock response received.",
      request: {
        method: request.method,
        url: request.url,
      },
      data: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    };

    const responseBody = JSON.stringify(fakeData);

    setResponse({
      status: 200,
      timeMs: Date.now() - startedAt,
      sizeKb: Number((responseBody.length / 1024).toFixed(2)),
      data: fakeData,
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <AppHeader />
        <section className="grid gap-6 lg:grid-cols-2">
          <RequestPanel
            request={request}
            isLoading={loading}
            onMethodChange={handleMethodChange}
            onUrlChange={handleUrlChange}
            onTabChange={handleTabChange}
            onSend={handleSend}
          />
          <ResponsePanel response={response} isLoading={loading} />
        </section>
      </main>
    </div>
  );
}
