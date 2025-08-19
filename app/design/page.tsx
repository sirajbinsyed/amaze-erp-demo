"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DesignApprovalDialog } from "@/components/design-approval-dialog"
import { UploadDesignDialog } from "@/components/upload-design-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User } from "@/lib/auth"
import { DUMMY_DESIGN_FILES, type DesignFile } from "@/lib/dummy-data"

export default function DesignDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [designFiles, setDesignFiles] = useState<DesignFile[]>(DUMMY_DESIGN_FILES)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const filteredFiles = designFiles.filter((file) => {
    const matchesSearch =
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || file.status === statusFilter
    const matchesType = typeFilter === "all" || file.fileType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleUploadDesign = (designData: any) => {
    const newDesign: DesignFile = {
      id: (designFiles.length + 1).toString(),
      ...designData,
    }
    setDesignFiles([...designFiles, newDesign])
    console.log("[v0] Uploading design:", designData)
  }

  const handleApproval = (fileId: string, action: "approve" | "request-revision", notes?: string) => {
    setDesignFiles(
      designFiles.map((file) =>
        file.id === fileId
          ? {
              ...file,
              status: action === "approve" ? "approved" : "revision-requested",
              approvedBy: action === "approve" ? user?.name : undefined,
              revisionNotes: action === "request-revision" ? notes : undefined,
            }
          : file,
      ),
    )
    console.log("[v0] Design approval:", { fileId, action, notes })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "revision-requested":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "design":
        return "🎨"
      case "mockup":
        return "🖼️"
      case "proof":
        return "📋"
      default:
        return "📄"
    }
  }

  if (!user) return null

  return (
    <AuthGuard allowedRoles={["admin", "project"]}>
      <DashboardLayout user={user} title="Design Module">
        <div className="space-y-6">
          {/* Design Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{designFiles.length}</div>
                <p className="text-sm text-muted-foreground">Total Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {designFiles.filter((f) => f.status === "pending").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {designFiles.filter((f) => f.status === "approved").length}
                </div>
                <p className="text-sm text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {designFiles.filter((f) => f.status === "revision-requested").length}
                </div>
                <p className="text-sm text-muted-foreground">Need Revision</p>
              </CardContent>
            </Card>
          </div>

          {/* Design Files Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Design Files</CardTitle>
              <UploadDesignDialog onUpload={handleUploadDesign} trigger={<Button>Upload Design</Button>} />
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="revision-requested">Needs Revision</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="mockup">Mockup</SelectItem>
                    <SelectItem value="proof">Proof</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Files List */}
              <div className="space-y-4">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{getFileTypeIcon(file.fileType)}</div>
                      <div>
                        <p className="font-medium">{file.fileName}</p>
                        <p className="text-sm text-muted-foreground">{file.projectName}</p>
                        <p className="text-sm text-muted-foreground">{file.customerName}</p>
                        {file.revisionNotes && (
                          <p className="text-sm text-destructive mt-1">Revision: {file.revisionNotes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Uploaded: {file.uploadDate}</p>
                        {file.approvedBy && (
                          <p className="text-sm text-muted-foreground">Approved by: {file.approvedBy}</p>
                        )}
                      </div>
                      <Badge variant={getStatusBadgeVariant(file.status)}>{file.status.replace("-", " ")}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {file.status === "pending" && (
                          <DesignApprovalDialog
                            designFile={file}
                            onApproval={handleApproval}
                            trigger={<Button size="sm">Review</Button>}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
