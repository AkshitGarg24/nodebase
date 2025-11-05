import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-nodes";
import { MousePointerIcon } from "lucide-react";
import { ManualtriggerDialog } from "./dialog";

export const ManualtriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const nodeStatus = "loading";

    const handleOpenSettings = () => setDialogOpen(true);

    return (
        <>
            <ManualtriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            <BaseTriggerNode
                {...props}
                icon={MousePointerIcon}
                name={`When clicking 'Execute workflow'`}
                onSettings={handleOpenSettings}
                onDoubleClick={handleOpenSettings}
                status={nodeStatus}
            />
        </>
    )
})