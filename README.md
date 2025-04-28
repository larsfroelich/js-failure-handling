# Javascript/Typescript - Handling Failures/Errors vs Success
Handling failures/errors vs success in javascript/typescript is supported natively, but comes with limitations.
This repository provides simple examples of how native javascript/typescript can be used to handle failures/errors vs success 
without using any library or introducing non-native concepts like TaskEither, etc.

## Why (not) fp-ts?
There are issues with handling failures/errors vs success in javascript/typescript natively, which is why libraries like fp-ts exist.
Fp-ts is a great library that provides a lot of utilities to handle failures/errors vs success in a more functional way, 
by introducing concepts like Left, Right, Either, Task, TaskEither, etc.
However, this is also a departure from the native way of handling failures/errors vs success in javascript/typescript, making it harder for developers to understand and use the codebase, and to onboard new developers. It also naturally inflates the codebase by adding additional keywords, as well as try/catch and if statements

## The problem
The main issue with handling failures/errors vs success in javascript/typescript natively is that it is not explicit, as in, exceptions are untyped.
Functions define their return type, but can throw errors of any type, regardless of the function's signature.
At the same time, function calls can throw errors, but catching them systematically is not possible, as there is no way to know what type of error a function can throw.

Newer languages such as Rust or Go solve this by making exceptions part of a function's return type and thus part of the function signature.
This in turn naturally encourages developers to return and handle optional ("nullable") values as well as explicit Error-values when needed.

## The solution
Javascript/typescript already has a native way to handle representation of states/events where the outcome is explicitly __nothing__ or the __empty result__ : `null`
This can be used to represent the absence of a value, or the absence of a successful result as well as the absence of an error.

## Run Examples:
> npx ts-node src/examples.ts

// TODO: 
// promises should always be stored or awaited
// `await` should always be followed by `/(.then\(.*\))?.catch\(.*\);/`
// `async` should only be allowed to contain `throw new Error` or `return` statements
