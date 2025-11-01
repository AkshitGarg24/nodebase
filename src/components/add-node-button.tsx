"use client"

import { PlusIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "./ui/button";

export const AddNodeButton = memo(() => {
    return (
        <Button className="bg-background" size={"icon"} variant={"outline"}>
            <PlusIcon />
        </Button>
    )
})

AddNodeButton.displayName = "AddNodeButton";