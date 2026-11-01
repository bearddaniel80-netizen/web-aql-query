# Refactored File Upload

The original upload component has been split into five React components:

- `FileUpload` — owns file/folder selection, drag/drop, upload state, and upload actions.
- `Table` — owns the table structure and column definitions.
- `Column` — renders a table header cell.
- `Row` — renders one upload row.
- `Cell` — renders a cell based on the column definition.

`formatSize` is a small utility.

## Usage

```jsx
import FileUpload from "./components/FileUpload";

export default function App() {
  return <FileUpload />;
}
```

The existing upload endpoint is preserved:

`POST /api/uploads`

The request still sends:

- `file`
- `relative_path`

The original behavior for file selection, folder selection, drag/drop, duplicate detection, progress reporting, completion URLs, errors, remove, and clear is preserved.
