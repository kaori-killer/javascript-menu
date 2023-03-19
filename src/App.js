const MissionUtils = require("@woowacourse/mission-utils");
const { readLine, print, close } = MissionUtils.Console;
const { pickNumberInRange, shuffle } = MissionUtils.Random;
const SAMPLE = {
	일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
	한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
	중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
	아시안:
		'팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
	양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};

// ### 수정

// - [x] 잘못 이해한 요구사항에 대한 구현을 수정한다.(코치가 못 먹는 메뉴가 포함된 카테고리인 경우 다시 카테고리를 선택한다.)
// - [ ] 먹지 못하는 메뉴라면 다시 섞은 후 첫 번째 값으로 메뉴를 사용한다.
// - [ ] 먹지 못하는 메뉴가 없으면 빈 값을 입력한다.에 대한 오류 확인

// 입력
const InputView = {
	readFoodList(name){
		readLine(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.`, (foods) => {
			app.coachFood  = foods.split(","); 
			if(Validation.overfoodLength(app.coachFood)) this.readFoodList();
			else app.recommendWeekMenu();
		});
	},
	readCoachName(){
		readLine("코치의 이름을 입력해 주세요. (, 로 구분)", (names) => {
			app.coachNames = names.split(",");
			if(Validation.InvalidCoachNameLength(app.coachNames) || Validation.InvalidCoachNumber(app.coachNames)) this.readCoachName();
			else app.coachNames.map((name)=>this.readFoodList(name));
		});
	},
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
	InvalidCoachNameLength(coachNames) {
		return (coachNames.filter((name)=> name.length < 2 || name.length > 4).length);
	},
	InvalidCoachNumber(coachNames) {
		return coachNames.length < 2 || coachNames.length > 5;
	}
}

// 메인
class App {
	constructor(){
		this.sampleCategoryMenu = [];
		this.coachFood = [];

		this.coachRecommendationCategory = [];
		this.coachRecommendationMenu = [];

		this.coachNames = [];
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
		InputView.readCoachName();
	}

	recommendWeekMenu() {
		for(let i=0; i<5; i++){
			this.selectCategory();
		}
		print(this.coachRecommendationCategory);
		print(this.coachRecommendationMenu);
	}

	// 카테고리
	selectCategory() {
		const newCategory = this.sampleCategoryMenu[pickNumberInRange(1, 5)-1].category;
		// console.log(this.IscoachFoodInCategory(newCategory), this.IsDuplicatetionCategory(this.coachRecommendationCategory, newCategory));
		if(this.IsDuplicatetionCategory(this.coachRecommendationCategory, newCategory)){
			this.selectCategory();
		}
		else{
			this.coachRecommendationCategory.push(newCategory);
			// print(this.coachRecommendationCategory);
			this.selectMenu(newCategory);	
		}
	}

	IsDuplicatetionCategory(coachCategory, newCategory) {
		const count = coachCategory.filter(categoryName => categoryName === newCategory).length;
		return count >= 2 ? true : false;
	}

	//메뉴
	selectMenu(newCategory) {
		const targetMenuArray = this.sampleCategoryMenu.filter((sample)=>sample.category === newCategory)[0].menu;
		const newMenu = targetMenuArray[shuffle(targetMenuArray.map((_, index)=>index))[0]];
		if(this.includesCoachFood(newMenu) || this.isDuplicatetionMenu(newMenu)){
			this.selectMenu(newCategory);
		}
		else {
			this.coachRecommendationMenu.push(newMenu);
			// print(this.coachRecommendationMenu);	
		}
	}
	
	includesCoachFood(newMenu) {
		return this.coachFood.includes(newMenu);
	}

	isDuplicatetionMenu(newMenu) {
		const count = this.coachRecommendationMenu.filter((preMenu)=> preMenu === newMenu).length;
		return count > 0 ? true : false;
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