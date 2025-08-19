"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { DUMMY_PROJECTS } from "@/lib/dummy-data"

interface UploadDesignDialogProps {
  onUpload: (designData: any) => void
  trigger: React.ReactNode
}

export function UploadDesignDialog({ onUpload, trigger }: UploadDesignDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    projectId: "",
    fileType: "design" as "design" | "mockup" | "proof",
    notes: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !formData.projectId) return

    const project = DUMMY_PROJECTS.find((p) => p.id === formData.projectId)
    const designData = {
      projectId: formData.projectId,
      projectName: project?.name || "",
      customerName: project?.customerName || "",
      fileName: selectedFile.name,
      fileType: formData.fileType,
      status: "pending",
      uploadDate: new Date().toISOString().split("T")[0],
      notes: formData.notes,
    }

    onUpload(designData)
    setOpen(false)
    setSelectedFile(null)
    setFormData({ projectId: "", fileType: "design", notes: "" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Design File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select
              value={formData.projectId}
              onValueChange={(value) => setFormData({ ...formData, projectId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_PROJECTS.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} - {project.customerName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fileType">File Type</Label>
            <Select
              value={formData.fileType}
              onValueChange={(value) => setFormData({ ...formData, fileType: value as "design" | "mockup" | "proof" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design File</SelectItem>
                <SelectItem value="mockup">Mockup</SelectItem>
                <SelectItem value="proof">Proof</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Design File</Label>
            <Input id="file" type="file" onChange={handleFileChange} accept=".psd,.ai,.jpg,.jpeg,.png,.pdf" required />
            {selectedFile && (
              <Card className="p-2">
                <CardContent className="p-2">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Design specifications, requirements, etc..."
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={!selectedFile || !formData.projectId}>
              Upload Design
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
