import { useEffect, useRef } from "react"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { TextAlign } from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  Trash2,
  Underline,
} from "lucide-react"

import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value?: string
  onChange?: (html: string) => void
  placeholder?: string
  toolbar?: boolean
  onClear?: () => void
  className?: string
  editorClassName?: string
}

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Type here",
  toolbar = true,
  onClear,
  className,
  editorClassName,
}: RichTextEditorProps) => {
  const lastHtml = useRef(value)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      lastHtml.current = html
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[120px] w-full px-4 py-3 text-sm leading-relaxed text-body outline-none",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_a]:text-brand [&_a]:underline [&_mark]:rounded [&_mark]:bg-highlight [&_mark]:px-0.5",
          editorClassName
        ),
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (value !== lastHtml.current) {
      lastHtml.current = value
      editor.commands.setContent(value || "")
    }
  }, [value, editor])

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isEmpty: editor?.isEmpty ?? true,
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isUnderline: editor?.isActive("underline") ?? false,
      isStrike: editor?.isActive("strike") ?? false,
      isLink: editor?.isActive("link") ?? false,
      isHighlight: editor?.isActive("highlight") ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
      alignLeft: editor?.isActive({ textAlign: "left" }) ?? false,
      alignCenter: editor?.isActive({ textAlign: "center" }) ?? false,
      alignRight: editor?.isActive({ textAlign: "right" }) ?? false,
    }),
  })

  const setLink = () => {
    if (!editor) return
    const previous = editor.getAttributes("link").href as string | undefined
    const url = window.prompt("Enter a URL", previous ?? "")
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white",
        className
      )}
    >
      {toolbar ? (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-line px-2 py-1.5">
          <ToolbarButton
            label="Italic"
            active={state?.isItalic}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </ToolbarButton>
          <ToolbarButton
            label="Bold"
            active={state?.isBold}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold />
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            active={state?.isUnderline}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <Underline />
          </ToolbarButton>
          <ToolbarButton
            label="Strikethrough"
            active={state?.isStrike}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <Strikethrough />
          </ToolbarButton>

          <Divider />

          <ToolbarButton label="Link" active={state?.isLink} onClick={setLink}>
            <LinkIcon />
          </ToolbarButton>
          <ToolbarButton
            label="Highlight"
            active={state?.isHighlight}
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
          >
            <Highlighter />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Align left"
            active={state?.alignLeft}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft />
          </ToolbarButton>
          <ToolbarButton
            label="Align center"
            active={state?.alignCenter}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter />
          </ToolbarButton>
          <ToolbarButton
            label="Align right"
            active={state?.alignRight}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Bullet list"
            active={state?.isBulletList}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            active={state?.isOrderedList}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </ToolbarButton>
        </div>
      ) : null}

      <div className="relative">
        {state?.isEmpty ? (
          <span className="pointer-events-none absolute top-3 left-4 text-sm text-placeholder">
            {placeholder}
          </span>
        ) : null}
        <EditorContent editor={editor} />
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear content"
            title="Clear content"
            className="absolute top-3 right-3 text-faint transition-colors hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        ) : null}
      </div>
    </div>
  )
};

const Divider = () => {
  return <span className="mx-1 h-5 w-px shrink-0 bg-line" />
}

type ToolbarButtonProps = {
  label: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}

function ToolbarButton({ label, active, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      // Prevent the editor from losing its selection when the button is pressed.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md text-body-subtle transition-colors hover:bg-brand-soft hover:text-brand [&_svg]:size-4",
        active && "bg-brand-soft text-brand"
      )}
    >
      {children}
    </button>
  )
}

export default RichTextEditor
