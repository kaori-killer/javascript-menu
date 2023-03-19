const MissionUtils = require("@woowacourse/mission-utils");
const { readLine, print, close } = MissionUtils.Console;
const { pickNumberInRange, shuffle } = MissionUtils.Random;

// ### 메뉴 추천

// - [x] **MissionUtils 라이브러리의 Random.pickNumberInRange()** 를 이용해 카테코리를 무작위로 선택한다.
// - [x] 코치가 못 먹는 메뉴가 포함된 카테고리인 경우 다시 카테고리를 선택한다.
// - [x] 2번 이상 추천한 카테고리인 경우 다시 카테고리를 선택한다.
// - [x] **MissionUtils 라이브러리의 Random.shuffle()** 이용해 첫 번째 값으로 메뉴를 선택한다.
// - [ ] 이미 추천한 메뉴라면 다시 섞은 후 첫 번째 값으로 메뉴를 사용한다.
// - [ ] 위 과정을 4번 더 반복한다.

const SAMPLE = {
	일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
	한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
	중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
	아시안:
		'팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
	양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

// 입력
const InputView = {
	readFoodList() {
		readLine("못 먹는 메뉴를 입력해 주세요.", (foods) => {
			app.coachFood  = foods.split(","); 
			if(Validation.overfoodLength(app.coachFood)) this.readFoodList();
			app.selectCategory();
		});
	}	
}

// 출력
const OutputView = {
	printRecommendMenu(){
	}
}

// 예외 처리
const Validation = {
	overfoodLength(foodList) {
		return (foodList.length > 2);
	},
}

// 메인
class App {
	constructor(){
		this.sampleCategoryMenu = [];
		this.coachFood = [];

		this.coachRecommendationCategory = [];
		this.coachRecommendationMenu = [];

	}
	
	sampleToCategory() {
		Object.keys(SAMPLE).map((category, idx) => {
			this.sampleCategoryMenu.push({
				category: category,
				menu: SAMPLE[category].split(", ")
			})
		});
	}

	play() {
		this.sampleToCategory();
		InputView.readFoodList();
	}

	// 카테고리
	selectCategory() {
		const newCategory = this.sampleCategoryMenu[pickNumberInRange(1, 5)-1].category;
		console.log(this.IscoachFoodInCategory(newCategory), this.IsDuplicatetionCategory(this.coachRecommendationCategory, newCategory));
		if(this.IscoachFoodInCategory(newCategory) || this.IsDuplicatetionCategory(this.coachRecommendationCategory, newCategory)){
			this.selectCategory();
		}
		this.coachRecommendationCategory.push(newCategory);
		this.selectMenu(newCategory);
	}
	
	IscoachFoodInCategory(newCategory) {
		const targetCategory = this.sampleCategoryMenu.filter((sample)=> sample.category === newCategory)[0];
		const coachFoodInCategoryLength = targetCategory.menu.filter((menuName)=> this.coachFood.includes(menuName)).length;
		return coachFoodInCategoryLength > 0 ? true : false;
	}

	IsDuplicatetionCategory(coachCategory, newCategory) {
		const count = coachCategory.filter(categoryName => categoryName === newCategory).length;
		return count >= 2 ? true : false;
	}

	//메뉴
	selectMenu(newCategory) {
		const targetMenuArray = this.sampleCategoryMenu.filter((sample)=>sample.category === newCategory)[0].menu;
		print(targetMenuArray)
		const menu = shuffle(targetMenuArray.map((_, index)=>index))[0];
		this.coachRecommendationMenu.push(targetMenuArray[menu]);
	}
}

const app = new App();
app.play();

module.exports = App;

// const sampleCategory = [
// 	{
// 			category: "일식",
// 			menu: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
// 	},
// 	{
// 		category: "한식",
// 		menu: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
// 	},
// 	{
// 		category: "중식",
// 		menu: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
// 	},
// 	{
// 		category: "아시안",
// 		menu: '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
// 	},
// 	{
// 		category: "양식",
// 		menu:  '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
// 	},
// ]