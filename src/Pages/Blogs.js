import React from "react";

function Blogs() {
  return (
    <div className="w-4/5 mx-auto my-10">
      <div className="collapse bg-base-200 ">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          What are the different ways to manage a state in a React application?
        </div>
        <div className="collapse-content">
          Managing state in a React application is essential for ensuring your
          UI updates correctly as the underlying data changes. Here are the
          different ways to manage state in React:{" "}
          <p>
            1. Local State (Component State) - Use: Managed within a single
            component. - Tools: `useState` or `useReducer` hooks. - Example:
            Handling form inputs, toggling UI elements, or storing temporary
            data within a component.
          </p>{" "}
          <p>
            2. Global State - Use: Shared across multiple components in the
            application. - Tools: Context API (`useContext`), state management
            libraries like Redux, Zustand, or Recoil. - Example: User
            authentication status, theme settings, or global application data
            that needs to be accessed by many components.
          </p>{" "}
          <p>
            3. Server State - Use: Data that comes from an external server and
            needs to be integrated with UI state. - Tools: React Query, SWR, or
            custom hooks for fetching data. - Example: Fetching data from APIs,
            handling caching, loading states, and synchronization.
          </p>{" "}
          <p>
            4. URL State - Use: Data that is present in the URL, which allows
            the app to have state represented in the browser's address bar. -
            Tools: React Router, `useLocation`, `useHistory` hooks. - Example:
            Managing query parameters, pathnames, or hash fragments in the URL.
          </p>{" "}
          <p>
            5. Form State - Use: Managing the state of form inputs and
            validations. - Tools: Libraries like Formik, React Hook Form, or
            plain `useState`. - Example: Capturing user input, handling form
            submissions, and performing validations. Each method serves
            different needs based on the scope and complexity of the state being
            managed.
          </p>
        </div>
      </div>
      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">
          How does prototypical inheritance work?
        </div>
        <div className="collapse-content">
          <p>
            Prototypical inheritance is a feature in JavaScript that allows
            objects to inherit properties and methods from other objects. Every
            JavaScript object has a prototype, which is another object that
            serves as a template from which it inherits properties and methods.
            When you try to access a property or method on an object, JavaScript
            first looks for it on the object itself. If it's not found, it moves
            up the prototype chain, checking the object's prototype, and
            continues this process until it reaches Object.prototype, which is
            the root of all objects.
          </p>
        </div>
      </div>
      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">
          What is a unit test? Why should we write unit tests?
        </div>
        <div className="collapse-content">
          <p>
            A unit test is a type of software testing that focuses on verifying
            the functionality of individual components or functions in
            isolation. Writing unit tests helps ensure that each part of your
            code works as expected, making it easier to detect and fix bugs
            early. It also provides a safety net when refactoring code, improves
            code quality, and enhances developer confidence. Unit tests
            contribute to maintaining robust and reliable software.
          </p>
        </div>
      </div>

      <div className="collapse bg-base-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">
          React vs. Angular vs. Vue?
        </div>
        <div className="collapse-content">
          <p>
            React, Angular, and Vue are three popular front-end JavaScript
            frameworks/libraries:
          </p>{" "}
          <p>
            1. React (by Facebook) is a library focused on building UI
            components. It uses a virtual DOM for efficient updates and is known
            for its flexibility, allowing developers to integrate it with other
            libraries or frameworks. React's component-based architecture makes
            it easy to manage and reuse code.
          </p>{" "}
          <p>
            2. Angular (by Google) is a full-fledged MVC framework that offers a
            complete solution for building large-scale applications. It has a
            steep learning curve but provides everything out-of-the-box,
            including routing, state management, and form handling. Angular uses
            two-way data binding and a real DOM, which can be less performant in
            large apps.
          </p>{" "}
          <p>
            3. Vue (by Evan You) is a progressive framework that lies between
            React and Angular in terms of complexity. It's easy to integrate
            into projects and offers features like two-way data binding (similar
            to Angular) and a virtual DOM (like React). Vue is known for its
            simplicity, flexibility, and strong documentation.
          </p>{" "}
          <p>
            Each framework has its strengths: React for flexibility, Angular for
            a comprehensive solution, and Vue for simplicity and ease of
            integration. The choice often depends on the project requirements
            and the team's familiarity with the framework.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
