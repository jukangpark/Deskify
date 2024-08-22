"use client";

import { RecoilRoot } from "recoil";

// import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <RecoilRoot>
      <div>
        {/* [To Do] : Add Theme */}
        {/* <ThemeProvider>{children}</ThemeProvider> */}
        {children}
      </div>
    </RecoilRoot>
  );
};

export default Providers;
