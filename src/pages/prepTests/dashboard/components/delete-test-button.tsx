import { Trash2 } from "lucide-react"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/toast"
import { deleteTestApi } from "@/services/tests"
import type { Test } from "@/types"
import { getApiErrorMessage } from "@/utils/helper"

type DeleteTestButtonProps = {
  test: Test
  onDeleted: (id: string) => void
}

const DeleteTestButton = ({ test, onDeleted }: DeleteTestButtonProps) => {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await deleteTestApi(test.id)
      if (response.status === "success") {
        toast.add({
          title: "Test deleted",
          description: response.message,
        })
        onDeleted(test.id)
        setOpen(false)
      } else {
        toast.add({
          title: "Failed to delete test",
          description: response.message,
        })
      }
    } catch (error) {
      toast.add({
        title: "Failed to delete test",
        description: getApiErrorMessage(error),
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            aria-label="Delete"
            title="Delete"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#e5646d] transition-colors hover:bg-[#fdECEE]"
          />
        }
      >
        <Trash2 size={16} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete test?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">{test.name}</span> and
            all of its questions. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTestButton
