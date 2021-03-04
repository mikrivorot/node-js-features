function tail<T extends any[]>(arr: readonly [any, ...T]) {
    const [_ignored, ...rest] = arr;
    return rest;
}

const myTuple = [1, 2, 3, 4] as const;
const myArray = ["hello", "world"];

// type [2, 3, 4]
const r1 = tail(myTuple);

// type [2, 3, 4, ...string[]]
const r2 = tail([...myTuple, ...myArray]);

class Square {
    // definite assignment assertion
    //        v
    sideLength!: number;
    //         ^^^^^^^^
    // type annotation

    constructor(sideLength: number) {
        this.initialize(sideLength)
    }

    initialize(sideLength: number) {
        this.sideLength = sideLength;
    }

    get area() {
        return this.sideLength ** 2;
    }
}