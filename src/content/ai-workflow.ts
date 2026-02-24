/**
 * Flujo de trabajo optimizado por IA — contenido central.
 * Usado en la página /workflow para explicar cómo uso IA para mejorar
 * calidad de código y productividad.
 * Los nombres y descripciones de pasos y stacks viven en i18n (Workflow.*).
 */

export type WorkflowStepId =
  | "foundations"
  | "model"
  | "tool"
  | "hu"
  | "skills"
  | "mcp"
  | "context"
  | "architecture"
  | "data-contract"
  | "best-practices"
  | "testing"
  | "pipelines"
  | "code-review";

export interface WorkflowStep {
  id: WorkflowStepId;
  icon: string; // Iconify class
  order: number;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: "foundations", icon: "icon-[tabler--rocket]", order: 1 },
  { id: "model", icon: "icon-[tabler--brain]", order: 2 },
  { id: "tool", icon: "icon-[tabler--cursor-text]", order: 3 },
  { id: "hu", icon: "icon-[tabler--clipboard-check]", order: 4 },
  { id: "skills", icon: "icon-[tabler--plug-connected]", order: 5 },
  { id: "mcp", icon: "icon-[tabler--api]", order: 6 },
  { id: "context", icon: "icon-[tabler--message-circle]", order: 7 },
  { id: "architecture", icon: "icon-[tabler--layout]", order: 8 },
  { id: "data-contract", icon: "icon-[tabler--file-code]", order: 9 },
  { id: "best-practices", icon: "icon-[tabler--code]", order: 10 },
  { id: "testing", icon: "icon-[tabler--test-pipe]", order: 11 },
  { id: "pipelines", icon: "icon-[tabler--brand-github]", order: 12 },
  { id: "code-review", icon: "icon-[tabler--users]", order: 13 },
];

export type StackId = "nextjs" | "springboot" | "python" | "react-native";

export interface WorkflowStack {
  id: StackId;
  icon: string;
}

export const WORKFLOW_STACKS: WorkflowStack[] = [
  { id: "nextjs", icon: "icon-[simple-icons--nextdotjs]" },
  { id: "springboot", icon: "icon-[simple-icons--springboot]" },
  { id: "python", icon: "icon-[devicon--python]" },
  { id: "react-native", icon: "icon-[simple-icons--react]" },
];

/** MCPs favoritos para mostrar en el paso MCP */
export const FAVORITE_MCPS = [
  "Playwright",
  "Context7",
  "Supabase",
  "Chrome DevTools",
  "GitHub",
  "Notion",
];
