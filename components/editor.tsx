"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useState } from 'react'
import { 
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code2, Image as ImageIcon, Link as LinkIcon, 
  Undo, Redo, Eye
} from 'lucide-react'

const MenuButton = ({ onClick, isActive = false, children }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md transition-all ${
      isActive ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-700'
    }`}
  >
    {children}
  </button>
)

export default function BlogEditor() {
  const [htmlContent, setHtmlContent] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: true }),
      Link.configure({ openOnClick: false }),
    ],
    content: '<h1>Untitled Post</h1><p>Write something amazing...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      
      {/* LEFT SIDE: EDITOR */}
      <div className="flex flex-col border border-zinc-800 rounded-xl bg-zinc-900 overflow-hidden shadow-xl">
        <div className="flex flex-wrap gap-1 p-2 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10">
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}><Heading1 size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}><Code2 size={18} /></MenuButton>
          <div className="w-px h-6 bg-zinc-700 mx-2" />
          <MenuButton onClick={() => {
            const url = window.prompt('URL')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}><ImageIcon size={18} /></MenuButton>
          <div className="flex-1" />
          <MenuButton onClick={() => editor.chain().focus().undo().run()}><Undo size={18} /></MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()}><Redo size={18} /></MenuButton>
        </div>

        <div className="bg-zinc-950 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* RIGHT SIDE: LIVE PREVIEW */}
      <div className="flex flex-col border border-zinc-800 rounded-xl bg-white overflow-hidden shadow-xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 bg-zinc-50 text-zinc-600">
          <Eye size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Live Preview</span>
        </div>
        
        <div className="p-8 overflow-y-auto bg-zinc-800">
          {/* This uses Tailwind Typography 'prose' to style the raw HTML */}
          <article 
            className="prose prose-zinc max-w-none 
              prose-headings:font-bold prose-h1:text-4xl
              prose-img:rounded-xl prose-blockquote:border-l-4"
            dangerouslySetInnerHTML={{ __html: htmlContent || editor.getHTML() }}
          />
        </div>
      </div>

    </div>
  )
}