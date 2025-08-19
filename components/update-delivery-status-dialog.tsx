"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { DeliveryAssignment } from "@/lib/dummy-data"

interface UpdateDeliveryStatusDialogProps {
  delivery: DeliveryAssignment
  onUpdate: (deliveryId: string, status: string, deliveredDate?: string, notes?: string) => void
  trigger: React.ReactNode
}

export function UpdateDeliveryStatusDialog({ delivery, onUpdate, trigger }: UpdateDeliveryStatusDialogProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(delivery.status)
  const [deliveredDate, setDeliveredDate] = useState(delivery.deliveredDate || "")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(delivery.id, status, deliveredDate, notes)
    setOpen(false)
    setNotes("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Delivery Status</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="font-medium">{delivery.orderNumber}</p>
          <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
          <p className="text-sm text-muted-foreground">Driver: {delivery.assignedDriver}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Delivery Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="dispatched">Dispatched</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(status === "delivered" || status === "failed") && (
            <div className="space-y-2">
              <Label htmlFor="deliveredDate">{status === "delivered" ? "Delivered Date" : "Attempted Date"}</Label>
              <Input
                id="deliveredDate"
                type="date"
                value={deliveredDate}
                onChange={(e) => setDeliveredDate(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="notes">Status Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Update notes, issues, or customer feedback..."
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Update Status
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
