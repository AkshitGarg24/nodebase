"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ManualTriggerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ManualtriggerDialog = ({ open, onOpenChange }: ManualTriggerDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manual Trigger</DialogTitle>
                    <DialogDescription>Configure Settings for manual trigger node.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">Used to manually execute a workflow, no configuration available.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}