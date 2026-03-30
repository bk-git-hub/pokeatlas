import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  inverse?: boolean;
  titleId?: string;
  titleAs?: "h1" | "h2" | "h3";
  titleClassName?: string;
  wrapperClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
  titleId,
  titleAs = "h2",
  titleClassName,
  wrapperClassName,
}: SectionHeadingProps) {
  const TitleTag = titleAs;
  const titleBaseClassName =
    titleAs === "h1"
      ? "max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-7xl"
      : "text-3xl font-semibold tracking-[-0.04em] sm:text-4xl";
  const toneClassName = inverse ? "text-white" : "text-white";
  const descriptionClassName = inverse
    ? "text-base leading-8 text-slate-300 sm:text-lg"
    : "text-base leading-8 text-slate-300";

  return (
    <div className={wrapperClassName ?? "space-y-3"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <TitleTag
        id={titleId}
        className={[titleBaseClassName, toneClassName, titleClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </TitleTag>
      {description ? <div className={descriptionClassName}>{description}</div> : null}
    </div>
  );
}
