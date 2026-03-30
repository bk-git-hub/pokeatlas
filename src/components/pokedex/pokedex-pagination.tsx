import { ActionLink } from "@/components/ui/action-link";
import { Panel } from "@/components/ui/panel";

type PokedexPaginationProps = {
  currentPage: number;
  totalPages: number;
  query?: string;
  type?: string | null;
};

export function PokedexPagination({
  currentPage,
  totalPages,
  query = "",
  type = null,
}: PokedexPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <Panel className="section-shell px-4 py-4 sm:px-6" tone="section">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-300">
          Page <span className="font-semibold text-white">{currentPage}</span>{" "}
          of <span className="font-semibold text-white">{totalPages}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PageLink
            disabled={currentPage <= 1}
            href={createPageHref(currentPage - 1, query, type)}
            label="Previous"
          />
          {pageNumbers.map((pageNumber) => (
            <PageLink
              key={pageNumber}
              href={createPageHref(pageNumber, query, type)}
              isCurrent={pageNumber === currentPage}
              label={String(pageNumber)}
            />
          ))}
          <PageLink
            disabled={currentPage >= totalPages}
            href={createPageHref(currentPage + 1, query, type)}
            label="Next"
          />
        </div>
      </div>
    </Panel>
  );
}

type PageLinkProps = {
  href: string;
  label: string;
  disabled?: boolean;
  isCurrent?: boolean;
};

function PageLink({
  href,
  label,
  disabled = false,
  isCurrent = false,
}: PageLinkProps) {
  if (disabled) {
    return (
      <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 px-4 text-sm text-slate-500">
        {label}
      </span>
    );
  }

  return (
    <ActionLink
      href={href}
      variant={isCurrent ? "primary" : "secondary"}
      className="min-h-11 px-4 text-sm"
    >
      {label}
    </ActionLink>
  );
}

function buildPageNumbers(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const normalizedStart = Math.max(1, end - 4);

  return Array.from(
    { length: end - normalizedStart + 1 },
    (_, index) => normalizedStart + index,
  );
}

function createPageHref(page: number, query: string, type: string | null) {
  const searchParams = new URLSearchParams({
    page: String(page),
  });

  if (query) {
    searchParams.set("q", query);
  }

  if (type) {
    searchParams.set("type", type);
  }

  return `/pokedex?${searchParams.toString()}`;
}
