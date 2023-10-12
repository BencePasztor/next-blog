import React from 'react';
import '@mdxeditor/editor/style.css';
import { MDXEditor, MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

interface WrappedEditorProps extends MDXEditorProps {
    editorRef: React.ForwardedRef<MDXEditorMethods>;
}
const WrappedEditor: React.FC<WrappedEditorProps> = ({ editorRef, ...props }) => {
    return <MDXEditor {...props} ref={editorRef} />;
}

export default WrappedEditor;