import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full h-[142px]  opacity-100 pt-3 pl-4 rounded-lg bg-white border border-[#0000000D] focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-0",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
