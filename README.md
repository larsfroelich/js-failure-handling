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
1. Javascript/typescript already has a native way to handle representation of states/events where the outcome is explicitly __nothing__ or the __empty result__ : `null`
This can be used to represent the absence of a value, or the absence of a successful result as well as the absence of an error.
2. Javascript also has a native way to handle representation of states/events where the outcome is unexpected or an __error__ : the `Error` object.
This object captures a stack trace upon creation and holds both a message and an optional internal error of the same type, which allows building a *chain of errors*.

If the solution is this simple, why is it not used more often? Typescript to the rescue!
1. Throwing an error object is simple, but catching it is not - caught exceptions are typed as `unknown` (not untyped!) and thus require a type check (`instanceof`) to determine if they are of a specific type.
This was not possible a while ago, but is now!
2. promises should always be stored or awaited
3. `await` should always be followed by `/(.then\(.*\))?.catch\(.*\);/`
4. only `async` should be allowed to contain `throw new Error` statements
5. `throw` should only be allowed to throw constructed objects (of type `Error` or a subclass of `Error`)
6. `try` should always be followed by `catch` statements

## Run Examples:
> npx ts-node src/examples.ts
