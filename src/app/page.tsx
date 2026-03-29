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

  const [response] = useState<ResponseState>({
    status: 200,
    timeMs: 123,
    sizeKb: 1.4,
    data: {
      success: true,
      message: "User list loaded",
      data: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    },
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

  const handleSend = () => {
    // Intentionally empty for now. Real request logic comes in a later step.
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
        <AppHeader />
        <section className="grid gap-6 lg:grid-cols-2">
          <RequestPanel
            request={request}
            onMethodChange={handleMethodChange}
            onUrlChange={handleUrlChange}
            onTabChange={handleTabChange}
            onSend={handleSend}
          />
          <ResponsePanel response={response} />
        </section>
      </main>
    </div>
  );
}
