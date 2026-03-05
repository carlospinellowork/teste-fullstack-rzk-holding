import { AppSidebar } from "@/components/globals/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryProvider } from "@/providers/react-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RZK Holding | Financeiro",
  description: "Sistema de Gestão Financeira e BI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        <QueryProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 flex flex-col min-w-0">
                {children}
                <Toaster position="top-center" />
              </main>
            </div>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
