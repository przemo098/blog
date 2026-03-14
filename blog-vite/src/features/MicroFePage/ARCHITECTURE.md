# Micro FE Architecture

## Architecture Diagram

```mermaid
graph TD
    subgraph "Next.js Host (localhost:3000)"
        PAGE["page.tsx<br/>/micro-fe route"]
        ORCH["MicroFePage.tsx<br/>Orchestrator"]
        PAGE --> ORCH
    end

    subgraph "Shared State"
        BUS["window.__microFeBus<br/>Event Bus Singleton"]
        BUS -->|"subscribe(cb)"| NOTIFY["notify all listeners"]
    end

    subgraph "Micro Frontends"
        REACT["React<br/>Native component<br/>useMicroFeBus() hook"]
        ANGULAR["Angular 19<br/>Custom Element<br/>&lt;angular-todo-list&gt;"]
        VUE["Vue 3<br/>Custom Element (Shadow DOM)<br/>&lt;vue-todo-list&gt;"]
        BLAZOR["Blazor .NET 10<br/>WASM + JS Bridge<br/>#blazor-todo-host"]
    end

    ORCH -->|"dynamic import<br/>ssr: false"| REACT
    ORCH -->|"dynamic import<br/>ssr: false"| ANGULAR
    ORCH -->|"dynamic import<br/>ssr: false"| VUE
    ORCH -->|"dynamic import<br/>ssr: false"| BLAZOR

    REACT <-->|"addTodo / updateTodo / deleteTodo<br/>subscribe()"| BUS
    ANGULAR <-->|"addTodo / updateTodo / deleteTodo<br/>subscribe()"| BUS
    VUE <-->|"addTodo / updateTodo / deleteTodo<br/>subscribe()"| BUS
    BLAZOR <-->|"JS Interop via blazorTodoBridge.js<br/>DotNetObjectReference callback"| BUS
```

## Data Flow

1. User performs action (add/edit/delete) in any micro FE
2. Micro FE calls `window.__microFeBus.addTodo()` / `updateTodo()` / `deleteTodo()`
3. Bus updates internal state and calls `notify()`
4. All subscribed callbacks receive the new `TodoState`
5. Each micro FE re-renders with the updated items

## Key Files

| File | Purpose |
|------|---------|
| `shared/microFeBus.ts` | Framework-agnostic event bus singleton |
| `shared/todoTypes.ts` | Shared TypeScript interfaces |
| `react-app/ReactTodoList.tsx` | Native React micro FE |
| `containers/AngularTodoContainer.tsx` | Loads Angular custom element |
| `containers/VueTodoContainer.tsx` | Loads Vue custom element |
| `containers/BlazorTodoContainer.tsx` | Loads Blazor WASM runtime |
| `apps/angular-todo/` | Angular 19 standalone project |
| `apps/vue-todo/` | Vue 3 + Vite project |
| `apps/blazor-todo/` | .NET 10 Blazor WASM project |
