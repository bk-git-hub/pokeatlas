import type { ReactNode } from "react";

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
  const eyebrowClassName = inverse
    ? "section-eyebrow section-eyebrow-inverse"
    : "section-eyebrow";
  const titleBaseClassName =
    titleAs === "h1" ? "display-title" : "section-title";
  const titleToneClassName = inverse ? " section-title-inverse" : "";
  const descriptionClassName = inverse
    ? "body-copy body-copy-inverse"
    : "body-copy";
  const headingClassName = [titleBaseClassName + titleToneClassName, titleClassName]
    .filter(Boolean)
    .join(" ");
  const sectionClassName = wrapperClassName ?? "space-y-3";

  return (
    <div className={sectionClassName}>
      <p className={eyebrowClassName}>{eyebrow}</p>
      <TitleTag id={titleId} className={headingClassName}>
        {title}
      </TitleTag>
      {description ? <div className={descriptionClassName}>{description}</div> : null}
    </div>
  );
}
