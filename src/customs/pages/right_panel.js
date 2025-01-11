let editorRef = null;

function setEditorRef(editor) {
    editorRef = editor;
}

function onDataUpdateCallback(context) {
    console.log(editorRef?.getValue());
}

module.exports = {
    setEditorRef,
    onDataUpdateCallback,
    editorRef,
};
