import { ActionLink } from "@/components/ui/action-link";

type PokedexPaginationProps = {
  page: number;
  totalPages: number;
  query: string;
};

function buildHref(page: number, query: string) {
  const params = new URLSearchParams({
    page: String(page),
  });

  if (query) {
    params.set("q", query);
  }

  return `/pokedex?${params.toString()}`;
}

export function PokedexPagination({
  page,
  totalPages,
  query,
}: PokedexPaginationProps) {
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="Pokedex pagination"
      className="panel-soft flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-3">
        {hasPrevious ? (
          <ActionLink href={buildHref(page - 1, query)} variant="secondary">
            Previous page
          </ActionLink>
        ) : (
          <span className="cta-link cta-link-secondary cursor-not-allowed opacity-55">
            Previous page
          </span>
        )}
        {hasNext ? (
          <ActionLink href={buildHref(page + 1, query)} variant="primary">
            Next page
          </ActionLink>
        ) : (
          <span className="cta-link cta-link-primary cursor-not-allowed opacity-55">
            Next page
          </span>
        )}
      </div>
    </nav>
  );
}
