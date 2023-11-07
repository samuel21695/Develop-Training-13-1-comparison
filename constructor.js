const fs = require('fs');
const path = require('path');

// Filecomparator 클래스 정의
class FileComparator {
  // 생성자 함수는 객체의 초기 상태를 설정한다.
  constructor(operator, operand) {
    this.operator = operator;
    this.operand = operand;
  }

  // 파일이 .txt 파일인지 확인하는 메서드
  isTxtFile(fileName) {
    return path.extname(fileName).toLowerCase() === '.txt';
  }

  // 두 .txt 파일의 내용을 비교하는 메서드
  compare() {
    try {
      // 파일 확장자 검사
      if (!this.isTxtFile(this.operator) || !this.isTxtFile(this.operand)) {
        console.error('둘 다 .txt 파일이 아닙니다.');
        return false;
      }

      // 파일의 전체 경로를 생성
      const filePathOperator = path.join(__dirname, this.operator);
      const filePathOperand = path.join(__dirname, this.operand);

      // 파일을 읽는다
      const dataOperator = fs.readFileSync(filePathOperator, 'utf8');
      const dataOperand = fs.readFileSync(filePathOperand, 'utf8');

      // 파일의 내용을 비교하여 결과를 반환한다.
      return dataOperator === dataOperand;
    } catch (error) {
      console.error('Error reading files', error);
      return false;
    }
  }
}

/**
 * 코드가 다소 길어진 경향이 있지만,
 * 생성자(constructor), "무언가 특정한 기능을 만들어 내겠다." 라는 의도가 명확해진다.
 * 사용환경과 작업의 목적에 따라서 코드를 작성하는 방식이 javascript에서는
 * 매우 다양하므로, 다각적인 어휘력인 관점으로 훈련할 필요가 있다.
 */

// 클래스 사용 예
const comparator = new FileComparator('operator.txt', 'operand.txt')
const areFilesEqual = comparator.compare();
console.log(areFilesEqual); // 내용이 같다면 true, 다르다면 false를 출력한다.