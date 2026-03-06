"use client"

import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function JoinCommunityButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(124,92,252,0.3)] hover:scale-105">
          立即加入社区
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>加入 IHD 社区</DialogTitle>
          <DialogDescription>微信扫码添加，请注明来意</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-2">
          <Image
            src="/images/IHD-QR.png"
            alt="IHD-QR"
            width={320}
            height={320}
            className="rounded-xl border border-border/50 shadow-lg"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
