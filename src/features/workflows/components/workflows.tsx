"use client"

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return <div className="flex justify-center items-center">
        {JSON.stringify(workflows.data, null, 2)}
    </div>
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter();
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModel();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError: (error) => {
                handleError(error);
            }
        })
    }

    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                onNew={handleCreate}
                disabled={disabled}
                isCreating={createWorkflow.isPending}
                newButtonLabel="New Workflow"
            />
        </>
    )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return <EntityContainer
        header={<WorkflowsHeader />}
        search={<></>}
        pagination={<></>}
    >
        {children}
    </EntityContainer>
}