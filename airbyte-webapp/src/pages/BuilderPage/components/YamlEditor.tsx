import Editor, { Monaco } from "@monaco-editor/react";
import { useState } from "react";
import { useDebounce, useLocalStorage } from "react-use";

import { Button } from "components/ui/Button";

import styles from "./YamlEditor.module.scss";
import { template } from "./YamlTemplate";

export const YamlEditor: React.FC = () => {
  const [locallyStoredEditorValue, setLocallyStoredEditorValue] = useLocalStorage<string>(
    "connectorBuilderEditorContent",
    template
  );
  const [editorValue, setEditorValue] = useState(locallyStoredEditorValue);
  useDebounce(() => setLocallyStoredEditorValue(editorValue), 500, [editorValue]);

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value ?? "");
  };

  const setEditorTheme = (monaco: Monaco) => {
    monaco.editor.defineTheme("airbyte", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "string", foreground: styles.tokenString },
        { token: "type", foreground: styles.tokenType },
        { token: "number", foreground: styles.tokenNumber },
        { token: "delimiter", foreground: styles.tokenDelimiter },
        { token: "keyword", foreground: styles.tokenKeyword },
      ],
      colors: {
        "editor.background": "#0d0d2d",
      },
    });

    monaco.editor.setTheme("airbyte");
  };

  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <Button className={styles.exportButton}>Download YAML</Button>
      </div>
      <div className={styles.editorContainer}>
        <Editor
          beforeMount={setEditorTheme}
          value={editorValue}
          language="yaml"
          theme="airbyte"
          onChange={handleEditorChange}
          options={{
            lineNumbersMinChars: 6,
            matchBrackets: "always",
            minimap: {
              enabled: false,
            },
            padding: {
              top: 20,
              bottom: 20,
            },
          }}
        />
      </div>
    </div>
  );
};
