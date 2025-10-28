"use client"

import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "@/features/workflows/hooks/use-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <EntityList
            items={workflows.data.items}
            renderItem={(workflow) => <WorkflowItem data={workflow} />}
            getKey={(workflow) => workflow.id}
            emptyView={<WorkflowsEmpty />}
        />
    )
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
        search={<WorkflowsSearch />}
        pagination={<WorkflowPagination />}
    >
        {children}
    </EntityContainer>
}

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const { searchValue, onSearchChange } = useEntitySearch({ params, setParams })

    return (
        <EntitySearch
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search Workflows"
        />
    )
}

export const WorkflowPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();

    return (
        <EntityPagination
            disabled={workflows.isPending}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => setParams({ ...params, page })}
        />
    )
}

export const WorkflowsLoading = () => {
    return (
        <LoadingView message="Loading Workflows..." />
    )
}

export const WorkflowsError = () => {
    return (
        <ErrorView message="Error Loading Workflows..." />
    )
}

export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModel();
    const router = useRouter();

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
            <EmptyView title="No Workflows" buttonLabel="Add Workflow" onNew={handleCreate}
                message="No workflows found. Start by creating a workflow."
            />
        </>
    )
}

export const WorkflowItem = ({ data }: { data: Workflow }) => {

    const removeWorkflow = useRemoveWorkflow();

    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            image={
                <div className="size-8 flex items-center justify-center"><WorkflowIcon className="size-5 text-muted-foreground" /></div>
            }
            onRemove={() => { removeWorkflow.mutate({ id: data.id }) }}
            isRemoving={removeWorkflow.isPending}
            subtitle={
                <>
                    Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{" "}
                    &bull;  Created {formatDistanceToNow(data.createdAt, { addSuffix: true })}

                </>
            }
        />
    )
}