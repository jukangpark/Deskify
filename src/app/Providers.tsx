"use client";

// import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <div>
      {/* [To Do] : Add Theme */}
      {/* <ThemeProvider>{children}</ThemeProvider> */}
      {children}
    </div>
  );
};

export default Providers;
