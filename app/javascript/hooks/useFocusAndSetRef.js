import { useCallback } from "react";

export const useFocusAndSetRef = (ref) => {
  ref = useCallback(
    (node) => {
      console.log("node", node);
      if (node !== null) {
        ref.current = node;
        const len = node.unprivilegedEditor.getLength();
        const selection = { index: len, length: len };
        node.setEditorSelection(node.editor, selection);
      }
    },
    [ref]
  );
  return ref;
};
