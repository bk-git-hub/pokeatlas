import type { ReactNode } from "react";

type PokedexLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function PokedexLayout({
  children,
  modal,
}: PokedexLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
