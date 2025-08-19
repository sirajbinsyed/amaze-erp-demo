"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Lead } from "@/lib/dummy-data"

interface ConvertLeadDialogProps {
  lead: Lead
  onConvert: (orderData: any) => void
  trigger: React.ReactNode
}

export function ConvertLeadDialog({ lead, onConvert, trigger }: ConvertLeadDialogProps) {
  const [open, setOpen] = useState(false)
  const [orderData, setOrderData] = useState({
    orderNumber: `ORD-${Date.now()}`,
    value: lead.value,
    notes: "",
    deliveryDate: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder = {
      customerName: lead.customerName,
      email: lead.email,
      phone: lead.phone,
      ...orderData,
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
    }
    onConvert(newOrder)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convert Lead to Order</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="font-medium">{lead.customerName}</p>
          <p className="text-sm text-muted-foreground">{lead.email}</p>
          <p className="text-sm text-muted-foreground">{lead.phone}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              value={orderData.orderNumber}
              onChange={(e) => setOrderData({ ...orderData, orderNumber: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Order Value ($)</Label>
            <Input
              id="value"
              type="number"
              value={orderData.value}
              onChange={(e) => setOrderData({ ...orderData, value: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
            <Input
              id="deliveryDate"
              type="date"
              value={orderData.deliveryDate}
              onChange={(e) => setOrderData({ ...orderData, deliveryDate: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Textarea
              id="notes"
              value={orderData.notes}
              onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
              placeholder="Special requirements, materials, etc..."
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Create Order
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
