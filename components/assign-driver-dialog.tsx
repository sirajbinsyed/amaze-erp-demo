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

interface AssignDriverDialogProps {
  delivery: DeliveryAssignment
  onAssign: (deliveryId: string, driver: string, scheduledDate: string, notes: string) => void
  trigger: React.ReactNode
}

const DRIVERS = ["Mike Johnson", "Tom Wilson", "Steve Davis", "Chris Brown", "Alex Smith"]

export function AssignDriverDialog({ delivery, onAssign, trigger }: AssignDriverDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(delivery.assignedDriver)
  const [scheduledDate, setScheduledDate] = useState(delivery.scheduledDate)
  const [notes, setNotes] = useState(delivery.notes)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAssign(delivery.id, selectedDriver, scheduledDate, notes)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Driver</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="font-medium">{delivery.orderNumber}</p>
          <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
          <p className="text-sm text-muted-foreground">{delivery.customerAddress}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="driver">Assign Driver</Label>
            <Select value={selectedDriver} onValueChange={setSelectedDriver}>
              <SelectTrigger>
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent>
                {DRIVERS.map((driver) => (
                  <SelectItem key={driver} value={driver}>
                    {driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheduledDate">Scheduled Date</Label>
            <Input
              id="scheduledDate"
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Delivery Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special delivery instructions..."
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Assign Driver
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
