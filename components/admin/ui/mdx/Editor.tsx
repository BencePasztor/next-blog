import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Control, Controller } from "react-hook-form"
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { quotePlugin } from '@mdxeditor/editor/plugins/quote'
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { linkPlugin } from "@mdxeditor/editor"
import { linkDialogPlugin } from "@mdxeditor/editor"
// import { imagePlugin } from "@mdxeditor/editor"
import { tablePlugin } from "@mdxeditor/editor"
import { BoldItalicUnderlineToggles, UndoRedo, CodeToggle, ListsToggle, BlockTypeSelect, CreateLink, /*InsertImage,*/ InsertTable } from "@mdxeditor/editor"

type MDXEditorAdminProps = {
    name: string,
    label: string,
    error?: string,
    control: Control<any>
}

const DynamicMDXEditor = dynamic(
    () => import('@/components/admin/ui/mdx/WrappedEditor'),
    { ssr: false }
)

const ForwardedRefMDXEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
    <DynamicMDXEditor {...props} editorRef={ref} />
))

const MDXEditorAdmin = ({ name, label, control, error }: MDXEditorAdminProps) => {

    const inputClasses = twMerge(
        "px-3 py-2 border border-slate-300 rounded-lg prose max-w-none w-full",
        clsx({
            "outline outline-red-600 outline-1 focus-within:outline-2": error,
        })
    )

    return (
        <div className="flex flex-col gap-2 text-sm mb-4">
            <label className="font-medium">{label}</label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ForwardedRefMDXEditor
                        className={inputClasses}
                        ref={ref}
                        markdown={value ?? ""}
                        onChange={onChange}
                        onBlur={onBlur}
                        plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin(), linkPlugin(), linkDialogPlugin(), tablePlugin(), toolbarPlugin({
                            toolbarContents: () => (<> <UndoRedo /><BoldItalicUnderlineToggles /><CodeToggle /><ListsToggle /><BlockTypeSelect /><CreateLink /><InsertTable /></>)
                        })]}
                    />
                )}
            />
            {error && <p className="font-medium text-red-600">{error}</p>}
        </div>
    )
}

MDXEditorAdmin.displayName = 'MDXEditorAdmin'

export default MDXEditorAdmin