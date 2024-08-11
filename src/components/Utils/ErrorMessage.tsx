import { CircleAlert } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="flex gap-4 border-destructive px-6 py-4">
      <CircleAlert className="text-destructive" size={24} />
      <span className="mr-8 text-base font-bold text-destructive">
        {children}
      </span>
    </Card>
  );
}
