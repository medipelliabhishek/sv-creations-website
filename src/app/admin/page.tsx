import type { Metadata } from "next";
import AdminForm from "@/components/admin/AdminForm";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminForm />;
}
