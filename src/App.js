const MissionUtils = require("@woowacourse/mission-utils");
const { readLine, print, close } = MissionUtils.Console;

// ### 메뉴 입력 & 못 먹는 메뉴 입력

// - [x] 코치가 못 먹는 메뉴를 **, 로 구분해서** 입력 받는다.
// - [x] 코치가 못 먹는 메뉴가 없다면 빈 값을 입력 받는다.
// - [x] 코치가 못 먹는 메뉴가 0개 미만이거나 2개를 초과한다면 `코치가 못 먹는 메뉴는 최소 0개 이상 최대 2개 이하로 입력해야 합니다`를 출력한다.

const SAMPLE = {
	일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
	한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
	중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
	아시안:
		'팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
	양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

// 입출력
const InputView = {
	readFoodList() {
		readLine("못 먹는 메뉴를 입력해 주세요.", (foods) => {
			const foodList = foods.split(","); 
			if(!Validation.IsValidfoodLength(foodList)) this.readFoodList();

		});
	}	
}

// 예외 처리
const Validation = {
	IsValidfoodLength(foodList) {
		return (foodList.length >= 0 && foodList.length <= 2)
	}	
}

// 메인
class App {
	play() {
		InputView.readFoodList();
	}
}

const app = new App();
app.play();

module.exports = App;