import AppMenu from "@/components/navbar/layout/Header/AppMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppMenu>{children}</AppMenu>
    </section>
  );
}
