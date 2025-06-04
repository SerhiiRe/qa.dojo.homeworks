import { test, expect } from '@playwright/test';
 /* 1. Парне чи непарне число
  Напишіть програму, яка визначає, чи число парне або непарне.
  Вхід: Число (наприклад, 4)
  Вихід:
  - "Число парне."
  - "Число непарне."
  */

function isEven(number) {
  if (typeof number !== "number") {
    throw Error("Please use a number to check if it's even.");
  }

  if (!Number.isInteger(number)) {
    throw Error("Only integers are allowed.");
  }

  if (number % 2 === 0) {
    console.log("Число парне.");
    return true;
  } else {
    console.log("Число непарне.");
    return false;
  }
}


//.................Unit tests..............................
test("even number (positive)", () => {
  const result = isEven(4);
  expect(result).toBeTruthy(); // 4 – парне
});

test("odd number (positive)", () => {
  const result = isEven(5);
  expect(result).toBeFalsy(); // 5 – непарне
});

test("even number (negative)", () => {
  const result = isEven(-2);
  expect(result).toBeTruthy(); // -2 – парне
});

test("odd number (negative)", () => {
  const result = isEven(-3);
  expect(result).toBeFalsy(); // -3 – непарне
});

test("zero is even", () => {
  const result = isEven(0);
  expect(result).toBeTruthy(); // 0 – вважається парним
});

test("non-integer throws error", () => {
  expect(() => isEven(2.5)).toThrow("Only integers are allowed.");
});

test("non-number throws error", () => {
  expect(() => isEven("4")).toThrow("Please provide a number.");
});

test("undefined throws error", () => {
  expect(() => isEven(undefined)).toThrow("Please provide a number.");
});




test('MQA-1396 Time-based greetings', async ({ }) => {
  /*2. Привітання за часом
  Залежно від часу доби, виведіть привітання: "Доброго ранку!", "Доброго дня!" або "Доброго вечора!".
  Вхід: Година (наприклад, 15)
  Вихід:
  - Якщо год < 12: "Доброго ранку!"
  - Якщо год 12–18: "Доброго дня!"
  - Якщо год > 18: "Доброго вечора!"
  */

  let hour = 15;
  function greetingsByTime() {
    if (hour < 12.00) {
      console.log("Доброго ранку!");
    } else if (hour >= 12.00 || hour <= 18.00) {
      console.log("Доброго дня!");
    } else {
      console.log("Доброго вечора!");
    }
  }
});

test('MQA-1397 assessment score', async ({ }) => {
  /*3. Перевірка оцінки
  Якщо бал >= 50 — "Тест складено".
  Якщо < 50 — "Тест не складено".
  Вхід: Бал (наприклад, 42)
  */
  let assessmentScore = 42;
  function assessmentPass() {
    if (assessmentScore >= 50) {
      console.log("Тест складено.");
    } else {
      console.log("Тест не складено.");
    }
  }
});

test('MQA-1398 voting Age', async ({ }) => {
  /*4. Вік для голосування
  Напишіть програму, яка перевіряє, чи можна користувачу голосувати.
  Вхід: Вік (наприклад, 17)
  Вихід:
  - Якщо >= 18: "Ви можете голосувати."
  - Інакше: "Ви ще не можете голосувати."
  */

  let votingAge = 17;
  function votingAbility() {
    if (votingAge == null || isNaN(votingAge)) {
      console.log("Побачимося пізніше");
    }
    else if (votingAge < 18) {
      console.log("Ви ще не можете голосувати.");
    } else {
      console.log("Ви можете голосувати.");
    }
  }
});

test('MQA-1399 number comparison', async ({ }) => {
  /* 
  5. Порівняння чисел 
  Порівняйте два числа: виведіть більше, або повідомте, що числа рівні. 
  Вхід: Два числа (наприклад, 8 і 10) 
  Вихід: 
  - "Перше число більше." 
  - "Друге число більше." 
  - "Числа рівні."
  */
  let firstNumber = 8;
  let secondNumber = 10;

  function numberComparison(firstNumber: number, secondNumber: number) {
    if (firstNumber > secondNumber) {
      console.log("Перше число більше.");
    } else if (secondNumber > firstNumber) {
      console.log("Друге число більше.");
    } else {
      console.log("Числа рівні.");
    }
  }
  numberComparison(firstNumber, secondNumber);
});


/*6. Дорога і світлофор
Якщо зелений — переходьте.
Якщо жовтий — підготуйтеся.
Якщо червоний — зачекайте.
Вхід: Колір світлофора (наприклад, "жовтий")*/

test('MQA-1400 Trafic light functionality', async ({ }) => {
  let light = ["Зелений", "Жовтий", "Червоний"];
  let randomLight = light[Math.floor(Math.random() * light.length)];
  /*Math.floor(...) – округлює вниз до цілого числа
  Math.random() – генерує випадкове число від 0 до 1.
  */
  function trafficLight(randomLight) {
    if (randomLight === "Зелений") {
      return ("переходьте");
    } else if (randomLight === "Жовтий") {
      return ("підготуйтеся");
    } else {
      return ("зачекайте");
    }
  }
  console.log(randomLight + "- " + trafficLight(randomLight));
});


/*7. Визначення типу числа
Напишіть програму, яка визначає, чи число додатнє, від’ємне або дорівнює нулю.
Вхід: Число (наприклад, -5)
Вихід:
- "Число додатнє."
- "Число від’ємне."
- "Число дорівнює нулю."*/

test('MQA-1401 Determining the type of number', async ({ }) => {
  function typeNumber(numberType) {
    if (numberType > 0) {
      console.log("Число додатнє.");
    } else if (numberType < 0) {
      console.log("Число від’ємне.");
    } else if (numberType === 0) {
      console.log("Число дорівнює нулю.");
    } else {
      throw Error("pls use number to check if it positive");
    }
  }
  let numberType = -5;
  typeNumber(numberType);
});