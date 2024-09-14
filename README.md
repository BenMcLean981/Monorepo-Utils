# Monorepo-Utils

Collection of utilities for a monorepo.

## Usage:

```
import { DependencyManipulator, parseWorkspace, writeWorkspace } from "@ben-mclean/Monorepo-Utils

const workspace = parseWorkspace();

const manipulator = new DependencyManipulator(workspace);
const modified = manipulator.addDependency('@company/foo', '@company/bar');

writeWorkspace(modified.workspace);
```
