"use client";

import { useEffect } from "react";

export default function TestErrorPage() {
  useEffect(() => {
    throw new Error("Test Error Boundary Trigger");
  }, []);

  throw new Error("Test Error Boundary Trigger");
}
