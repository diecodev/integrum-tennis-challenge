"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export function PaymentButton({
  isDisabled,
  isEnrolled,
}: {
  isDisabled: boolean;
  isEnrolled: boolean;
}) {
  const { pending } = useFormStatus();
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("success") === "1") {
      toast.success("You have been successfully enrolled in the tournament.");
    }
  }, [params]);

  const buttonText = pending
    ? "Enrollment in Progress"
    : isDisabled
      ? "Full Registrations"
      : "Get Enrolled";

  return (
    !isEnrolled && (
      <button
        disabled={isDisabled}
        className={clsx(
          "w-full py-2 px-4 md:px-8 lg:px-12 text-center bg-indigo-500 rounded-lg font-medium text-white text-lg",
          { "bg-gray-300 text-gray-700": isDisabled },
        )}
        type="submit"
      >
        {buttonText}
      </button>
    )
  );
}
