// Practice Set 14 – ES6 Modules 
//Calculator Module (Named Export)

export const add = (num1, num2) =>{
    let addResult = num1+num2;
    return addResult;
}

export const subtract = (num1, num2) =>{
    let subtractResult = num1-num2;
    return subtractResult;
}

export const multiply = (num1, num2) =>{
    let multiplyResult = num1*num2;
    return multiplyResult;
}

export const divide = (num1, num2) =>{
    let divideResult = num1/num2;
    return divideResult;
}
