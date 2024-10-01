## **Exercise 1**
Define an arrow function `greetLater` that takes a parameter `name` and logs "Hello, [name]" after 2 seconds. Use `setTimeout` to delay the log. The arrow function should use the global `this` context. Explain why the `this` context behaves the way it does in an arrow function.

## **Exercise 2**
Using the `new` keyword, create an object constructor `Book` that contains properties such as `title`, `author`, and `year`. Add a method `getDetails` that logs the book's details in the format "Title: [title], Author: [author], Year: [year]". Instantiate two books and log their details using the `getDetails` method.

## **Exercise 3**
Create an object `person1` with `firstname` and `lastname` properties. Define a function `printFullName` outside of the object that logs the full name in the format "Full Name: [firstname] [lastname]". Use the `call`, `apply`, and `bind` methods to invoke `printFullName` for two other objects, `person2` and `person3`, each with their own `firstname` and `lastname` properties.

## **Exercise 4**
Create a simple task manager. Allow users to input a task and add it to a list. Each task should display a "Remove" button next to it. When clicked, the button should remove the task from the list. Additionally, implement an "Edit" button for each task. Clicking the "Edit" button should replace the task text with an input field pre-filled with the current task text. After editing, clicking a "Save" button should update the task.

## **Exercise 5**
Modify the task manager from **Exercise 4** to store the tasks in the browser's `localStorage`. This ensures that tasks persist even after refreshing the page. When the page is loaded, retrieve and display the saved tasks from `localStorage`. Ensure that tasks can still be added, edited, and removed, with the changes reflected in `localStorage`.
