import { prefetch, trpc } from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query"

type GetManyWorkflows = inferInput<typeof trpc.workflows.getMany>

export const prefetchWorkflows = (params: GetManyWorkflows) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}

export const prefetchSingleWorkflow = (id: string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({ id }));
}