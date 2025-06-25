// components/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { hydrateUser } from "@/redux/features/userSlice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateUser());
  }, [dispatch]);

  return children;
};