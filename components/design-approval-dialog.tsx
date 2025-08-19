"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { DesignFile } from "@/lib/dummy-data"

interface DesignApprovalDialogProps {
  designFile: DesignFile
  onApproval: (fileId: string, action: "approve" | "request-revision", notes?: string) => void
  trigger: React.ReactNode
}

export function DesignApprovalDialog({ designFile, onApproval, trigger }: DesignApprovalDialogProps) {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState<"approve" | "request-revision" | null>(null)
  const [notes, setNotes] = useState("")

  const handleSubmit = (selectedAction: "approve" | "request-revision") => {
    onApproval(designFile.id, selectedAction, notes)
    setOpen(false)
    setAction(null)
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Design Approval</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="font-medium">{designFile.fileName}</p>
          <p className="text-sm text-muted-foreground">{designFile.projectName}</p>
          <p className="text-sm text-muted-foreground">{designFile.customerName}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes {action === "request-revision" && "(Required for revisions)"}</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                action === "approve" ? "Optional approval notes..." : "Please specify what changes are needed..."
              }
              required={action === "request-revision"}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1"
              onClick={() => handleSubmit("approve")}
              onMouseEnter={() => setAction("approve")}
            >
              Approve Design
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => handleSubmit("request-revision")}
              onMouseEnter={() => setAction("request-revision")}
            >
              Request Revision
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
