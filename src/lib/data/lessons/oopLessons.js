/**
 * PrepMate OOP (Object-Oriented Programming) Lesson Content Registry
 * Covers all 11 core OOP modules following the standard lesson schema.
 */

export const OOP_LESSONS = {
  'classes-objects': {
    id: 'classes-objects',
    subjectId: 'oop',
    order: 1,
    title: 'Classes & Objects',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Define a Class as an architectural blueprint and an Object as a concrete runtime instance.',
      'Analyze heap vs stack memory allocation for object reference variables.',
      'Understand constructors (default, parameterized, copy) and initialization lifecycles.',
      'Explore `this` and `self` references, static class members, and instance methods.',
      'Differentiate value types vs reference types in object pass-by-reference semantics.'
    ],
    prerequisites: ['Basic programming syntax', 'Variable scopes', 'Functions and methods'],
    theoryAndConcepts: [
      {
        heading: '1. Class as a Blueprint vs. Object as an Instance',
        content: `A Class is a user-defined blueprint or prototype from which individual objects are instantiated. It defines a set of attributes (state) and methods (behavior) that characterize any object instantiated from that class.
An Object is a concrete, self-contained entity that resides in memory at runtime. It has:
- State: Represented by its fields/attributes.
- Behavior: Represented by its methods.
- Identity: Its distinct identity, even when its field values match another object; identity need not be exposed as a raw memory address.`
      },
      {
        heading: '2. Memory Layout: Stack vs. Heap Allocation',
        content: `In languages like Java, C#, and JavaScript:
- Reference variables (e.g., \`Car myCar\`) are allocated on the Stack frame.
- The actual object data (e.g., \`new Car("Tesla", "Model S")\`) is allocated on the Heap.
- The reference variable holds the 32-bit or 64-bit memory pointer to the heap address.
In C++, objects can also be instantiated directly on the Stack (automatic storage), being automatically deallocated when exiting scope without garbage collection overhead.`
      },
      {
        heading: '3. Constructors & Object Lifecycle',
        content: `Constructors are special member functions called automatically during object instantiation:
- Default Constructor: Takes no arguments; initializes fields to default zero/null values if not explicitly provided.
- Parameterized Constructor: Accepts arguments to initialize specific member attributes with client-provided data.
- Copy Constructor: Creates a duplicate object by copying members from an existing instance of the same class (deep copy vs shallow copy).
- Destructor / Finalizer: Cleans up unmanaged system resources (file handles, network sockets) when an object is destroyed.`
      }
    ],
    codeSnippets: [
      {
        language: 'javascript',
        title: 'Class and Object Instantiation in JavaScript',
        code: `class BankAccount {
  #balance = 0; // Private field

  constructor(accountNumber, initialDeposit) {
    this.accountNumber = accountNumber;
    this.#balance = initialDeposit;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const userAcc = new BankAccount("ACC-9012", 500);
userAcc.deposit(250);
console.log(userAcc.getBalance()); // 750`
      },
      {
        language: 'python',
        title: 'Class and Object Definition in Python',
        code: `class BankAccount:
    def __init__(self, account_number: str, initial_deposit: float):
        self.account_number = account_number
        self.__balance = initial_deposit  # Private attribute

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Invalid deposit amount")
        self.__balance += amount
        return self.__balance

    def get_balance(self) -> float:
        return self.__balance

acc = BankAccount("ACC-9012", 500.0)
acc.deposit(250.0)
print(acc.get_balance())  # 750.0`
      }
    ],
    diagram: `+------------------------------------+
|            CLASS BLUEPRINT         |
|  class Car {                       |
|    String model; int speed;        |
|    void accelerate() { ... }       |
|  }                                 |
+-----------------+------------------+
                  |
        new Car() | Instantiation
                  v
+-----------------+------------------+
|           HEAP OBJECTS             |
|  Object A: model="Tesla", speed=60 |
|  Object B: model="BMW",   speed=75 |
+------------------------------------+`,
    interviewQuestions: [
      {
        q: "What is the difference between a shallow copy and a deep copy of an object?",
        a: "A shallow copy duplicates the immediate field values; for reference fields, it copies the memory address, meaning both copies point to the exact same nested objects in heap memory. A deep copy recursively duplicates all nested reference objects, creating completely independent copies."
      },
      {
        q: "Can constructors be declared private? Why would you do that?",
        a: "Yes. Private constructors prevent external code from directly instantiating the class with 'new'. This is essential for the Singleton design pattern, Factory Method patterns, and pure utility classes consisting only of static helper functions (like java.lang.Math)."
      }
    ],
    mcqs: [
      {
        id: 'q1',
        question: 'Where is the actual instance data of an object instantiated with `new` typically stored in managed runtimes (Java/C#)?',
        options: ['CPU Registers', 'Call Stack', 'Heap Memory', 'Program Counter'],
        correct: 2,
        explanation: 'In managed environments, objects created with the `new` operator are dynamically allocated on the Heap, while local reference variables reside on the Call Stack.'
      }
    ]
  },

  'encapsulation': {
    id: 'encapsulation',
    subjectId: 'oop',
    order: 2,
    title: 'Encapsulation',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand Encapsulation as data hiding and bundling methods with state.',
      'Master access specifiers: private, protected, internal/package-private, public.',
      'Protect internal invariants using getters, setters, and validation logic.',
      'Analyze why direct public field exposure violates the open-closed principle.'
    ],
    prerequisites: ['Classes & Objects'],
    theoryAndConcepts: [
      {
        heading: '1. Definition & Core Value of Encapsulation',
        content: `Encapsulation is the mechanism of bundling data (fields) and methods that operate on that data into a single unit (class), while restricting direct access to some of the object's components.
It enforces information hiding: internal representations cannot be modified directly from outside the class, preventing external code from placing an object into an invalid or corrupted state.`
      },
      {
        heading: '2. Access Modifiers',
        content: `- Private: Accessible only within the declaring class.
- Protected: Accessible within the declaring class and derived subclasses.
- Public: Accessible from any code in the program.
- Package / Internal: Accessible by any class within the same compilation package or assembly.`
      }
    ],
    interviewQuestions: [
      {
        q: "What is the difference between Abstraction and Encapsulation?",
        a: "Encapsulation is data hiding and bundling state with behavior to prevent corruption. Abstraction is complexity hiding—exposing only what an object does while concealing how it works internally."
      }
    ],
    mcqs: [
      {
        id: 'q1',
        question: 'Which access modifier ensures a class member is accessible only inside the class and its subclasses?',
        options: ['private', 'protected', 'public', 'static'],
        correct: 1,
        explanation: 'The `protected` access specifier allows member access to derived classes (subclasses) while hiding it from general external callers.'
      }
    ]
  },

  'abstraction': {
    id: 'abstraction',
    subjectId: 'oop',
    order: 3,
    title: 'Abstraction',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand Abstraction as the reduction of unnecessary implementation complexity.',
      'Define interfaces and abstract classes to specify contractual behavior.',
      'Evaluate real-world examples: car steering wheel, operating system POSIX APIs.',
      'Achieve loose coupling in software architecture using abstractions.'
    ],
    prerequisites: ['Classes & Objects', 'Encapsulation'],
    theoryAndConcepts: [
      {
        heading: '1. What is Abstraction?',
        content: `Abstraction focuses on the essential characteristics of an entity rather than its specific implementation details. It presents a clean, simple contract to the outside world while hiding internal mechanical details.`
      }
    ],
    interviewQuestions: [
      {
        q: "How does abstraction promote loose coupling?",
        a: "By coding against abstractions (interfaces or base contracts) rather than concrete implementations, client modules can interact with any compliant subclass without knowing or depending on its internal details."
      }
    ]
  },

  'inheritance': {
    id: 'inheritance',
    subjectId: 'oop',
    order: 4,
    title: 'Inheritance',
    estimatedTime: '35 mins',
    learningObjectives: [
      'Model "IS-A" hierarchical relationships between base (parent) and derived (child) classes.',
      'Differentiate Single, Multilevel, Hierarchical, and Multiple Inheritance.',
      'Understand the Diamond Problem in multiple inheritance and how interfaces resolve it.',
      'Master method overriding and super/base method dispatch.'
    ],
    prerequisites: ['Classes & Objects', 'Encapsulation'],
    theoryAndConcepts: [
      {
        heading: '1. Types of Inheritance & The Diamond Problem',
        content: `Inheritance allows a new class to inherit attributes and methods from an existing parent class.
The Diamond Problem arises when Class D inherits from both Class B and Class C, both of which inherit from Class A. If B and C override a method from A, D faces ambiguity about which implementation to execute. Languages like Java avoids multiple inheritance of classes and permits multiple interfaces; conflicting default methods must be resolved explicitly.`
      }
    ],
    interviewQuestions: [
      {
        q: "Why does Java disallow multiple class inheritance but allow multiple interface implementation?",
        a: "Multiple class inheritance leads to state and method implementation conflicts (the diamond problem). Java interfaces cannot declare instance fields, though they can define default methods; conflicting inherited defaults require explicit resolution."
      }
    ]
  },

  'polymorphism': {
    id: 'polymorphism',
    subjectId: 'oop',
    order: 5,
    title: 'Polymorphism',
    estimatedTime: '40 mins',
    learningObjectives: [
      'Distinguish Compile-time (Static) Polymorphism from Runtime (Dynamic) Polymorphism.',
      'Understand Method Overloading vs Method Overriding.',
      'Explore Virtual Method Tables (vtable) and late binding mechanics.',
      'Utilize polymorphic collections and parent references to execute subtype behavior.'
    ],
    prerequisites: ['Inheritance', 'Abstraction'],
    theoryAndConcepts: [
      {
        heading: '1. Compile-Time vs Runtime Polymorphism',
        content: `- Compile-Time (Static): Resolved by the compiler during build time via Method Overloading (same method name, different parameter types/counts) and operator overloading.
- Runtime (Dynamic): Resolved at runtime via Method Overriding using late binding. The runtime examines the actual memory object type rather than the reference pointer type using virtual method tables (vtables).`
      }
    ],
    interviewQuestions: [
      {
        q: "How does the runtime know which overridden method to call when using a base class reference?",
        a: "Through virtual method table (vtable) dispatch. Each class with virtual/overridden methods has a vtable containing function pointers. At runtime, the object's hidden vptr looks up the actual subclass method address."
      }
    ]
  },

  'interfaces': {
    id: 'interfaces',
    subjectId: 'oop',
    order: 6,
    title: 'Interfaces',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Define an Interface as a pure behavioral contract.',
      'Implement multiple interfaces in a single class.',
      'Understand default and static interface methods.',
      'Apply Dependency Inversion: depend on abstractions, not concretions.'
    ],
    prerequisites: ['Abstraction', 'Polymorphism'],
    theoryAndConcepts: [
      {
        heading: '1. Interface as a Contract',
        content: `An interface defines a protocol of methods that a class must implement, without prescribing how they must be implemented. It enables complete decoupling between client callers and provider implementations.`
      }
    ]
  },

  'abstract-classes': {
    id: 'abstract-classes',
    subjectId: 'oop',
    order: 7,
    title: 'Abstract Classes',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand Abstract Classes as partially implemented base blueprints.',
      'Distinguish between Abstract Classes and Interfaces.',
      'Implement the Template Method design pattern using abstract primitives.',
      'Determine when to use inheritance over interface composition.'
    ],
    prerequisites: ['Inheritance', 'Interfaces'],
    theoryAndConcepts: [
      {
        heading: '1. Abstract Class vs Interface',
        content: `An abstract class can hold mutable member state, protected fields, and fully implemented concrete methods alongside abstract method signatures. Interfaces represent capabilities ("CAN-DO"), whereas abstract classes represent identity ("IS-A").`
      }
    ]
  },

  'composition': {
    id: 'composition',
    subjectId: 'oop',
    order: 8,
    title: 'Composition',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand "HAS-A" (Composition/Aggregation) vs "IS-A" (Inheritance).',
      'Explain the principle: "Favor composition over inheritance".',
      'Analyze fragile base class problems caused by deep inheritance trees.',
      'Implement dependency injection and delegation.'
    ],
    prerequisites: ['Classes & Objects', 'Inheritance'],
    theoryAndConcepts: [
      {
        heading: '1. Favor Composition Over Inheritance',
        content: `Deep inheritance hierarchies create tight coupling: modifying a method in a root base class can unpredictably break subclasses across a large codebase. Composition achieves code reuse by assembling independent components into a container class, allowing runtime swappability.`
      }
    ]
  },

  'solid-principles': {
    id: 'solid-principles',
    subjectId: 'oop',
    order: 9,
    title: 'SOLID Principles',
    estimatedTime: '45 mins',
    learningObjectives: [
      'S: Single Responsibility Principle (SRP) — One reason to change.',
      'O: Open/Closed Principle (OCP) — Open for extension, closed for modification.',
      'L: Liskov Substitution Principle (LSP) — Subclasses must be substitutable for base types.',
      'I: Interface Segregation Principle (ISP) — No client forced to depend on unused methods.',
      'D: Dependency Inversion Principle (DIP) — Depend on abstractions, not concrete details.'
    ],
    prerequisites: ['Encapsulation', 'Polymorphism', 'Interfaces'],
    theoryAndConcepts: [
      {
        heading: '1. The 5 Pillars of Clean Architecture',
        content: `The SOLID principles, introduced by Robert C. Martin (Uncle Bob), provide the foundation for maintainable, testable, and scalable enterprise software systems.`
      }
    ],
    interviewQuestions: [
      {
        q: "What is a classic violation of the Liskov Substitution Principle (LSP)?",
        a: "The classic Square inheriting from Rectangle. If a Rectangle has setWidth() and setHeight() that operate independently, a Square forcing both dimensions to be equal violates caller expectations, causing tests expecting independent dimension mutation to fail."
      }
    ]
  },

  'design-patterns': {
    id: 'design-patterns',
    subjectId: 'oop',
    order: 10,
    title: 'Design Patterns',
    estimatedTime: '50 mins',
    learningObjectives: [
      'Categorize Gang of Four (GoF) patterns: Creational, Structural, Behavioral.',
      'Master key Creational patterns: Singleton, Factory Method, Builder.',
      'Master key Structural patterns: Adapter, Decorator, Facade.',
      'Master key Behavioral patterns: Observer, Strategy, Command.'
    ],
    prerequisites: ['SOLID Principles', 'Interfaces'],
    theoryAndConcepts: [
      {
        heading: '1. Essential Software Patterns in Interviews',
        content: `- Singleton: Ensures a class has only one instance and provides global access to it.
- Factory: Creates objects without exposing instantiation logic to the client.
- Observer: Defines a one-to-many subscription model so that when one object changes state, all dependents are notified automatically.
- Strategy: Enables selecting an algorithm's implementation at runtime.`
      }
    ]
  },

  'exception-handling': {
    id: 'exception-handling',
    subjectId: 'oop',
    order: 11,
    title: 'Exception Handling',
    estimatedTime: '30 mins',
    learningObjectives: [
      'Understand try, catch, finally, throw, and throws keywords.',
      'Differentiate Checked vs Unchecked (Runtime) exceptions.',
      'Design robust custom exception hierarchies for domain errors.',
      'Avoid anti-patterns: catching generic Throwable, swallowing exceptions.'
    ],
    prerequisites: ['Classes & Objects'],
    theoryAndConcepts: [
      {
        heading: '1. Robust Error Management',
        content: `Exceptions represent unusual or error conditions that disrupt normal application flow. Proper exception handling separates error-recovery logic from core business logic.`
      }
    ]
  }
};

export const OOP_MODULE_ORDER = [
  'classes-objects',
  'encapsulation',
  'abstraction',
  'inheritance',
  'polymorphism',
  'interfaces',
  'abstract-classes',
  'composition',
  'solid-principles',
  'design-patterns',
  'exception-handling'
];

export function normalizeOopKey(key) {
  if (!key) return null;
  const clean = String(key).toLowerCase().trim().replace(/[\s&/]+/g, '-').replace(/[()]/g, '');
  if (OOP_LESSONS[clean]) return clean;
  const aliases = {
    'classes': 'classes-objects',
    'objects': 'classes-objects',
    'classes-and-objects': 'classes-objects',
    'solid': 'solid-principles',
    'patterns': 'design-patterns',
    'exceptions': 'exception-handling'
  };
  return aliases[clean] || (OOP_LESSONS[clean] ? clean : null);
}

export function getOopLesson(key) {
  const k = normalizeOopKey(key);
  return k ? OOP_LESSONS[k] : null;
}
