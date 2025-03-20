// AuthProvider.tsx
"use client";

import React from "react";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default AuthProvider;