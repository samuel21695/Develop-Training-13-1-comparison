const fs = require('fs');
const path = require ('path');

// 파일이 .txt 파일인지 확인하는 함수
const isTXtFile = (fileName) => {
  // 경로의 확장자를 반환한다.
  let result = path.extname(fileName).toLowerCase() === '.txt';
  return result; // 문자열이다.
};

// 두 .txt 파일의 내용을 비교하는 함수
const compareFiles = (operator, operand) => {
  try { // 예외처리
    // 파일 확장자 검사
    if (!isTXtFile(operator) || !isTXtFile(operand)) {
      console.error('둘다 .txt 파일이 아닙니다.')
      return false;
    }
    

    // 파일의 전체 경로를 생성
    // _dirname은 현재 파일의 위치를 나타낸다.
    const filePathOperator = path.join(__dirname, operator);
    const filePathOperand = path.join(__dirname, operand);

    // 순서대로(동기적으로) 파일을 읽게 접미사인 Sync를 붙였다. 
    const dataOperator = fs.readFileSync(filePathOperator, 'utf8');
    const dataOperand = fs.readFileSync(filePathOperand, 'utf8');

    let isResult = dataOperator === dataOperand;
    // 파일의 내용을 비교하여 결과를 반환한다.
    return isResult;
  } catch (error) {
    console.error('Error reading files', error);
    return false;
  }
};

// 함수 사용 예
const areFilesEqual = compareFiles('operator.txt', 'operand.txt');
console.log(areFilesEqual); // 내용이 같다면 true, 다르다면 false를 출력한다.