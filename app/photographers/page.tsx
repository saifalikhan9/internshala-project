import { Suspense } from "react";
import { PhotographersContent } from "./PhotographersContent";

export default function PhotographersPage() {
  return (
    <Suspense fallback={<div>Loading photographers...</div>}>
      <PhotographersContent />
    </Suspense>
  );
}
