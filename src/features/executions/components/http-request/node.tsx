"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "../base-execution-nodes";

type HttpRequestData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: string;
    [key: string]: unknown;
}

type HttpsRequestNodeType = Node<HttpRequestData>;

export const HttpRequestNode = memo((props: NodeProps<HttpsRequestNodeType>) => {
    const nodeData = props.data as HttpRequestData;
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not Configured"

    return (
        <>
            <BaseExecutionNode 
                {...props}
                id={props.id}
                icon={GlobeIcon}
                name="HTTP Request"
                description={description}
                onSettings={() => {}}
                onDoubleClick={() => {}}
            />
        </>
    )
})

HttpRequestNode.displayName = "HttpRequestNode";