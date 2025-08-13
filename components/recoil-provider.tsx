"use client"

import { RecoilRoot } from "recoil"
import { Suspense } from "react"
import type { ReactNode } from "react"

interface RecoilProviderProps {
  children: ReactNode
}

// Recoil 초기화 함수
function RecoilInitializer() {
  return null
}

export function RecoilProvider({ children }: RecoilProviderProps) {
  return (
    <RecoilRoot>
      <RecoilInitializer />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </RecoilRoot>
  )
}
