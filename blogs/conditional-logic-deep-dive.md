---
title: "How Conditional Logic Works Under the Hood"
description: "A deep dive into our rules engine — client-side evaluation for instant UX, server-side re-validation to prevent bypass."
date: "2026-04-01"
author: "FormsIO Team"
tags: ["engineering", "conditional-logic"]
---

# How Conditional Logic Works Under the Hood

Conditional logic is the feature that separates a good form builder from a great one.

Here's how FormsIO handles it, and why we made the choices we did.

## The rules model

Each rule has four parts:

1. **Source question** — the question whose answer triggers the rule
2. **Operator** — `equals`, `not_equals`, `greater_than`, `less_than`, `contains`, `not_contains`, `is_empty`, `is_not_empty`
3. **Value** — what to compare against (stored as JSONB, so it handles strings, numbers, arrays)
4. **Action** — `show_question`, `hide_question`, or `jump_to_section` + the target ID

## Client-side evaluation

Rules are evaluated in `lib/logic-engine.ts` every time an answer changes. This gives instant, zero-latency feedback — no server round-trip needed to show or hide a question.

```typescript
function evaluateRule(rule: ConditionalRule, answers: AnswerMap): boolean {
  const answer = answers[rule.source_question_id];
  switch (rule.operator) {
    case "equals":
      return answer === rule.value;
    case "contains":
      return String(answer).includes(String(rule.value));
    case "greater_than":
      return Number(answer) > Number(rule.value);
    // ...
  }
}
```

## Server-side re-validation

On submission, the server re-runs every rule against the submitted answers to determine which questions were actually visible. Hidden questions' answers are discarded. Required fields are only enforced for visible questions.

This prevents a malicious actor from submitting answers to hidden questions via raw API calls and bypassing conditional requirements.

## What's next

AND/OR rule combinations are deferred to Phase 3 final. For now, each rule is independent.
