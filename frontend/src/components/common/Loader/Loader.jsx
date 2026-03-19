import React from "react";

const Loader = ({ size = "md", className = "" }) => {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`${sizes[size]} border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin ${className}`} />
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="flex flex-col items-center gap-3">
      <Loader size="lg" />
      <p className="text-sm text-neutral-400 font-medium">Loading...</p>
    </div>
  </div>
);

export const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <Loader size="md" />
  </div>
);

export default Loader;
