import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualtriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { NodeType } from "@/generated/prisma";
import { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
    [NodeType.INITIAL]: InitialNode,
    [NodeType.MANUAL_TRIGGER]: ManualtriggerNode,
    [NodeType.HTTP_REQUEST]: HttpRequestNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;