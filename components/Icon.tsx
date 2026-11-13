import React from "react";
import { ICONS } from "@/data/services";

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "ico" }: IconProps) {
  const pathData = ICONS[name];
  if (!pathData) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: pathData }}
    />
  );
}
