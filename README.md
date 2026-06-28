# Workflow Builder

A visual workflow builder built using React Flow that allows users to create, connect, and execute workflows using different node types like Trigger, Decision, Delay, and Action.

<img width="1918" height="1087" alt="image" src="https://github.com/user-attachments/assets/404c636b-4f09-4144-a957-1783712c85e7" />

## Features

- Create workflow nodes dynamically
- Connect nodes using edges
- Visual workflow execution
- Support for:
  - Trigger nodes
  - Decision nodes
  - Delay nodes
  - Action nodes
- Decision based branching (TRUE/FALSE paths)
- Delay execution support
- Node selection state
- Active execution highlighting
- Delete nodes using keyboard interaction

## Assumptions :

* Decision nodes use a simulated execution context during workflow execution.
* In a real workflow engine, this data would come from trigger payloads (API/webhook events) or previous node outputs.
* Since the provided requirements only include Trigger name and description, runtime input handling is not implemented.
* Example context used for simulation:

```ts
{
  userType: "premium"
}
```


# Setup Instructions

## Prerequisites

Make sure you have:

- Node.js >= 18
- npm / yarn / pnpm


## Installation

Clone the repository:

```bash
git clone <repository-url>
